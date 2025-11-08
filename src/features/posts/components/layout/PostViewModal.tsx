
import React from 'react'
import { Calendar, User, Eye, Edit, Tag } from 'lucide-react'
import { Modal } from './Modal'
import { Post } from '../../types/post'
import { CategoryType } from '../../types/category'

interface PostViewModalProps {
  isOpen: boolean
  onClose: () => void
  post: Post | null
  onEdit?: (post: Post) => void,
}

export function PostViewModal({ isOpen, onClose, post, onEdit }: PostViewModalProps) {
  if (!post) return null
  console.log(post)

  // const getCategoryColor = (categoryValue: string) => {
  //   const category = categories.find(cat => cat._id === categoryValue)
  //   return category?.color || '#6B7280'
  // }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800'
      case 'draft': return 'bg-yellow-100 text-yellow-800'
      case 'scheduled': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Visualizar Post"
      size="xl"
    >
      <div className="space-y-6">
        {/* Header com badges */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span
            className="px-3 py-1 text-sm font-medium rounded-full text-white"
            style={{ backgroundColor: post.categoryColor }}
          >
            <Tag className="w-4 h-4 mr-1 inline" />
            {post.categoryLabel}
          </span>
          <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(post.status)}`}>
            {post.statusLabel}
          </span>
          {post.featured && (
            <span className="px-3 py-1 text-sm font-medium rounded-full bg-orange-500 text-white">
              Destaque
            </span>
          )}
        </div>

        {/* Título */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>
        </div>

        {/* Informações do post */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 pb-4 border-b border-gray-200">
          <div className="flex items-center">
            <User className="w-4 h-4 mr-2" />
            <span>Por {post.author}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            <span>
              {post.publishDate
                ? `Publicado em ${formatDate(post.publishDate)}`
                : `Modificado em ${formatDate(post.lastModified)}`
              }
            </span>
          </div>
        </div>

        {/* Imagem */}
        {post.image && (
          <div className="mb-6">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-64 sm:h-80 object-cover rounded-lg border border-gray-200"
            />
          </div>
        )}

        {/* Descrição */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Descrição</h2>
          <p className="text-base text-gray-700 leading-relaxed">
            {post.excerpt}
          </p>
        </div>

        {/* Conteúdo */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Conteúdo</h2>
          <div className="prose max-w-none">
            <div className="text-base text-gray-700 leading-relaxed whitespace-pre-wrap">
              {post.content}
            </div>
          </div>
        </div>

        {/* Botões de ação */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-colors duration-200 font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Fechar
          </button>
          {onEdit && (
            <button
              onClick={() => onEdit(post)}
              className="px-6 py-3 bg-[#E31969] text-white rounded-lg hover:bg-[#c41456] active:bg-[#a01145] transition-colors duration-200 font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#E31969] focus:ring-offset-2 flex items-center justify-center"
            >
              <Edit className="w-5 h-5 mr-2" />
              Editar Post
            </button>
          )}
        </div>
      </div>
    </Modal>
  )
}
