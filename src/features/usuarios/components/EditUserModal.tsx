'use client'
import React, { useState, useEffect } from 'react'
import { Modal } from '@/features/posts/components/layout/Modal'
import { User, Mail, UserCheck } from 'lucide-react'

interface EditUserModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (userId: number, userData: EditUserFormData) => void
  user: UserData | null
}

export interface UserData {
  id: number
  name: string
  email: string
  phone: string
  role: string
  roleLabel: string
  status: string
  statusLabel: string
  joinDate: string
  lastActivity: string
  age: number
  avatar: null
}

export interface EditUserFormData {
  name: string
  email: string
  phone: string
  role: 'participant' | 'volunteer' | 'admin'
  status: 'active' | 'inactive' | 'pending'
  age: number
}

export function EditUserModal({ isOpen, onClose, onSave, user }: EditUserModalProps) {
  const [formData, setFormData] = useState<EditUserFormData>({
    name: '',
    email: '',
    phone: '',
    role: 'participant',
    status: 'active',
    age: 0
  })

  const [errors, setErrors] = useState<Partial<Record<keyof EditUserFormData, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role as 'participant' | 'volunteer' | 'admin',
        status: user.status as 'active' | 'inactive' | 'pending',
        age: user.age
      })
    }
  }, [user])

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof EditUserFormData, string>> = {}

    // Validar nome
    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório'
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Nome deve ter pelo menos 3 caracteres'
    }

    // Validar email
    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido'
    }

    // Validar telefone
    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefone é obrigatório'
    }

    // Validar idade
    if (formData.age < 1 || formData.age > 120) {
      newErrors.age = 'Idade inválida'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm() || !user) {
      return
    }

    setIsSubmitting(true)
    try {
      await onSave(user.id, formData)
      setErrors({})
      onClose()
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field: keyof EditUserFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Limpar erro do campo quando usuário começar a digitar
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const handleClose = () => {
    setErrors({})
    onClose()
  }

  if (!user) return null

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Editar Usuário" size="md">
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Campo Nome */}
        <div>
          <label htmlFor="edit-name" className="block text-sm font-medium text-gray-700 mb-2">
            Nome Completo <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" aria-hidden="true" />
            <input
              id="edit-name"
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#E31969] focus:border-[#E31969] text-base ${errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
              placeholder="Digite o nome completo"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'edit-name-error' : undefined}
            />
          </div>
          {errors.name && (
            <p id="edit-name-error" className="mt-1 text-sm text-red-600" role="alert">
              {errors.name}
            </p>
          )}
        </div>

        {/* Campo Email */}
        <div>
          <label htmlFor="edit-email" className="block text-sm font-medium text-gray-700 mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" aria-hidden="true" />
            <input
              id="edit-email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#E31969] focus:border-[#E31969] text-base ${errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
              placeholder="exemplo@email.com"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'edit-email-error' : undefined}
            />
          </div>
          {errors.email && (
            <p id="edit-email-error" className="mt-1 text-sm text-red-600" role="alert">
              {errors.email}
            </p>
          )}
        </div>

        {/* Campo Telefone */}
        <div>
          <label htmlFor="edit-phone" className="block text-sm font-medium text-gray-700 mb-2">
            Telefone <span className="text-red-500">*</span>
          </label>
          <input
            id="edit-phone"
            type="text"
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#E31969] focus:border-[#E31969] text-base ${errors.phone ? 'border-red-500' : 'border-gray-300'
              }`}
            placeholder="(00) 00000-0000"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? 'edit-phone-error' : undefined}
          />
          {errors.phone && (
            <p id="edit-phone-error" className="mt-1 text-sm text-red-600" role="alert">
              {errors.phone}
            </p>
          )}
        </div>

        {/* Campo Idade */}
        <div>
          <label htmlFor="edit-age" className="block text-sm font-medium text-gray-700 mb-2">
            Idade <span className="text-red-500">*</span>
          </label>
          <input
            id="edit-age"
            type="number"
            value={formData.age}
            onChange={(e) => handleChange('age', parseInt(e.target.value))}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#E31969] focus:border-[#E31969] text-base ${errors.age ? 'border-red-500' : 'border-gray-300'
              }`}
            min="1"
            max="120"
            aria-invalid={!!errors.age}
            aria-describedby={errors.age ? 'edit-age-error' : undefined}
          />
          {errors.age && (
            <p id="edit-age-error" className="mt-1 text-sm text-red-600" role="alert">
              {errors.age}
            </p>
          )}
        </div>

        {/* Campo Tipo de Usuário */}
        <div>
          <label htmlFor="edit-role" className="block text-sm font-medium text-gray-700 mb-2">
            Tipo de Usuário <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <UserCheck className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" aria-hidden="true" />
            <select
              id="edit-role"
              value={formData.role}
              onChange={(e) => handleChange('role', e.target.value as 'participant' | 'volunteer' | 'admin')}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E31969] focus:border-[#E31969] text-base bg-white cursor-pointer"
            >
              <option value="participant">Participante</option>
              <option value="volunteer">Voluntário</option>
              <option value="admin">Administrador</option>
            </select>
          </div>
        </div>

        {/* Campo Status */}
        <div>
          <label htmlFor="edit-status" className="block text-sm font-medium text-gray-700 mb-2">
            Status <span className="text-red-500">*</span>
          </label>
          <select
            id="edit-status"
            value={formData.status}
            onChange={(e) => handleChange('status', e.target.value as 'active' | 'inactive' | 'pending')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E31969] focus:border-[#E31969] text-base bg-white cursor-pointer"
          >
            <option value="active">Ativo</option>
            <option value="inactive">Inativo</option>
            <option value="pending">Pendente</option>
          </select>
        </div>

        {/* Botões de Ação */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button
            type="button"
            onClick={handleClose}
            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-colors duration-200 font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 px-6 py-3 bg-[#E31969] text-white rounded-lg hover:bg-[#c41456] active:bg-[#a01145] transition-colors duration-200 font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#E31969] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
          </button>
        </div>
      </form>
    </Modal>
  )
}

