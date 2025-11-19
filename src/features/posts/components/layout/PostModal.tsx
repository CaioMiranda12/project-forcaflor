
import React, { useState, useRef, useEffect } from 'react'
import { X, Image as ImageIcon } from 'lucide-react'
import { Modal } from './Modal'
import { PostFormData, PostWithId } from '../../forms/post-form'
import { CategoryType } from '../../types/category'
import { toast } from 'react-toastify'
// import { createPost } from '../../actions/createPost'
import { useAuth } from '@/features/auth/context/AuthContext'
// import { updatePost } from '../../actions/updatePost'
import { usePostForm } from '../../forms/post-form'

interface PostModalProps {
  isOpen: boolean
  onClose: () => void
  post?: PostWithId | null
  categories: CategoryType[],
  onSave: (post: PostWithId) => void
}

export function PostModal({ isOpen, onClose, post, categories, onSave }: PostModalProps) {
  const { user } = useAuth();

  const { register, handleSubmit, watch, formState: { errors, isSubmitting }, setValue, reset } = usePostForm(post || {})

  useEffect(() => {
    if (post) {
      reset({
        title: post.title || "",
        excerpt: post.excerpt || "",
        content: post.content || "",
        categoryId: post.categoryId || "",
        status: post.status || "draft",
        image: post.image || "",
        author: post.author || "",
        featured: post.featured ?? false,
        // publishDate: post.publishDate || null,
      });
      setImagePreview(post.image || "");
    } else {
      reset({
        title: "",
        excerpt: "",
        content: "",
        categoryId: "",
        status: "draft",
        image: "",
        author: user?.name || "",
        featured: false,
        // publishDate: null,
      });
      setImagePreview("");
    }
  }, [post, reset, user?.name]);

  const [imagePreview, setImagePreview] = useState<string>(post?.image || '')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const title = watch('title') || ''
  const excerpt = watch('excerpt') || ''
  const content = watch('content') || ''

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("A imagem deve ter no máximo 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setImagePreview(result);
      setValue("image", result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview("");
    setValue("image", "");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onSubmit = async (data: PostFormData) => {
    if (!user?.name) {
      toast.error("Usuário não autenticado.");
      return;
    }

    // envia os dados limpos para o componente pai
    onSave({ ...data, author: user.name, id: post?.id });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={post ? 'Editar Post' : 'Novo Post'}
      size="xl"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

          {errors.image?.message && (
            <p className="mt-2 text-sm text-red-600" role="alert">
              {errors.image.message}
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
            {...register("title")}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#E31969] ${errors.title ? "border-red-500" : "border-gray-300"
              }`}
            placeholder="Digite o título do post..."
            maxLength={100}
            aria-describedby={errors.title ? 'title-error' : undefined}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
          <p className="mt-1 text-sm text-gray-500">
            {title.length}/100 caracteres
          </p>
        </div>

        {/* Descrição */}
        <div>
          <label htmlFor="post-excerpt" className="block text-base font-medium text-gray-700 mb-2">
            Descrição *
          </label>
          <textarea
            id="post-excerpt"
            {...register("excerpt")}
            rows={3}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#E31969] ${errors.excerpt ? "border-red-500" : "border-gray-300"
              }`}
            maxLength={200}
            placeholder="Digite uma breve descrição do post..."
            aria-describedby={errors.excerpt ? 'excerpt-error' : undefined}
          />
          {errors.excerpt && (
            <p className="mt-1 text-sm text-red-600">
              {errors.excerpt.message}
            </p>
          )}
          <p className="mt-1 text-sm text-gray-500">
            {excerpt.length}/200 caracteres
          </p>
        </div>

        {/* Conteúdo */}
        <div>
          <label htmlFor="post-content" className="block text-base font-medium text-gray-700 mb-2">
            Conteúdo *
          </label>
          <textarea
            {...register("content")}
            rows={8}
            className={`w-full px-4 py-3 border rounded-lg text-base focus:ring-2 focus:ring-[#E31969] focus:border-[#E31969] resize-vertical ${errors.content ? 'border-red-500' : 'border-gray-300'
              }`}
            placeholder="Digite o conteúdo completo do post..."
            aria-describedby={errors.content ? 'content-error' : undefined}
          />
          {errors.content && (
            <p id="content-error" className="mt-2 text-sm text-red-600" role="alert">
              {errors.content.message}
            </p>
          )}
          <p className="mt-1 text-sm text-gray-500">
            {content.length} caracteres
          </p>
        </div>

        {/* Categoria */}
        <div>
          <label htmlFor="post-category" className="block text-base font-medium text-gray-700 mb-2">
            Categoria *
          </label>
          <select
            {...register("categoryId")}
            className={`w-full px-4 py-3 border rounded-lg text-base focus:ring-2 focus:ring-[#E31969] focus:border-[#E31969] bg-white cursor-pointer ${errors.categoryId ? 'border-red-500' : 'border-gray-300'
              }`}
          >
            <option value="">Selecione uma categoria</option>
            {categories.map(category => (
              <option key={category._id} value={category._id}>
                {category.label}
              </option>
            ))}
          </select>
          {errors.categoryId && (
            <p id="category-error" className="mt-2 text-sm text-red-600" role="alert">
              {errors.categoryId.message}
            </p>
          )}
        </div>

        {/* Status - apenas para editar */}
        {post && user?.isAdmin && (
          <div>
          <label htmlFor="post-status" className="block text-base font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            {...register("status")}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-[#E31969] focus:border-[#E31969] bg-white cursor-pointer"
          >
            <option value="draft">Rascunho</option>
            <option value="published">Publicado</option>
            <option value="scheduled">Agendado</option>
          </select>
        </div>
        )}

        {/* Botões */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-colors duration-200 font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 bg-[#E31969] text-white rounded-lg hover:bg-[#c41456] active:bg-[#a01145] transition-colors duration-200 font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#E31969] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2" />
                Salvando...
              </div>
            ) : (
              post ? 'Atualizar Post' : 'Criar Post'
            )}
          </button>
        </div>

        {/* Destaque (Featured) */}
        <div>
          <label className="block text-base font-medium text-gray-700 mb-2">
            Destaque do site
          </label>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                {...register("featured")}
                checked={watch("featured") || false}
                onChange={(e) => setValue("featured", e.target.checked)}
                className="h-5 w-5 text-[#E31969] border-gray-300 rounded focus:ring-2 focus:ring-[#E31969]"
              />
              <span className="text-gray-700 text-base">Marcar como destaque</span>
            </label>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Posts em destaque aparecem na seção “Principais Notícias”.
          </p>
        </div>

      </form>
    </Modal>
  )
}

