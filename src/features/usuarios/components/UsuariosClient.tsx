'use client'
import React, { useState } from 'react'
import { Search, Filter, Plus, Edit, Trash2, User, Mail, Phone, Calendar, UserCheck } from 'lucide-react'
import { UserModal } from '@/features/usuarios/components/UserModal'
import { EditUserModal } from '@/features/usuarios/components/EditUserModal'
import { DeleteUserModal } from '@/features/usuarios/components/DeleteUserModal'
import { CadastroFormData, useCadastroForm } from '@/features/auth/forms/cadastro-form'
import { createUser } from '@/features/auth/actions/createUser'
import { toast } from 'react-toastify'
import { getUsers } from '../actions/getUsers'
import { updateUser } from '../actions/updateUser'
import { EditUserFormData } from '../forms/edit-user-form'
import { deleteUser } from '../actions/deleteUser'
import { AuthUser } from '@/features/auth/types/AuthUser'

export default function UsuariosClient({ users }: { users: AuthUser[] }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRole, setSelectedRole] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [isUserModalOpen, setIsUserModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<AuthUser | null>(null)
  const [userToDelete, setUserToDelete] = useState<{ id: string, name: string } | null>(null)

  const [userList, setUserList] = useState(users);

  const roles = [
    { value: 'all', label: 'Todos os tipos' },
    { value: 'volunteer', label: 'Voluntário' },
    { value: 'admin', label: 'Administrador' }
  ]

  // const statuses = [
  //   { value: 'all', label: 'Todos os status' },
  //   { value: 'active', label: 'Ativo' },
  //   { value: 'inactive', label: 'Inativo' },
  //   { value: 'pending', label: 'Pendente' }
  // ]

  const filteredUsers = userList.filter(user => {
  const matchesSearch =
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase());

  const matchesRole =
    selectedRole === 'all' ||
    (selectedRole === 'admin' && user.isAdmin) ||
    (selectedRole === 'volunteer' && !user.isAdmin);

  return matchesSearch && matchesRole;
});


  const getRoleColor = (isAdmin: boolean) => {
    if (isAdmin) {
      return 'bg-red-100 text-red-800'
    } else {
      return 'bg-[#61CE70] text-white'
    }
  }

  // const getStatusColor = (status: string) => {
  //   switch (status) {
  //     case 'active': return 'bg-green-100 text-green-800'
  //     case 'inactive': return 'bg-red-100 text-red-800'
  //     case 'pending': return 'bg-yellow-100 text-yellow-800'
  //     default: return 'bg-gray-100 text-gray-800'
  //   }
  // }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  const handleCreateUser = async (userData: CadastroFormData) => {
    const res = await createUser(userData)

    if (!res.success) {
      toast.error(res.message)
      return
    }

    const updatedUsers = await getUsers();
    setUserList(updatedUsers);

    toast.success(res.message);
  }

  const handleEditUser = (user: AuthUser) => {
    setSelectedUser(user)
    setIsEditModalOpen(true)
  }

  const handleUpdateUser = async (userId: string, userData: EditUserFormData) => {
    console.log(userId)
     const res = await updateUser(userId, userData)

      if (!res.success) {
        toast.error(res.message)
        return
      }
      const updatedUsers = await getUsers()
      setUserList(updatedUsers)

      toast.success(res.message)
      setIsEditModalOpen(false)
  }

  const handleDeleteClick = (userId: string, userName: string) => {
    setUserToDelete({ id: userId, name: userName })
    setIsDeleteModalOpen(true)
  }

  const handleDeleteUser = async (userId: string) => {
    const res = await deleteUser(userId)

    if (!res.success) {
      toast.error(res.message)
      return
    }

    // Atualiza lista
    const updatedUsers = await getUsers()
    setUserList(updatedUsers)

    toast.success(res.message)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Gerenciamento de Usuários
            </h1>
            <p className="text-lg text-gray-600">
              Gerencie participantes, voluntários e administradores
            </p>
          </div>
          <button
            onClick={() => setIsUserModalOpen(true)}
            className="mt-4 sm:mt-0 px-6 py-3 bg-[#E31969] text-white rounded-lg hover:bg-[#c41456] active:bg-[#a01145] transition-colors duration-200 font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#E31969] focus:ring-offset-2 flex items-center"
          >
            <Plus className="w-5 h-5 mr-2" aria-hidden="true" />
            Novo Usuário
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" aria-hidden="true" />
            <input
              type="text"
              placeholder="Buscar usuários por nome ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E31969] focus:border-[#E31969] text-base"
              aria-label="Buscar usuários"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" aria-hidden="true" />
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E31969] focus:border-[#E31969] text-base bg-white cursor-pointer"
                aria-label="Filtrar por tipo"
              >
                {roles.map(role => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>
            </div>

            {/* <div className="relative">
              <UserCheck className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" aria-hidden="true" />
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E31969] focus:border-[#E31969] text-base bg-white cursor-pointer"
                aria-label="Filtrar por status"
              >
                {statuses.map(status => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div> */}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        {/* <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-[#E31969]">
              <User className="w-6 h-6 text-white" aria-hidden="true" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Participantes</p>
              <p className="text-2xl font-bold text-gray-900">
                {users.filter(u => u.role === 'participant').length}
              </p>
            </div>
          </div>
        </div> */}

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-[#61CE70]">
              <UserCheck className="w-6 h-6 text-white" aria-hidden="true" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Voluntários</p>
              <p className="text-2xl font-bold text-gray-900">
                {userList.filter(user => !(user.isAdmin)).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-500">
              <User className="w-6 h-6 text-white" aria-hidden="true" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Administradores</p>
              <p className="text-2xl font-bold text-gray-900">
                {userList.filter(user => user.isAdmin).length}
              </p>
            </div>
          </div>
        </div>

        {/* <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-500">
              <UserCheck className="w-6 h-6 text-white" aria-hidden="true" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Usuários Ativos</p>
              <p className="text-2xl font-bold text-gray-900">
                {users.filter(u => u.status === 'active').length}
              </p>
            </div>
          </div>
        </div> */}
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usuário
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contato
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo
                </th>
                {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th> */}
                {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Última Atividade
                </th> */}
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.userId} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-[#61CE70] flex items-center justify-center">
                          <span className="text-sm font-medium text-white">
                            {getInitials(user.name)}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-base font-medium text-gray-900">
                          {user.name}
                        </div>
                        {/* <div className="text-sm text-gray-500">
                          {user.age} anos
                        </div> */}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-base text-gray-900 flex items-center">
                      <Mail className="w-4 h-4 mr-2 text-gray-400" aria-hidden="true" />
                      {user.email}
                    </div>
                    {/* <div className="text-sm text-gray-500 flex items-center">
                      <Phone className="w-4 h-4 mr-2 text-gray-400" aria-hidden="true" />
                      {user.phone}
                    </div> */}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(user.isAdmin)}`}>
                      {user.isAdmin ? "Admin" : "Voluntário"}
                    </span>
                  </td>
                  {/* <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(user.status)}`}>
                      {user.statusLabel}
                    </span>
                  </td> */}
                  {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" aria-hidden="true" />
                      {new Date(user.lastActivity).toLocaleDateString('pt-BR')}
                    </div>
                  </td> */}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => handleEditUser(user as AuthUser)}
                        className="p-2 text-[#61CE70] hover:bg-[#61CE70] hover:text-white rounded-lg transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#61CE70] focus:ring-offset-2"
                        aria-label={`Editar ${user.name}`}
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(user.userId, user.name)}
                        className="p-2 text-red-600 hover:bg-red-600 hover:text-white rounded-lg transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
                        aria-label={`Excluir ${user.name}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="p-12 text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhum usuário encontrado
            </h3>
            <p className="text-base text-gray-600">
              Tente ajustar sua busca ou filtros para encontrar o que procura.
            </p>
          </div>
        )}
      </div>

      {/* Modais */}
      <UserModal
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
        onSave={handleCreateUser}
      />

      <EditUserModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false)
          setSelectedUser(null)
        }}
        onSave={handleUpdateUser}
        user={selectedUser}
      />

      <DeleteUserModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false)
          setUserToDelete(null)
        }}
        onConfirm={handleDeleteUser}
        userName={userToDelete?.name || ''}
        userId={userToDelete?.id || null}
      />
    </div>
  )
}
