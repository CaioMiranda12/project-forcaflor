
import React, { useState } from 'react'
import { Modal } from '@/features/posts/components/layout/Modal'
import { AlertTriangle } from 'lucide-react'

interface DeleteStudentModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (studentId: number) => void
  studentName: string
  studentId: number | null
}

export function DeleteStudentModal({
  isOpen,
  onClose,
  onConfirm,
  studentName,
  studentId,
}: DeleteStudentModalProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleConfirm = async () => {
    if (!studentId) return

    setIsDeleting(true)
    try {
      await onConfirm(studentId)
      onClose()
    } catch (error) {
      console.error('Erro ao excluir estudante:', error)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Confirmar Exclusão" size="sm">
      <div className="space-y-4">
        {/* Ícone de Alerta */}
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-red-600" aria-hidden="true" />
          </div>
        </div>

        {/* Mensagem de Confirmação */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Tem certeza que deseja excluir este estudante?
          </h3>
          <p className="text-base text-gray-600">
            O estudante <span className="font-semibold text-gray-900">{studentName}</span> será
            removido permanentemente do sistema.
          </p>
          <p className="text-sm text-red-600 mt-2">Esta ação não pode ser desfeita.</p>
        </div>

        {/* Botões de Ação */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-colors duration-200 font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={isDeleting}
            className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 active:bg-red-800 transition-colors duration-200 font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDeleting ? 'Excluindo...' : 'Sim, Excluir'}
          </button>
        </div>
      </div>
    </Modal>
  )
}
