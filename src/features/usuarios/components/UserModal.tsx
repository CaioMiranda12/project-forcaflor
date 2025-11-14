'use client'
import React, { useState } from 'react'
import { Modal } from '@/features/posts/components/layout/Modal'
import { User, Mail, Lock, UserCheck } from 'lucide-react'
import { CadastroFormData, useCadastroForm } from '@/features/auth/forms/cadastro-form'
import { createUser } from '@/features/auth/actions/createUser'
import { toast } from 'react-toastify'

interface UserModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (userData: CadastroFormData) => void
}

export function UserModal({ isOpen, onClose, onSave }: UserModalProps) {
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useCadastroForm();

  const handleClose = () => {
    reset();
    onClose();
  }

  const onSubmit = async (data: CadastroFormData) => {
    try {
      setIsLoading(true);

      const res = await createUser({
        name: data.name,
        email: data.email,
        password: data.password,
        isAdmin: data.isAdmin
      })


      if (!res.success) {
        toast.error(res.message)
        return
      }

      toast.success('Usuário criado com sucesso!')
      handleClose()

    } catch (err) {
      toast.error('Falha ao criar usuario')
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Novo Usuário" size="md">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Campo Nome */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Nome Completo <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" aria-hidden="true" />
            <input
              {...register('name')}
              type='text'
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#E31969] focus:border-[#E31969] text-base ${errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
              placeholder="Digite o nome completo"
            />
          </div>
          {errors.name && (
            <p id="name-error" className="mt-1 text-sm text-red-600" role="alert">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Campo Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" aria-hidden="true" />
            <input
              {...register('email')}
              type="email"
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#E31969] focus:border-[#E31969] text-base ${errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
              placeholder="exemplo@email.com"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
          </div>
          {errors.email && (
            <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Campo Senha */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            Senha <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" aria-hidden="true" />
            <input
              {...register('password')}
              type="password"
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#E31969] focus:border-[#E31969] text-base ${errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
              placeholder="Mínimo 6 caracteres"
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? 'password-error' : undefined}
            />
          </div>
          {errors.password && (
            <p id="password-error" className="mt-1 text-sm text-red-600" role="alert">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Campo Tipo de Usuário */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="isAdmin"
            {...register('isAdmin')}
            className="h-5 w-5 text-[#E31969] border-gray-300 rounded focus:ring-[#E31969]"
          />
          <label htmlFor="isAdmin" className="text-sm font-medium text-gray-700 select-none">
            É administrador?
          </label>
        </div>
        {errors.isAdmin && (
          <p id="isAdmin-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.isAdmin.message}
          </p>
        )}

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
            disabled={isLoading}
            className="flex-1 px-6 py-3 bg-[#E31969] text-white rounded-lg hover:bg-[#c41456] active:bg-[#a01145] transition-colors duration-200 font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#E31969] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Salvando...' : 'Salvar Usuário'}
          </button>
        </div>
      </form>
    </Modal>
  )
}
