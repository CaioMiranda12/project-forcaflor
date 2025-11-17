'use client'
import React, { useState } from 'react'
import { Calendar, Clock, MapPin, Users, Plus, Edit2, Trash2, Eye } from 'lucide-react'

import { toast } from 'react-toastify'
import { ActivityModal } from './ActivityModal'
import { useAuth } from '@/features/auth/context/AuthContext'
import { ActivityType } from '../types/activityType'

export default function CronogramaClient() {
  const { user } = useAuth();

  const [activities, setActivities] = useState<ActivityType[]>([
    {
      id: 1,
      title: 'Aula de Yoga',
      description: 'Uma sessão relaxante de yoga para iniciantes.',
      startHour: '08:00',
      endHour: '09:00',
      instructor: 'Ana Silva',
      location: 'Sala 1',
      dayOfWeek: 'Monday'
    }
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingActivity, setEditingActivity] = useState<ActivityType | undefined>(undefined)
  const [viewMode, setViewMode] = useState<'week' | 'all'>('week')

  // Agrupar atividades por dia da semana
  const groupByWeekday = (activities: ActivityType[]) => {
    const weekdays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
    const grouped: Record<string, ActivityType[]> = {}

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

  const handleCreateActivity = (activityData: Omit<ActivityType, 'id'>) => {
    const newActivity: ActivityType = {
      ...activityData,
      id: Math.max(...activities.map(a => a.id), 0) + 1
    }
    setActivities([...activities, newActivity])
    toast.success('Atividade criada com sucesso!')
  }

  const handleUpdateActivity = (activityData: Omit<ActivityType, 'id'>) => {
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

  const handleEditClick = (activity: ActivityType) => {
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
              {user ? 'Gerenciar Cronograma' : 'Cronograma de Atividades'}
            </h1>
            <p className="text-lg text-gray-600">
              {user ? 'Crie, edite e organize as atividades da instituição.' : 'Confira as atividades programadas para a instituição.'}
            </p>
          </div>
          {user && (
            <button
              onClick={handleNewClick}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-[#E31969] text-white rounded-lg hover:bg-[#c01456] transition-colors cursor-pointer shadow-md"
            >
              <Plus className="w-5 h-5" />
              Nova Atividade
            </button>
          )}
        </div>
      </div>

      {/* Activities List */}
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

                        {user && (
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
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

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
