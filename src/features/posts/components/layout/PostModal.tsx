
import React, { useState, useRef } from 'react'
import { Upload, X, Image as ImageIcon } from 'lucide-react'
import { Modal } from './Modal'
import { PostFormData } from '../../types/post'

interface Post {
  id?: number
  title: string
  excerpt: string
  content: string
  category: string
  categoryLabel: string
  image?: string
  status: 'published' | 'draft' | 'scheduled'
}

interface PostModalProps {
  isOpen: boolean
  onClose: () => void
  post?: PostFormData | null
  categories: Array<{ value: string; label: string; color: string }>
  onSave: (post: Omit<PostFormData, 'id'>) => void
}

export function PostModal({ isOpen, onClose, post, categories, onSave }: PostModalProps) {
  const [formData, setFormData] = useState({
    title: post?.title || '',
    excerpt: post?.excerpt || '',
    content: post?.content || '',
    category: post?.category || '',
    status: post?.status || 'draft' as const,
    image: post?.image || ''
  })
  const [imagePreview, setImagePreview] = useState<string>(post?.image || '')
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setErrors(prev => ({ ...prev, image: 'A imagem deve ter no máximo 5MB' }))
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setImagePreview(result)
        setFormData(prev => ({ ...prev, image: result }))
        setErrors(prev => ({ ...prev, image: '' }))
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setImagePreview('')
    setFormData(prev => ({ ...prev, image: '' }))
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) {
      newErrors.title = 'Título é obrigatório'
    } else if (formData.title.length < 5) {
      newErrors.title = 'Título deve ter pelo menos 5 caracteres'
    }

    if (!formData.excerpt.trim()) {
      newErrors.excerpt = 'Descrição é obrigatória'
    } else if (formData.excerpt.length < 20) {
      newErrors.excerpt = 'Descrição deve ter pelo menos 20 caracteres'
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Conteúdo é obrigatório'
    } else if (formData.content.length < 50) {
      newErrors.content = 'Conteúdo deve ter pelo menos 50 caracteres'
    }

    if (!formData.category) {
      newErrors.category = 'Categoria é obrigatória'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      const selectedCategory = categories.find(cat => cat.value === formData.category)

      await onSave({
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        category: formData.category,
        categoryLabel: selectedCategory?.label || '',
        status: formData.status,
        image: formData.image || undefined
      })

      onClose()
    } catch (error) {
      console.error('Erro ao salvar post:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    if (!isLoading) {
      onClose()
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={post ? 'Editar Post' : 'Novo Post'}
      size="xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Upload de Imagem */}
        <div>
          <label className="block text-base font-medium text-gray-700 mb-2">
            Imagem do Post
          </label>

          {imagePreview ? (
            <div className="relative">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-48 object-cover rounded-lg border border-gray-300"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
                aria-label="Remover imagem"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#E31969] transition-colors duration-200 cursor-pointer focus-within:ring-2 focus-within:ring-[#E31969] focus-within:ring-offset-2"
            >
              <ImageIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-base text-gray-600 mb-2">
                Clique para fazer upload de uma imagem
              </p>
              <p className="text-sm text-gray-500">
                PNG, JPG até 5MB
              </p>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            aria-label="Selecionar arquivo de imagem"
          />

          {errors.image && (
            <p className="mt-2 text-sm text-red-600" role="alert">
              {errors.image}
            </p>
          )}
        </div>

        {/* Título */}
        <div>
          <label htmlFor="post-title" className="block text-base font-medium text-gray-700 mb-2">
            Título *
          </label>
          <input
            id="post-title"
            type="text"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            className={`w-full px-4 py-3 border rounded-lg text-base focus:ring-2 focus:ring-[#E31969] focus:border-[#E31969] ${errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
            placeholder="Digite o título do post..."
            maxLength={100}
            aria-describedby={errors.title ? 'title-error' : undefined}
          />
          {errors.title && (
            <p id="title-error" className="mt-2 text-sm text-red-600" role="alert">
              {errors.title}
            </p>
          )}
          <p className="mt-1 text-sm text-gray-500">
            {formData.title.length}/100 caracteres
          </p>
        </div>

        {/* Descrição */}
        <div>
          <label htmlFor="post-excerpt" className="block text-base font-medium text-gray-700 mb-2">
            Descrição *
          </label>
          <textarea
            id="post-excerpt"
            value={formData.excerpt}
            onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
            rows={3}
            className={`w-full px-4 py-3 border rounded-lg text-base focus:ring-2 focus:ring-[#E31969] focus:border-[#E31969] resize-vertical ${errors.excerpt ? 'border-red-500' : 'border-gray-300'
              }`}
            placeholder="Digite uma breve descrição do post..."
            maxLength={200}
            aria-describedby={errors.excerpt ? 'excerpt-error' : undefined}
          />
          {errors.excerpt && (
            <p id="excerpt-error" className="mt-2 text-sm text-red-600" role="alert">
              {errors.excerpt}
            </p>
          )}
          <p className="mt-1 text-sm text-gray-500">
            {formData.excerpt.length}/200 caracteres
          </p>
        </div>

        {/* Conteúdo */}
        <div>
          <label htmlFor="post-content" className="block text-base font-medium text-gray-700 mb-2">
            Conteúdo *
          </label>
          <textarea
            id="post-content"
            value={formData.content}
            onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
            rows={8}
            className={`w-full px-4 py-3 border rounded-lg text-base focus:ring-2 focus:ring-[#E31969] focus:border-[#E31969] resize-vertical ${errors.content ? 'border-red-500' : 'border-gray-300'
              }`}
            placeholder="Digite o conteúdo completo do post..."
            aria-describedby={errors.content ? 'content-error' : undefined}
          />
          {errors.content && (
            <p id="content-error" className="mt-2 text-sm text-red-600" role="alert">
              {errors.content}
            </p>
          )}
          <p className="mt-1 text-sm text-gray-500">
            {formData.content.length} caracteres
          </p>
        </div>

        {/* Categoria */}
        <div>
          <label htmlFor="post-category" className="block text-base font-medium text-gray-700 mb-2">
            Categoria *
          </label>
          <select
            id="post-category"
            value={formData.category}
            onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
            className={`w-full px-4 py-3 border rounded-lg text-base focus:ring-2 focus:ring-[#E31969] focus:border-[#E31969] bg-white cursor-pointer ${errors.category ? 'border-red-500' : 'border-gray-300'
              }`}
            aria-describedby={errors.category ? 'category-error' : undefined}
          >
            <option value="">Selecione uma categoria</option>
            {categories.map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
          {errors.category && (
            <p id="category-error" className="mt-2 text-sm text-red-600" role="alert">
              {errors.category}
            </p>
          )}
        </div>

        {/* Status */}
        <div>
          <label htmlFor="post-status" className="block text-base font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            id="post-status"
            value={formData.status}
            onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as 'published' | 'draft' | 'scheduled' }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-[#E31969] focus:border-[#E31969] bg-white cursor-pointer"
          >
            <option value="draft">Rascunho</option>
            <option value="published">Publicado</option>
            <option value="scheduled">Agendado</option>
          </select>
        </div>

        {/* Botões */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={handleClose}
            disabled={isLoading}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-colors duration-200 font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-3 bg-[#E31969] text-white rounded-lg hover:bg-[#c41456] active:bg-[#a01145] transition-colors duration-200 font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#E31969] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2" />
                Salvando...
              </div>
            ) : (
              post ? 'Atualizar Post' : 'Criar Post'
            )}
          </button>
        </div>
      </form>
    </Modal>
  )
}

