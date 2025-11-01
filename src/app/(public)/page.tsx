
'use client'
import React from 'react'
import { Calendar, FileText, Clock, MapPin, UserPlus, LogIn } from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/features/auth/context/AuthContext'

export default function Dashboard() {
  const { user } = useAuth();

  const recentNews = [
    {
      id: 1,
      title: 'Nova oficina de informática para adolescentes',
      excerpt: 'Inscrições abertas para curso básico de computação voltado para jovens de 14 a 18 anos.',
      date: '2024-01-15',
      image: 'https://images.pexels.com/photos/5905709/pexels-photo-5905709.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 2,
      title: 'Campanha de arrecadação de materiais escolares',
      excerpt: 'Ajude-nos a coletar materiais escolares para as crianças da comunidade.',
      date: '2024-01-12',
      image: 'https://images.pexels.com/photos/8613317/pexels-photo-8613317.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 3,
      title: 'Resultado do projeto de leitura',
      excerpt: 'Confira os resultados incríveis do nosso projeto de incentivo à leitura.',
      date: '2024-01-10',
      image: 'https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ]

  const upcomingActivities = [
    {
      id: 1,
      title: 'Aula de Reforço - Matemática',
      time: '14:00 - 16:00',
      date: 'Hoje',
      location: 'Sala 1',
      type: 'Educação'
    },
    {
      id: 2,
      title: 'Oficina de Arte e Pintura',
      time: '09:00 - 11:00',
      date: 'Amanhã',
      location: 'Ateliê',
      type: 'Arte'
    },
    {
      id: 3,
      title: 'Reunião com Voluntários',
      time: '19:00 - 20:30',
      date: '18 Jan',
      location: 'Sala de Reuniões',
      type: 'Administrativo'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-linear-to-r from-[#E31969] to-[#61CE70] rounded-lg p-6 text-white">
        <h1 className="text-2xl sm:text-3xl text-white font-bold mb-2">
          Bem-vindo ao Portal Força Flor! 🌸
        </h1>
        <p className="text-lg opacity-90">
          Acompanhe todas as atividades e novidades da nossa comunidade
        </p>
      </div>

      {!user && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
            <div className="text-center">
              <div className="p-4 bg-[#E31969] rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <LogIn className="w-8 h-8 text-white" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Fazer Login
              </h3>
              <p className="text-gray-600 mb-4">
                Acesse sua conta para gerenciar atividades e conteúdo
              </p>
              <Link
                href={'/login'}
                className="w-full px-6 py-3 bg-[#E31969] text-white rounded-lg hover:bg-[#c41456] active:bg-[#a01145] transition-colors duration-200 font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#E31969] focus:ring-offset-2"
              >
                Entrar
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
            <div className="text-center">
              <div className="p-4 bg-[#61CE70] rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <UserPlus className="w-8 h-8 text-white" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Criar Conta
              </h3>
              <p className="text-gray-600 mb-4">
                Cadastre-se para participar das atividades da comunidade
              </p>
              <Link
                href={'/cadastro'}
                className="w-full px-6 py-3 bg-[#61CE70] text-white rounded-lg hover:bg-[#4fb85f] active:bg-[#3da34d] transition-colors duration-200 font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#61CE70] focus:ring-offset-2"
              >
                Cadastrar
              </Link>
            </div>
          </div>
        </div>
      )}


      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent News */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                Notícias Recentes
              </h2>
            </div>
            <div className="divide-y divide-gray-200">
              {recentNews.map((news) => (
                <article key={news.id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex space-x-4">
                    <img
                      src={news.image}
                      alt={news.title}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        {news.title}
                      </h3>
                      <p className="text-gray-600 text-base mb-2 line-clamp-2">
                        {news.excerpt}
                      </p>
                      <time className="text-sm text-gray-500">
                        {new Date(news.date).toLocaleDateString('pt-BR')}
                      </time>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <div className="p-6 border-t border-gray-200">
              <button className="w-full sm:w-auto px-6 py-3 bg-[#E31969] text-white rounded-lg hover:bg-[#c41456] active:bg-[#a01145] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#E31969] focus:ring-offset-2">
                Ver todas as notícias
              </button>
            </div>
          </div>
        </div>

        {/* Upcoming Activities */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Próximas Atividades
            </h2>
          </div>
          <div className="divide-y divide-gray-200">
            {upcomingActivities.map((activity) => (
              <div key={activity.id} className="p-6">
                <div className="flex items-start space-x-3">
                  <div className="shrink-0">
                    <div className="w-3 h-3 bg-[#61CE70] rounded-full mt-2"></div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-medium text-gray-900 mb-2">
                      {activity.title}
                    </h3>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="w-4 h-4 mr-2" aria-hidden="true" />
                        {activity.time} - {activity.date}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" aria-hidden="true" />
                        {activity.location}
                      </div>
                    </div>
                    <span className="inline-block px-2 py-1 text-xs font-medium bg-[#61CE70] text-white rounded-full mt-2">
                      {activity.type}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-6 border-t border-gray-200">
            <button className="w-full px-6 py-3 bg-[#61CE70] text-white rounded-lg hover:bg-[#4fb85f] active:bg-[#3da34d] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#61CE70] focus:ring-offset-2">
              Ver cronograma completo
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
