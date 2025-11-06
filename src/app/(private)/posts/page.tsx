'use client'

import React, { useEffect, useState } from 'react'
import { Search, Plus, Edit, Trash2, Eye, Calendar, User, FolderPlus, Settings } from 'lucide-react'
import { PostViewModal } from '@/features/posts/components/layout/PostViewModal'
import { PostModal } from '@/features/posts/components/layout/PostModal'
import { CategoryModal } from '@/features/posts/components/layout/CategoryModal'
import { Post, PostFormData } from '@/features/posts/types/post'
import { CategoryType } from '@/features/posts/types/category'
import { getCategories } from '@/features/posts/actions/getCategories'
import { ManageCategoriesModalProps } from '@/features/posts/components/layout/ManageCategoriesModal'
import { updateCategory } from '@/features/posts/actions/updateCategory'
import { toast } from 'react-toastify'
import { deleteCategory } from '@/features/posts/actions/deleteCategory'

export default function Posts() {
  const [searchTerm, setSearchTerm] = useState('')
  const [isManageCategoriesModalOpen, setIsManageCategoriesModalOpen] = useState(false)
  const [isPostModalOpen, setIsPostModalOpen] = useState(false)
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [categories, setCategories] = useState<CategoryType[]>([]);

  // const [categories, setCategories] = useState<Category[]>([
  //   { value: 'education', label: 'Educação', color: '#E31969' },
  //   { value: 'community', label: 'Comunidade', color: '#61CE70' },
  //   { value: 'events', label: 'Eventos', color: '#8B5CF6' },
  //   { value: 'achievements', label: 'Conquistas', color: '#F59E0B' },
  //   { value: 'announcements', label: 'Avisos', color: '#3B82F6' }
  // ])

  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await getCategories();

        if (res.success && Array.isArray(res.data)) {
          const formatted = res.data.map((cat) => ({
            _id: cat._id,
            label: cat.label,
            color: cat.color,
          }));
          setCategories(formatted);
        } else {
          console.error("❌ Erro ao carregar categorias:", res.message);
        }
      } catch (err) {
        console.error("Erro inesperado ao buscar categorias:", err);
      }
    }

    loadCategories();
  }, []);

  console.log(categories)


  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      title: 'Nova oficina de informática para adolescentes',
      excerpt: 'Inscrições abertas para curso básico de computação voltado para jovens de 14 a 18 anos.',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      category: 'education',
      categoryLabel: 'Educação',
      status: 'published',
      statusLabel: 'Publicado',
      author: 'Ana Paula Silva',
      publishDate: '2024-01-15',
      lastModified: '2024-01-15',
      lastModifiedBy: 'Ana Paula Silva',
      views: 245,
      image: 'https://images.pexels.com/photos/5905709/pexels-photo-5905709.jpeg?auto=compress&cs=tinysrgb&w=400',
      featured: true
    },
    {
      id: 2,
      title: 'Campanha de arrecadação de materiais escolares',
      excerpt: 'Ajude-nos a coletar materiais escolares para as crianças da comunidade.',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      category: 'community',
      categoryLabel: 'Comunidade',
      status: 'published',
      statusLabel: 'Publicado',
      author: 'Carlos Santos',
      publishDate: '2024-01-12',
      lastModified: '2024-01-16',
      lastModifiedBy: 'Maria Oliveira',
      views: 189,
      image: 'https://images.pexels.com/photos/8613317/pexels-photo-8613317.jpeg?auto=compress&cs=tinysrgb&w=400',
      featured: false
    },
    {
      id: 3,
      title: 'Resultado do projeto de leitura',
      excerpt: 'Confira os resultados incríveis do nosso projeto de incentivo à leitura.',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      category: 'achievements',
      categoryLabel: 'Conquistas',
      status: 'published',
      statusLabel: 'Publicado',
      author: 'Maria Oliveira',
      publishDate: '2024-01-10',
      lastModified: '2024-01-10',
      lastModifiedBy: 'Maria Oliveira',
      views: 156,
      image: 'https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=400',
      featured: false
    },
    {
      id: 4,
      title: 'Festa junina da comunidade 2024',
      excerpt: 'Venha participar da nossa festa junina! Haverá comidas típicas, brincadeiras e apresentações culturais.',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      category: 'events',
      categoryLabel: 'Eventos',
      status: 'scheduled',
      statusLabel: 'Agendado',
      author: 'João Silva',
      publishDate: '2024-01-20',
      lastModified: '2024-01-17',
      lastModifiedBy: 'Laura Costa',
      views: 0,
      image: 'https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=400',
      featured: false
    },
    {
      id: 5,
      title: 'Rascunho - Novo projeto social',
      excerpt: 'Este é um rascunho sobre o novo projeto social que será implementado em breve.',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      category: 'announcements',
      categoryLabel: 'Avisos',
      status: 'draft',
      statusLabel: 'Rascunho',
      author: 'Laura Costa',
      publishDate: null,
      lastModified: '2024-01-16',
      lastModifiedBy: 'Laura Costa',
      views: 0,
      image: undefined,
      featured: false
    }
  ])

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  const getCategoryColor = (categoryValue: string) => {
    const category = categories.find(cat => cat._id === categoryValue)
    return category?.color || '#6B7280'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800'
      case 'draft': return 'bg-yellow-100 text-yellow-800'
      case 'scheduled': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const handleCreatePost = () => {
    setSelectedPost(null)
    setIsEditing(false)
    setIsPostModalOpen(true)
  }

  const handleEditPost = (post: Post) => {
    setSelectedPost(post)
    setIsEditing(true)
    setIsViewModalOpen(false)
    setIsPostModalOpen(true)
  }

  const handleViewPost = (post: Post) => {
    setSelectedPost(post)
    setIsViewModalOpen(true)
  }

  const handleDeletePost = (postId: number) => {
    if (confirm('Tem certeza que deseja excluir este post?')) {
      setPosts(posts.filter(post => post.id !== postId))
    }
  }

  const handleSavePost = (postData: Omit<PostFormData, 'id'>) => {
    const statusLabelMap: Record<Post['status'], string> = {
      published: 'Publicado',
      draft: 'Rascunho',
      scheduled: 'Agendado',
    }

    if (isEditing && selectedPost) {
      // Atualizar post existente
      setPosts(posts.map(post =>
        post.id === selectedPost.id
          ? {
            ...postData,
            id: selectedPost.id,
            author: selectedPost.author,
            publishDate: postData.status === 'published' && !selectedPost.publishDate
              ? new Date().toISOString().split('T')[0]
              : selectedPost.publishDate,
            lastModified: new Date().toISOString().split('T')[0],
            lastModifiedBy: 'Usuário Atual', // Em uma aplicação real, viria do contexto do usuário
            views: selectedPost.views,
            featured: selectedPost.featured,
            statusLabel: statusLabelMap[postData.status],
            categoryLabel: categories.find(c => c.label === postData.category)?.label || '',
          }
          : post
      ))
    } else {
      // Criar novo post
      const newPost: Post = {
        ...postData,
        id: Math.max(...posts.map(p => p.id)) + 1,
        author: 'Usuário Atual', // Em uma aplicação real, viria do contexto do usuário
        publishDate: postData.status === 'published' ? new Date().toISOString().split('T')[0] : null,
        lastModified: new Date().toISOString().split('T')[0],
        lastModifiedBy: 'Usuário Atual',
        views: 0,
        featured: false,
        statusLabel: statusLabelMap[postData.status],
        categoryLabel: categories.find(c => c.label === postData.category)?.label || '',
      }
      setPosts([newPost, ...posts])
    }
  }

  const handleSaveCategory = (categoryData: CategoryType) => {
    // Verificar se a categoria já existe
    const existingCategory = categories.find(cat =>
      cat.label.toLowerCase() === categoryData.label.toLowerCase()
    )


    if (existingCategory) {
      alert('Uma categoria com este nome já existe!')
      return
    }

    setCategories([...categories, categoryData])
  }

  const handleUpdateCategory = async (oldId: string, updatedCategory: CategoryType) => {
    try {
      const res = await updateCategory(oldId, {
        label: updatedCategory.label,
        color: updatedCategory.color,
      });

      if (!res.success) {
        toast.error(res.message);
        return;
      }

      // Atualizar a lista local de categorias
      setCategories(categories.map(cat =>
        cat._id === oldId ? { ...cat, ...updatedCategory } : cat
      ));

      // Atualizar posts com a nova categoria
      setPosts(posts.map(post =>
        post.category === oldId
          ? { ...post, category: updatedCategory._id, categoryLabel: updatedCategory.label }
          : post
      ));

      toast.success("Categoria atualizada com sucesso!");
    } catch (error) {
      toast.error("Erro ao atualizar categoria:");
    }
  }

  const handleDeleteCategory = async (categoryId: string) => {
    // Verificar se há posts usando essa categoria
    const postsUsingCategory = posts.filter(post => post.category === categoryId);

    if (postsUsingCategory.length > 0) {
      alert(`❌ Não é possível excluir: existem ${postsUsingCategory.length} post(s) usando esta categoria.`);
      return;
    }

    if (!confirm("Tem certeza que deseja excluir esta categoria?")) return;

    try {
      const res = await deleteCategory(categoryId);

      if (!res.success) {
        toast.error(res.message);
        return;
      }

      // Atualizar o estado local
      setCategories(categories.filter(cat => cat._id !== categoryId));
      toast.success("Categoria excluída com sucesso!");
    } catch (error) {
      toast.error("Erro ao excluir categoria.");
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Gerenciamento de Posts
            </h1>
            <p className="text-lg text-gray-600">
              Crie e gerencie conteúdos para o portal
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setIsManageCategoriesModalOpen(true)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-colors duration-200 font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 flex items-center justify-center"
            >
              <Settings className="w-5 h-5 mr-2" aria-hidden="true" />
              Gerenciar Categorias
            </button>
            <button
              onClick={() => setIsCategoryModalOpen(true)}
              className="px-4 py-2 border border-[#E31969] text-[#E31969] rounded-lg hover:bg-[#E31969] hover:text-white active:bg-[#c41456] transition-colors duration-200 font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#E31969] focus:ring-offset-2 flex items-center justify-center"
            >
              <FolderPlus className="w-5 h-5 mr-2" aria-hidden="true" />
              Nova Categoria
            </button>
            <button
              onClick={handleCreatePost}
              className="px-6 py-3 bg-[#E31969] text-white rounded-lg hover:bg-[#c41456] active:bg-[#a01145] transition-colors duration-200 font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#E31969] focus:ring-offset-2 flex items-center"
            >
              <Plus className="w-5 h-5 mr-2" aria-hidden="true" />
              Novo Post
            </button>
          </div>
        </div>
      </div>

      {/* Search Only */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" aria-hidden="true" />
          <input
            type="text"
            placeholder="Buscar posts por título ou conteúdo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E31969] focus:border-[#E31969] text-base"
            aria-label="Buscar posts"
          />
        </div>
      </div>

      {/* Posts List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="divide-y divide-gray-200">
          {filteredPosts.map((post) => (
            <div key={post.id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span
                      className="px-2 py-1 text-xs font-medium rounded-full text-white"
                      style={{ backgroundColor: getCategoryColor(post.category) }}
                    >
                      {post.categoryLabel}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(post.status)}`}>
                      {post.statusLabel}
                    </span>
                    {post.featured && (
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-orange-500 text-white">
                        Destaque
                      </span>
                    )}
                  </div>

                  <div className="flex items-start space-x-4">
                    {post.image && (
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover shrink-0"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {post.title}
                      </h3>
                      <p className="text-base text-gray-600 mb-3 line-clamp-2">
                        {post.excerpt}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-1" aria-hidden="true" />
                          Criado por: {post.author}
                        </div>
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-1" aria-hidden="true" />
                          Última alteração: {post.lastModifiedBy}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" aria-hidden="true" />
                          {post.publishDate
                            ? `Publicado em ${new Date(post.publishDate).toLocaleDateString('pt-BR')}`
                            : `Modificado em ${new Date(post.lastModified).toLocaleDateString('pt-BR')}`
                          }
                        </div>
                        {post.status === 'published' && (
                          <div className="flex items-center">
                            <Eye className="w-4 h-4 mr-1" aria-hidden="true" />
                            {post.views} visualizações
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 lg:flex-col lg:space-x-0 lg:space-y-2">
                  <button
                    onClick={() => handleViewPost(post)}
                    className="px-4 py-2 bg-[#61CE70] text-white rounded-lg hover:bg-[#4fb85f] active:bg-[#3da34d] transition-colors duration-200 font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#61CE70] focus:ring-offset-2 flex items-center text-sm"
                    aria-label={`Visualizar ${post.title}`}
                  >
                    <Eye className="w-4 h-4 mr-1" aria-hidden="true" />
                    Ver
                  </button>
                  <button
                    onClick={() => handleEditPost(post)}
                    className="px-4 py-2 bg-[#E31969] text-white rounded-lg hover:bg-[#c41456] active:bg-[#a01145] transition-colors duration-200 font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#E31969] focus:ring-offset-2 flex items-center text-sm"
                    aria-label={`Editar ${post.title}`}
                  >
                    <Edit className="w-4 h-4 mr-1" aria-hidden="true" />
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeletePost(post.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 active:bg-red-800 transition-colors duration-200 font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 flex items-center text-sm"
                    aria-label={`Excluir ${post.title}`}
                  >
                    <Trash2 className="w-4 h-4 mr-1" aria-hidden="true" />
                    Excluir
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="p-12 text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhum post encontrado
            </h3>
            <p className="text-base text-gray-600">
              Tente ajustar sua busca para encontrar o que procura.
            </p>
          </div>
        )}
      </div>

      {/* Modals */}
      <PostModal
        isOpen={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
        post={isEditing ? selectedPost : null}
        categories={categories}
        onSave={handleSavePost}
      />

      <CategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        onSave={handleSaveCategory}
      />

      <PostViewModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        post={selectedPost}
        onEdit={handleEditPost}
      />

      <ManageCategoriesModalProps
        isOpen={isManageCategoriesModalOpen}
        onClose={() => setIsManageCategoriesModalOpen(false)}
        categories={categories}
        onUpdate={handleUpdateCategory}
        onDelete={handleDeleteCategory}
      />
    </div>
  )
}
