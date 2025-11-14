'use client'

import React, { useEffect, useState } from 'react'
import { Search, Plus, Edit, Trash2, Eye, Calendar, User, FolderPlus, Settings } from 'lucide-react'
import { PostViewModal } from '@/features/posts/components/layout/PostViewModal'
import { PostModal } from '@/features/posts/components/layout/PostModal'
import { CategoryModal } from '@/features/posts/components/layout/CategoryModal'
import { Post } from '@/features/posts/types/post'
import { CategoryType } from '@/features/posts/types/category'
import { getCategories } from '@/features/posts/actions/getCategories'
import { ManageCategoriesModalProps } from '@/features/posts/components/layout/ManageCategoriesModal'
import { updateCategory } from '@/features/posts/actions/updateCategory'
import { toast } from 'react-toastify'
import { deleteCategory } from '@/features/posts/actions/deleteCategory'
import { getPosts } from '@/features/posts/actions/getPosts'
import { useAuth } from '@/features/auth/context/AuthContext'
import { deletePost } from '@/features/posts/actions/deletePost'
import { PostFormData } from '@/features/posts/forms/post-form'
import { formatLocalDate } from '@/shared/utils/formatLocalDate '
import { updatePost } from '@/features/posts/actions/updatePost'
import { createPost } from '@/features/posts/actions/createPost'

export default function Posts() {
  const [searchTerm, setSearchTerm] = useState('')
  const [isManageCategoriesModalOpen, setIsManageCategoriesModalOpen] = useState(false)
  const [isPostModalOpen, setIsPostModalOpen] = useState(false)
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [categories, setCategories] = useState<CategoryType[]>([]);

  const { user } = useAuth();

  if (!user) {
    toast.error("Usuário não autenticado.");
    return;
  }

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
          toast.error("❌ Erro ao carregar categorias");
        }
      } catch (err) {
        toast.error("Erro inesperado ao buscar categorias:");
      }
    }

    loadCategories();
  }, []);



  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    async function loadPosts() {
      try {
        const res = await getPosts();

        if (!res.success || !Array.isArray(res.data)) {
          toast.error('Falha ao carregar posts');
          setPosts([]);
          return;
        }

        // Converter o retorno da API para o formato correto de Post
        const formattedPosts: Post[] = res.data.map((item: any) => ({
          id: item._id, // ou gerar um id se vier diferente
          title: item.title || '',
          excerpt: item.excerpt || '',
          content: item.content || '',
          categoryId: item.category?._id || '',
          categoryLabel: item.category?.label || "Sem categoria",
          categoryColor: item.category?.color || "#6B7280",
          status: item.status || 'draft',
          statusLabel:
            item.status === 'published'
              ? 'Publicado'
              : item.status === 'scheduled'
                ? 'Agendado'
                : 'Rascunho',
          author: item.author,
          publishDate: item.createdAt || null,
          lastModified: item.updatedAt || item.createdAt || '',
          lastModifiedBy: item.author,
          image: item.image || undefined,
          featured: !!item.featured,
        }));

        setPosts(formattedPosts);
      } catch (err) {
        toast.error('Falha ao carregar posts');
        setPosts([]);
      }
    }

    loadPosts();
  }, []);

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

  const handleDeletePost = async (postId: string, onSuccess?: () => void) => {
    if (confirm('Tem certeza que deseja excluir este post?')) {
      try {
        const response = await deletePost(postId)

        if (response.success) {
          toast.success(response.message)
          if (onSuccess) onSuccess()
        } else {
          toast.error(response.message)
        }
      } catch (error) {
        console.error("Erro ao excluir post:", error)
        toast.error("Erro ao excluir o post.")
      }

      // setPosts(posts.filter(post => post.id !== postId))
      setPosts(prev => prev.filter(post => post.id !== postId));
    }
  }


  const handleSavePost = async (postData: Omit<PostFormData, "id">) => {
    const statusLabelMap: Record<Post["status"], string> = {
      published: "Publicado",
      draft: "Rascunho",
      scheduled: "Agendado",
    };

    try {
      let updatedPosts: Post[];

      if (isEditing && selectedPost) {
        // Atualiza post existente
        const result = await updatePost({
          id: selectedPost.id,
          ...postData,
          author: selectedPost.author,
        });

        if (!result.success || !result.data) {
          toast.error(result.message || "Erro ao atualizar post");
          return;
        }



        // Atualiza o estado local com o retorno real
        updatedPosts = posts.map((post) =>
          post.id === selectedPost.id
            ? {
              ...post,
              id: result.data.id,
              title: result.data.title,
              excerpt: postData.excerpt,
              content: postData.content,
              image: postData.image,
              categoryId:
                typeof result.data.category === "object"
                  ? result.data.category?.id
                  : result.data.category,
              categoryLabel:
                typeof result.data.category === "object"
                  ? result.data.category?.label
                  : categories.find((c) => c._id === result.data.category?.id)
                    ?.label || "",
              categoryColor:
                typeof result.data.category === "object"
                  ? result.data.category?.color
                  : categories.find((c) => c._id === result.data.category?.id)
                    ?.color || "#6B7280",
              status: postData.status,
              statusLabel: statusLabelMap[postData.status],
              featured: postData.featured ?? false,
              lastModifiedBy: selectedPost.author,
              lastModified: new Date().toISOString(),
            }
            : post
        );

        toast.success("Post atualizado com sucesso!");
      } else {
        // Cria novo post
        const result = await createPost({
          ...postData,
          author: user.name,
        });

        if (!result.success || !result.data) {
          toast.error(result.message || "Erro ao criar post");
          return;
        }

        const newPost = {
          id: result.data.id,
          title: result.data.title,
          excerpt: postData.excerpt,
          content: postData.content,
          categoryId:
            typeof result.data.category === "object"
              ? result.data.category?.id
              : result.data.category,
          categoryLabel:
            typeof result.data.category === "object"
              ? result.data.category?.label
              : categories.find((c) => c._id === result.data.category?.id)?.label ||
              "Sem categoria",
          categoryColor:
            typeof result.data.category === "object"
              ? result.data.category?.color
              : categories.find((c) => c._id === result.data.category?.id)?.color ||
              "#6B7280",
          status: postData.status,
          statusLabel: statusLabelMap[postData.status],
          author: user.name,
          publishDate: result.data.publishDate || null,
          lastModified: result.data.updatedAt || result.data.createdAt,
          lastModifiedBy: user.name,
          image: postData.image || "",
          featured: postData.featured ?? false,
        };

        updatedPosts = [newPost, ...posts];
      }

      updatedPosts = updatedPosts.sort((a, b) => {
        // Ordena primeiro por "featured" (true primeiro)
        if (a.featured !== b.featured) {
          return b.featured ? 1 : -1; // b.featured primeiro
        }

        const aPublishDate = a.publishDate ? new Date(a.publishDate).getTime() : 0;
        const bPublishDate = b.publishDate ? new Date(b.publishDate).getTime() : 0;

        return bPublishDate - aPublishDate;
      });

      setPosts(updatedPosts);
      toast.success("Post criado com sucesso!");
      setIsPostModalOpen(false);
    } catch (error) {
      console.error("Erro ao salvar post:", error);
      toast.error("Erro inesperado ao salvar post.");
    }
  };


  const handleSaveCategory = (categoryData: CategoryType) => {
    // Verificar se a categoria já existe
    const existingCategory = categories.find(cat =>
      cat.label.toLowerCase() === categoryData.label.toLowerCase()
    )


    if (existingCategory) {
      toast.warning('Uma categoria com este nome já existe!')
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
      setCategories((prev) =>
        prev.map((cat) =>
          cat._id === oldId
            ? { ...cat, label: updatedCategory.label, color: updatedCategory.color }
            : cat
        )
      );

      // Atualizar posts com a nova categoria
      setPosts((prev) =>
        prev.map((post) =>
          post.categoryId === oldId
            ? {
              ...post,
              categoryLabel: updatedCategory.label,
              categoryColor: updatedCategory.color,
            }
            : post
        )
      );

      toast.success("Categoria atualizada com sucesso!");
    } catch (error) {
      toast.error("Erro ao atualizar categoria:");
    }
  }

  const handleDeleteCategory = async (categoryId: string) => {
    // Verificar se há posts usando essa categoria
    const postsUsingCategory = posts.filter(post => post.categoryId === categoryId);

    if (postsUsingCategory.length > 0) {
      toast.error(`❌ Não é possível excluir: existem ${postsUsingCategory.length} post(s) usando esta categoria.`);
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
                      style={{ backgroundColor: getCategoryColor(post.categoryId) }}
                    >
                      {categories.find(cat => cat._id === post.categoryId)?.label || 'Sem categoria'}
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
                            ? `Publicado em ${formatLocalDate(post.publishDate)}`
                            : `Modificado em ${formatLocalDate(post.lastModified)}`
                          }
                        </div>
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
