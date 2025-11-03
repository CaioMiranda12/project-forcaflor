
import React, { useState } from 'react'
import { Check } from 'lucide-react'
import { Modal } from './Modal'

interface Category {
  value: string
  label: string
  color: string
}

interface CategoryModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (category: Category) => void
}

export function CategoryModal({ isOpen, onClose, onSave }: CategoryModalProps) {
  const [name, setName] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const predefinedColors = [
    { name: 'Rosa', value: '#E31969', textColor: 'text-white' },
    { name: 'Verde', value: '#61CE70', textColor: 'text-white' },
    { name: 'Azul', value: '#3B82F6', textColor: 'text-white' },
    { name: 'Roxo', value: '#8B5CF6', textColor: 'text-white' },
    { name: 'Laranja', value: '#F59E0B', textColor: 'text-white' },
    { name: 'Vermelho', value: '#EF4444', textColor: 'text-white' },
    { name: 'Turquesa', value: '#06B6D4', textColor: 'text-white' },
    { name: 'Índigo', value: '#6366F1', textColor: 'text-white' },
    { name: 'Rosa Claro', value: '#EC4899', textColor: 'text-white' },
    { name: 'Verde Escuro', value: '#059669', textColor: 'text-white' },
    { name: 'Amarelo', value: '#EAB308', textColor: 'text-black' },
    { name: 'Cinza', value: '#6B7280', textColor: 'text-white' }
  ]

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!name.trim()) {
      newErrors.name = 'Nome da categoria é obrigatório'
    } else if (name.length < 2) {
      newErrors.name = 'Nome deve ter pelo menos 2 caracteres'
    } else if (name.length > 30) {
      newErrors.name = 'Nome deve ter no máximo 30 caracteres'
    }

    if (!selectedColor) {
      newErrors.color = 'Selecione uma cor para a categoria'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove acentos
      .replace(/[^a-z0-9\s-]/g, '') // Remove caracteres especiais
      .replace(/\s+/g, '-') // Substitui espaços por hífens
      .replace(/-+/g, '-') // Remove hífens duplicados
      .trim()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      const category: Category = {
        value: generateSlug(name),
        label: name.trim(),
        color: selectedColor
      }

      await onSave(category)

      // Reset form
      setName('')
      setSelectedColor('')
      setErrors({})
      onClose()
    } catch (error) {
      console.error('Erro ao criar categoria:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    if (!isLoading) {
      setName('')
      setSelectedColor('')
      setErrors({})
      onClose()
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Nova Categoria"
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nome da Categoria */}
        <div>
          <label htmlFor="category-name" className="block text-base font-medium text-gray-700 mb-2">
            Nome da Categoria *
          </label>
          <input
            id="category-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg text-base focus:ring-2 focus:ring-[#E31969] focus:border-[#E31969] ${errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
            placeholder="Digite o nome da categoria..."
            maxLength={30}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && (
            <p id="name-error" className="mt-2 text-sm text-red-600" role="alert">
              {errors.name}
            </p>
          )}
          <p className="mt-1 text-sm text-gray-500">
            {name.length}/30 caracteres
          </p>
        </div>

        {/* Seleção de Cor */}
        <div>
          <label className="block text-base font-medium text-gray-700 mb-2">
            Cor da Categoria *
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {predefinedColors.map((color) => (
              <button
                key={color.value}
                type="button"
                onClick={() => setSelectedColor(color.value)}
                className={`relative p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#E31969] focus:ring-offset-2 ${selectedColor === color.value
                    ? 'border-gray-800 shadow-lg'
                    : 'border-gray-300 hover:border-gray-400'
                  }`}
                style={{ backgroundColor: color.value }}
                aria-label={`Selecionar cor ${color.name}`}
              >
                <div className="flex flex-col items-center">
                  {selectedColor === color.value && (
                    <Check className={`w-5 h-5 mb-1 ${color.textColor}`} />
                  )}
                  <span className={`text-xs font-medium ${color.textColor}`}>
                    {color.name}
                  </span>
                </div>
              </button>
            ))}
          </div>
          {errors.color && (
            <p className="mt-2 text-sm text-red-600" role="alert">
              {errors.color}
            </p>
          )}
        </div>

        {/* Preview da Categoria */}
        {name && selectedColor && (
          <div>
            <label className="block text-base font-medium text-gray-700 mb-2">
              Preview
            </label>
            <div className="flex items-center">
              <span
                className="px-3 py-1 text-sm font-medium rounded-full text-white"
                style={{ backgroundColor: selectedColor }}
              >
                {name}
              </span>
            </div>
          </div>
        )}

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
                Criando...
              </div>
            ) : (
              'Criar Categoria'
            )}
          </button>
        </div>
      </form>
    </Modal>
  )
}

