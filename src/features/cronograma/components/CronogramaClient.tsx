'use client'
import React, { useState } from 'react'
import { Calendar, Clock, MapPin, Users, Plus, Edit2, Trash2, Eye } from 'lucide-react'

import { toast } from 'react-toastify'
import { ActivityModal } from './ActivityModal'
import { useAuth } from '@/features/auth/context/AuthContext'
import { ActivityType } from '../types/activityType'
import { createActivity } from '../actions/create-activity'
import { getActivities } from '../actions/get-activities'
import { updateActivity } from '../actions/update-activity'
import { deleteActivity } from '../actions/delete-activity'

interface CronogramaClientProps {
  activitiesList: ActivityType[]
}

export default function CronogramaClient({ activitiesList }: CronogramaClientProps) {
  const { user } = useAuth();

  const [activities, setActivities] = useState<ActivityType[]>(activitiesList)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingActivity, setEditingActivity] = useState<ActivityType | undefined>(undefined)
  const [viewMode, setViewMode] = useState<'week' | 'all'>('week')

  // Agrupar atividades por dia da semana
  const groupByWeekday = (activities: ActivityType[]) => {
    const grouped: Record<string, ActivityType[]> = {};

    activities.forEach((activity) => {
      const weekday = activity.dayOfWeek;
      if (!grouped[weekday]) grouped[weekday] = [];
      grouped[weekday].push(activity);
    });

    return grouped;
  };


  const handleCreateActivity = async (activityData: Omit<ActivityType, 'id'>) => {
    const res = await createActivity(activityData);

    if (!res.success) {
      toast.error(res.message || "Erro ao criar atividade.");
      return;
    }

    const updatedUsers = await getActivities();
    setActivities(updatedUsers);

    toast.success(res.message);
  }

  const handleUpdateActivity = async (activityData: Omit<ActivityType, 'id'>) => {
    if (!editingActivity) return;

    const res = await updateActivity(editingActivity.id, activityData);

    if (!res.success) {
      toast.error(res.message || "Erro ao atualizar atividade.");
      return;
    }

    const updatedList = await getActivities();
    setActivities(updatedList);

    toast.success(res.message || "Atividade atualizada com sucesso.");
  }

  const handleDeleteActivity = async (id: string) => {
    if (!window.confirm("Tem certeza que deseja excluir esta atividade?")) {
      return;
    }

    const res = await deleteActivity(id);

    if (!res.success) {
      toast.error(res.message || "Erro ao deletar atividade.");
      return;
    }

    // Atualiza lista
    const updatedList = await getActivities();
    setActivities(updatedList);

    toast.success(res.message);
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
                  return (
                    <div key={activity.id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex-1">
                          {/* <div className="flex items-center gap-3 mb-3">
                            <span
                              className="px-3 py-1 text-sm font-medium rounded-full text-white"
                              style={{ backgroundColor: activity.color }}
                            >
                              {activity.type}
                            </span>
                            <span className={`text-sm font-medium ${participationStatus.color}`}>
                              {participationStatus.status}
                            </span>
                          </div> */}

                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {activity.title}
                          </h3>
                          <p className="text-base text-gray-600 mb-3">
                            {activity.description}
                          </p>

                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-500">
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-2" aria-hidden="true" />
                              {activity.startHour} - {activity.endHour}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-2" aria-hidden="true" />
                              {activity.location}
                            </div>
                            <div className="flex items-center">
                              <Users className="w-4 h-4 mr-2" aria-hidden="true" />
                              Sem limite definido
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
