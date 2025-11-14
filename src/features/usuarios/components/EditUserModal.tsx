'use client'
import React, { useState, useEffect } from 'react'
import { Modal } from '@/features/posts/components/layout/Modal'
import { User, Mail, UserCheck } from 'lucide-react'
import { useEditUserForm } from '../forms/edit-user-form'

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
  isAdmin: boolean
}

export interface EditUserFormData {
  name: string
  email: string
  isAdmin: boolean
}

export function EditUserModal({ isOpen, onClose, onSave, user }: EditUserModalProps) {

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting }
  } = useEditUserForm();
  
  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    }
  }, [user, reset]);

  

  const handleClose = () => {
    reset()
    onClose()
  }

  const onSubmit = async (data: EditUserFormData) => {
    if (!user) return;
    await onSave(user.id, data);
    handleClose();
  };

  if (!user) return null

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Editar Usuário" size="md">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Campo Nome */}
        <div>
          <label htmlFor="edit-name" className="block text-sm font-medium text-gray-700 mb-2">
            Nome Completo <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" aria-hidden="true" />
            <input
              type='text'
              {...register("name")}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#E31969] focus:border-[#E31969] text-base ${errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
              placeholder="Digite o nome completo"
            />
          </div>
          {errors.name && (
            <p id="edit-name-error" className="mt-1 text-sm text-red-600" role="alert">
              {errors.name.message}
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
              type="email"
              {...register("email")}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#E31969] focus:border-[#E31969] text-base ${errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
              placeholder="exemplo@email.com"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'edit-email-error' : undefined}
            />
          </div>
          {errors.email && (
            <p id="edit-email-error" className="mt-1 text-sm text-red-600" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>

    

       {/* Campo Administrador */}
        <div className="flex items-center gap-3 mt-4">
          <input
            id="edit-isAdmin"
            type="checkbox"
            {...register("isAdmin")}
            className="w-5 h-5 text-[#E31969] border-gray-300 rounded focus:ring-[#E31969]"
          />

          <label htmlFor="edit-isAdmin" className="text-sm font-medium text-gray-700">
            É administrador?
          </label>
        </div>

        {errors.isAdmin && (
          <p className="mt-1 text-sm text-red-600">
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

