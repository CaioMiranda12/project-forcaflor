'use client'
import React, { useState } from 'react'
import { Calendar, Clock, MapPin, Users, Plus, Edit2, Trash2, Eye } from 'lucide-react'

import { toast } from 'react-toastify'
import ActivityModal from '@/features/cronograma/components/ActivityModal'

interface Activity {
  id: number
  title: string
  description: string
  date: string
  time: string
  location: string
  instructor: string
  participants: number
  maxParticipants: number
  type: string
  color: string
}

export default function ScheduleManagement() {
  const [activities, setActivities] = useState<Activity[]>([
    {
      id: 1,
      title: 'Aula de Reforço - Matemática',
      description: 'Aulas de reforço em matemática para crianças do ensino fundamental.',
      date: '2024-01-18',
      time: '14:00 - 16:00',
      location: 'Sala 1',
      instructor: 'Prof. Ana Paula',
      participants: 12,
      maxParticipants: 15,
      type: 'Educação',
      color: '#E31969'
    },
    {
      id: 2,
      title: 'Oficina de Arte e Pintura',
      description: 'Desenvolvimento da criatividade através de atividades artísticas.',
      date: '2024-01-19',
      time: '09:00 - 11:00',
      location: 'Ateliê',
      instructor: 'Maria Santos',
      participants: 8,
      maxParticipants: 12,
      type: 'Arte',
      color: '#8B5CF6'
    },
    {
      id: 3,
      title: 'Reunião com Voluntários',
      description: 'Reunião mensal para planejamento das atividades.',
      date: '2024-01-18',
      time: '19:00 - 20:30',
      location: 'Sala de Reuniões',
      instructor: 'Coordenação',
      participants: 8,
      maxParticipants: 20,
      type: 'Administrativo',
      color: '#61CE70'
    },
    {
      id: 4,
      title: 'Curso de Informática',
      description: 'Curso básico de informática para adolescentes.',
      date: '2024-01-20',
      time: '14:00 - 16:00',
      location: 'Laboratório',
      instructor: 'Carlos Silva',
      participants: 15,
      maxParticipants: 20,
      type: 'Tecnologia',
      color: '#3B82F6'
    },
    {
      id: 5,
      title: 'Atividade Física - Futebol',
      description: 'Treino de futebol para crianças e adolescentes.',
      date: '2024-01-21',
      time: '08:00 - 10:00',
      location: 'Quadra Externa',
      instructor: 'João Oliveira',
      participants: 18,
      maxParticipants: 22,
      type: 'Esporte',
      color: '#F59E0B'
    },
    {
      id: 6,
      title: 'Roda de Leitura',
      description: 'Atividade de incentivo à leitura e discussão de livros.',
      date: '2024-01-22',
      time: '15:00 - 16:30',
      location: 'Biblioteca',
      instructor: 'Laura Costa',
      participants: 10,
      maxParticipants: 15,
      type: 'Educação',
      color: '#E31969'
    },
    {
      id: 7,
      title: 'Oficina de Culinária',
      description: 'Aprendendo receitas saudáveis e nutritivas.',
      date: '2024-01-23',
      time: '10:00 - 12:00',
      location: 'Cozinha Comunitária',
      instructor: 'Dona Rosa',
      participants: 6,
      maxParticipants: 10,
      type: 'Vida Prática',
      color: '#10B981'
    },
    {
      id: 8,
      title: 'Teatro e Expressão',
      description: 'Desenvolvimento da expressão corporal e verbal através do teatro.',
      date: '2024-01-24',
      time: '16:00 - 17:30',
      location: 'Auditório',
      instructor: 'Pedro Martins',
      participants: 14,
      maxParticipants: 18,
      type: 'Arte',
      color: '#8B5CF6'
    }
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingActivity, setEditingActivity] = useState<Activity | undefined>(undefined)
  const [viewMode, setViewMode] = useState<'week' | 'all'>('week')

  // Agrupar atividades por dia da semana
  const groupByWeekday = (activities: Activity[]) => {
    const weekdays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
    const grouped: Record<string, Activity[]> = {}

    activities.forEach((activity) => {
      const date = new Date(activity.date + 'T00:00:00')
      const weekday = weekdays[date.getDay()]
      if (!grouped[weekday]) {
        grouped[weekday] = []
      }
      grouped[weekday].push(activity)
    })

    return grouped
  }

  const handleCreateActivity = (activityData: Omit<Activity, 'id'>) => {
    const newActivity: Activity = {
      ...activityData,
      id: Math.max(...activities.map(a => a.id), 0) + 1
    }
    setActivities([...activities, newActivity])
    toast.success('Atividade criada com sucesso!')
  }

  const handleUpdateActivity = (activityData: Omit<Activity, 'id'>) => {
    if (editingActivity) {
      setActivities(activities.map(a =>
        a.id === editingActivity.id ? { ...activityData, id: editingActivity.id } : a
      ))
      toast.success('Atividade atualizada com sucesso!')
    }
  }

  const handleDeleteActivity = (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir esta atividade?')) {
      setActivities(activities.filter(a => a.id !== id))
      toast.success('Atividade excluída com sucesso!')
    }
  }

  const handleEditClick = (activity: Activity) => {
    setEditingActivity(activity)
    setIsModalOpen(true)
  }

  const handleNewClick = () => {
    setEditingActivity(undefined)
    setIsModalOpen(true)
  }

  const groupedActivities = groupByWeekday(activities)
  const weekdayOrder = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo']

  const getParticipationStatus = (participants: number, maxParticipants: number) => {
    const percentage = (participants / maxParticipants) * 100
    if (percentage >= 90) return { status: 'Quase lotado', color: 'text-red-600' }
    if (percentage >= 70) return { status: 'Muitas vagas', color: 'text-yellow-600' }
    return { status: 'Vagas disponíveis', color: 'text-green-600' }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Gerenciar Cronograma
            </h1>
            <p className="text-lg text-gray-600">
              Crie, edite e organize as atividades da instituição
            </p>
          </div>
          <button
            onClick={handleNewClick}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-[#E31969] text-white rounded-lg hover:bg-[#c01456] transition-colors cursor-pointer shadow-md"
          >
            <Plus className="w-5 h-5" />
            Nova Atividade
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-[#E31969]">
              <Calendar className="w-6 h-6 text-white" aria-hidden="true" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total de Atividades</p>
              <p className="text-2xl font-bold text-gray-900">{activities.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-[#61CE70]">
              <Users className="w-6 h-6 text-white" aria-hidden="true" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total de Participantes</p>
              <p className="text-2xl font-bold text-gray-900">
                {activities.reduce((sum, activity) => sum + activity.participants, 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-500">
              <MapPin className="w-6 h-6 text-white" aria-hidden="true" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Locais Diferentes</p>
              <p className="text-2xl font-bold text-gray-900">
                {new Set(activities.map(a => a.location)).size}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* View Toggle */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('week')}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer ${viewMode === 'week'
              ? 'bg-[#E31969] text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            Por Dia da Semana
          </button>
          <button
            onClick={() => setViewMode('all')}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer ${viewMode === 'all'
              ? 'bg-[#E31969] text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            Todas as Atividades
          </button>
        </div>
      </div>

      {/* Activities List */}
      {viewMode === 'week' ? (
        <div className="space-y-6">
          {weekdayOrder.map((weekday) => {
            const dayActivities = groupedActivities[weekday] || []
            if (dayActivities.length === 0) return null

            return (
              <div key={weekday} className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {weekday}-feira
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    {dayActivities.length} atividade{dayActivities.length !== 1 ? 's' : ''}
                  </p>
                </div>

                <div className="divide-y divide-gray-200">
                  {dayActivities.map((activity) => {
                    const participationStatus = getParticipationStatus(activity.participants, activity.maxParticipants)

                    return (
                      <div key={activity.id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <span
                                className="px-3 py-1 text-sm font-medium rounded-full text-white"
                                style={{ backgroundColor: activity.color }}
                              >
                                {activity.type}
                              </span>
                              <span className={`text-sm font-medium ${participationStatus.color}`}>
                                {participationStatus.status}
                              </span>
                            </div>

                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                              {activity.title}
                            </h3>
                            <p className="text-base text-gray-600 mb-3">
                              {activity.description}
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-500">
                              <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-2" aria-hidden="true" />
                                {activity.time}
                              </div>
                              <div className="flex items-center">
                                <MapPin className="w-4 h-4 mr-2" aria-hidden="true" />
                                {activity.location}
                              </div>
                              <div className="flex items-center">
                                <Users className="w-4 h-4 mr-2" aria-hidden="true" />
                                {activity.participants}/{activity.maxParticipants} participantes
                              </div>
                              <div className="flex items-center">
                                <span className="w-4 h-4 mr-2 text-center">👨‍🏫</span>
                                {activity.instructor}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleEditClick(activity)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                              title="Editar"
                            >
                              <Edit2 className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleDeleteActivity(activity.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                              title="Excluir"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="divide-y divide-gray-200">
            {activities
              .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
              .map((activity) => {
                const participationStatus = getParticipationStatus(activity.participants, activity.maxParticipants)

                return (
                  <div key={activity.id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span
                            className="px-3 py-1 text-sm font-medium rounded-full text-white"
                            style={{ backgroundColor: activity.color }}
                          >
                            {activity.type}
                          </span>
                          <span className={`text-sm font-medium ${participationStatus.color}`}>
                            {participationStatus.status}
                          </span>
                          <span className="text-sm text-gray-500">
                            {new Date(activity.date + 'T00:00:00').toLocaleDateString('pt-BR')}
                          </span>
                        </div>

                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {activity.title}
                        </h3>
                        <p className="text-base text-gray-600 mb-3">
                          {activity.description}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2" aria-hidden="true" />
                            {activity.time}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2" aria-hidden="true" />
                            {activity.location}
                          </div>
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-2" aria-hidden="true" />
                            {activity.participants}/{activity.maxParticipants} participantes
                          </div>
                          <div className="flex items-center">
                            <span className="w-4 h-4 mr-2 text-center">👨‍🏫</span>
                            {activity.instructor}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEditClick(activity)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                          title="Editar"
                        >
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteActivity(activity.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          title="Excluir"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      )}

      {/* Modal */}
      <ActivityModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingActivity(undefined)
        }}
        onSave={editingActivity ? handleUpdateActivity : handleCreateActivity}
        activity={editingActivity}
      />
    </div>
  )
}
