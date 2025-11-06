import React, { useState } from 'react'
import { X, Edit2, Trash2, Save, XCircle } from 'lucide-react'
import { Modal } from './Modal'
import { CategoryType } from '../../types/category'



interface ManageCategoriesModalProps {
  isOpen: boolean
  onClose: () => void
  categories: CategoryType[]
  onUpdate: (oldValue: string, updatedCategory: CategoryType) => void
  onDelete: (categoryValue: string) => void
}

export function ManageCategoriesModalProps({
  isOpen,
  onClose,
  categories,
  onUpdate,
  onDelete
}: ManageCategoriesModalProps) {
  const [editingCategory, setEditingCategory] = useState<string | null>(null)
  const [editLabel, setEditLabel] = useState('')
  const [editColor, setEditColor] = useState('')

  const handleStartEdit = (category: CategoryType) => {
    setEditingCategory(category._id)
    setEditLabel(category.label)
    setEditColor(category.color)
  }

  const handleCancelEdit = () => {
    setEditingCategory(null)
    setEditLabel('')
    setEditColor('')
  }

  const handleSaveEdit = (oldValue: string) => {
    if (!editLabel.trim()) {
      alert('O nome da categoria não pode estar vazio!')
      return
    }

    // Criar novo value baseado no label
    const newValue = editLabel.toLowerCase().replace(/\s+/g, '-').normalize('NFD').replace(/[\u0300-\u036f]/g, '')

    const updatedCategory: CategoryType = {
      _id: newValue,
      label: editLabel.trim(),
      color: editColor
    }

    onUpdate(oldValue, updatedCategory)
    handleCancelEdit()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Gerenciar Categorias">
      <div className="space-y-4">
        {categories.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Nenhuma categoria cadastrada.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {categories.map((category) => (
              <div
                key={category._id}
                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                {editingCategory === category._id ? (
                  // Modo de edição
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nome da Categoria
                      </label>
                      <input
                        type="text"
                        value={editLabel}
                        onChange={(e) => setEditLabel(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E31969] focus:border-[#E31969]"
                        placeholder="Nome da categoria"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Cor da Categoria
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          type="color"
                          value={editColor}
                          onChange={(e) => setEditColor(e.target.value)}
                          className="h-10 w-20 rounded border border-gray-300 cursor-pointer"
                        />
                        <input
                          type="text"
                          value={editColor}
                          onChange={(e) => setEditColor(e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E31969] focus:border-[#E31969]"
                          placeholder="#000000"
                        />
                      </div>
                    </div>

                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={handleCancelEdit}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer flex items-center"
                      >
                        <XCircle className="w-4 h-4 mr-1" />
                        Cancelar
                      </button>
                      <button
                        onClick={() => handleSaveEdit(category._id)}
                        className="px-4 py-2 bg-[#61CE70] text-white rounded-lg hover:bg-[#4fb85f] transition-colors cursor-pointer flex items-center"
                      >
                        <Save className="w-4 h-4 mr-1" />
                        Salvar
                      </button>
                    </div>
                  </div>
                ) : (
                  // Modo de visualização
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-full"
                        style={{ backgroundColor: category.color }}
                      />
                      <div>
                        <p className="font-medium text-gray-900">{category.label}</p>
                        <p className="text-sm text-gray-500">{category.color}</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleStartEdit(category)}
                        className="px-3 py-2 bg-[#E31969] text-white rounded-lg hover:bg-[#c41456] transition-colors cursor-pointer flex items-center text-sm"
                        aria-label={`Editar categoria ${category.label}`}
                      >
                        <Edit2 className="w-4 h-4 mr-1" />
                        Editar
                      </button>
                      <button
                        onClick={() => onDelete(category._id)}
                        className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors cursor-pointer flex items-center text-sm"
                        aria-label={`Excluir categoria ${category.label}`}
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Excluir
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </Modal>
  )
}
