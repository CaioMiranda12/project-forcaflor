
import React from 'react'
import { Calendar, Clock, MapPin, Users } from 'lucide-react'

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

export default function Cronograma() {
  const activities: Activity[] = [
    {
      id: 1,
      title: 'Aula de Reforço - Matemática',
      description: 'Aulas de reforço em matemática para crianças do ensino fundamental.',
      date: '2024-01-18',
      time: '14:00 - 16:00',
      location: 'Sala 1',
      instructor: 'Prof. Ana Paula',
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
      type: 'Arte',
      color: '#8B5CF6'
    }
  ]

  // Agrupar atividades por data
  const groupedActivities = activities.reduce((groups, activity) => {
    const date = activity.date
    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(activity)
    return groups
  }, {} as Record<string, Activity[]>)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    if (date.toDateString() === today.toDateString()) {
      return 'Hoje'
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Amanhã'
    } else {
      return date.toLocaleDateString('pt-BR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }
  }

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
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Cronograma de Atividades
        </h1>
        <p className="text-lg text-gray-600">
          Confira todas as atividades programadas para esta semana
        </p>
      </div>

      {/* Activities by Date */}
      <div className="space-y-6">
        {Object.entries(groupedActivities)
          .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
          .map(([date, dayActivities]) => (
            <div key={date} className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 capitalize">
                  {formatDate(date)}
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  {dayActivities.length} atividade{dayActivities.length !== 1 ? 's' : ''} programada{dayActivities.length !== 1 ? 's' : ''}
                </p>
              </div>

              <div className="divide-y divide-gray-200">
                {dayActivities.map((activity) => {

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
                          </div>

                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {activity.title}
                          </h3>
                          <p className="text-base text-gray-600 mb-3">
                            {activity.description}
                          </p>

                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-500">
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-2" aria-hidden="true" />
                              {activity.time}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-2" aria-hidden="true" />
                              {activity.location}
                            </div>
                            <div className="flex items-center">
                              <span className="w-4 h-4 mr-2 text-center">👨‍🏫</span>
                              {activity.instructor}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
