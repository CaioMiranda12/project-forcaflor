import React, { useState, useEffect } from 'react'
import { Modal } from '@/features/posts/components/layout/Modal'
import { Calendar, Clock, MapPin, Tag } from 'lucide-react'

interface Activity {
  id: number
  title: string
  description: string
  date: string
  time: string
  location: string
  instructor: string
  type: string
  color: string
}

interface ActivityModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (activity: Omit<Activity, 'id'>) => void
  activity?: Activity
}

const activityTypes = [
  { name: 'Educação', color: '#E31969' },
  { name: 'Arte', color: '#8B5CF6' },
  { name: 'Administrativo', color: '#61CE70' },
  { name: 'Tecnologia', color: '#3B82F6' },
  { name: 'Esporte', color: '#F59E0B' },
  { name: 'Vida Prática', color: '#10B981' }
]

export function ActivityModal({ isOpen, onClose, onSave, activity }: ActivityModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    instructor: '',
    type: 'Educação',
    color: '#E31969'
  })

  useEffect(() => {
    if (activity) {
      setFormData({
        title: activity.title,
        description: activity.description,
        date: activity.date,
        time: activity.time,
        location: activity.location,
        instructor: activity.instructor,
        type: activity.type,
        color: activity.color
      })
    } else {
      setFormData({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        instructor: '',
        type: 'Educação',
        color: '#E31969'
      })
    }
  }, [activity, isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
    onClose()
  }

  const handleTypeChange = (type: string, color: string) => {
    setFormData({ ...formData, type, color })
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={activity ? 'Editar Atividade' : 'Nova Atividade'}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Título */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Título da Atividade
          </label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E31969] focus:border-transparent"
            placeholder="Ex: Aula de Reforço - Matemática"
          />
        </div>

        {/* Descrição */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Descrição
          </label>
          <textarea
            required
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E31969] focus:border-transparent resize-none"
            placeholder="Descreva a atividade..."
          />
        </div>

        {/* Data e Horário */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Calendar className="w-4 h-4 inline mr-1" />
              Data
            </label>
            <input
              type="date"
              required
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E31969] focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Clock className="w-4 h-4 inline mr-1" />
              Horário
            </label>
            <input
              type="text"
              required
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E31969] focus:border-transparent"
              placeholder="Ex: 14:00 - 16:00"
            />
          </div>
        </div>

        {/* Local e Instrutor */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <MapPin className="w-4 h-4 inline mr-1" />
              Local
            </label>
            <input
              type="text"
              required
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E31969] focus:border-transparent"
              placeholder="Ex: Sala 1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              👨‍🏫 Instrutor
            </label>
            <input
              type="text"
              required
              value={formData.instructor}
              onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E31969] focus:border-transparent"
              placeholder="Ex: Prof. Ana Paula"
            />
          </div>
        </div>

        {/* Tipo de Atividade */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Tag className="w-4 h-4 inline mr-1" />
            Tipo de Atividade
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {activityTypes.map((type) => (
              <button
                key={type.name}
                type="button"
                onClick={() => handleTypeChange(type.name, type.color)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${formData.type === type.name
                  ? 'text-white shadow-md transform scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                style={formData.type === type.name ? { backgroundColor: type.color } : {}}
              >
                {type.name}
              </button>
            ))}
          </div>
        </div>

        {/* Botões */}
        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="flex-1 px-4 py-2 bg-[#E31969] text-white rounded-lg hover:bg-[#c01456] transition-colors cursor-pointer"
          >
            {activity ? 'Salvar Alterações' : 'Criar Atividade'}
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default ActivityModal