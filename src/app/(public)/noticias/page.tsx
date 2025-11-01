'use client'

import React, { useState } from 'react'
import { Search, Calendar, User, Eye } from 'lucide-react'

interface NewsItem {
  id: number
  title: string
  excerpt: string
  content: string
  author: string
  publishDate: string
  views: number
  image: string
  category: string
  categoryLabel: string
}

export default function Noticias() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null)

  const newsItems: NewsItem[] = [
    {
      id: 1,
      title: 'Nova oficina de informática para adolescentes',
      excerpt: 'Inscrições abertas para curso básico de computação voltado para jovens de 14 a 18 anos.',
      content: 'A ONG Força Flor está com inscrições abertas para uma nova oficina de informática voltada especificamente para adolescentes de 14 a 18 anos. O curso terá duração de 3 meses e abordará conceitos básicos de computação, internet segura e ferramentas de produtividade. As aulas acontecerão às terças e quintas-feiras, das 14h às 16h, em nossa sede. Para se inscrever, os interessados devem comparecer à nossa sede com RG, comprovante de residência e declaração escolar. São oferecidas 20 vagas e as inscrições seguem até o dia 25 de janeiro.',
      author: 'Ana Paula Silva',
      publishDate: '2024-01-15',
      views: 245,
      image: 'https://images.pexels.com/photos/5905709/pexels-photo-5905709.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'education',
      categoryLabel: 'Educação'
    },
    {
      id: 2,
      title: 'Campanha de arrecadação de materiais escolares',
      excerpt: 'Ajude-nos a coletar materiais escolares para as crianças da comunidade.',
      content: 'Estamos iniciando nossa tradicional campanha de arrecadação de materiais escolares para apoiar as crianças e adolescentes da nossa comunidade no retorno às aulas. Precisamos de cadernos, lápis, canetas, borrachas, réguas, mochilas e uniformes escolares. A campanha vai até o final de janeiro e todos os materiais arrecadados serão distribuídos gratuitamente para famílias em situação de vulnerabilidade social. Você pode fazer sua doação em nossa sede, de segunda a sexta-feira, das 8h às 17h. Juntos, podemos garantir que todas as crianças tenham acesso aos materiais necessários para um bom desempenho escolar.',
      author: 'Carlos Santos',
      publishDate: '2024-01-12',
      views: 189,
      image: 'https://images.pexels.com/photos/8613317/pexels-photo-8613317.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'community',
      categoryLabel: 'Comunidade'
    },
    {
      id: 3,
      title: 'Resultado do projeto de leitura',
      excerpt: 'Confira os resultados incríveis do nosso projeto de incentivo à leitura.',
      content: 'O projeto "Ler para Crescer", desenvolvido ao longo de 2023, alcançou resultados extraordinários. Conseguimos aumentar em 60% o interesse pela leitura entre as crianças participantes, com mais de 150 crianças atendidas diretamente. Foram distribuídos 500 livros, realizadas 48 rodas de leitura e criado um pequeno acervo comunitário com mais de 200 títulos. O projeto contou com a participação de 15 voluntários e o apoio de parceiros locais. Para 2024, planejamos expandir o projeto para atender ainda mais crianças e incluir atividades de produção textual e contação de histórias.',
      author: 'Maria Oliveira',
      publishDate: '2024-01-10',
      views: 156,
      image: 'https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'achievements',
      categoryLabel: 'Conquistas'
    },
    {
      id: 4,
      title: 'Festa junina da comunidade 2024',
      excerpt: 'Venha participar da nossa festa junina! Haverá comidas típicas, brincadeiras e apresentações culturais.',
      content: 'Nossa tradicional festa junina acontecerá no dia 22 de junho, a partir das 15h, no pátio da sede da ONG. O evento é aberto a toda a comunidade e contará com barracas de comidas típicas, brincadeiras tradicionais como pescaria e correio elegante, quadrilha com as crianças do projeto, apresentações de dança e música ao vivo. A entrada é gratuita e toda a renda arrecadada com a venda de alimentos será revertida para os projetos da ONG. Estamos precisando de voluntários para ajudar na organização e de doações para as barracas. Quem puder contribuir, pode entrar em contato conosco. Será uma tarde de muita alegria e confraternização!',
      author: 'João Silva',
      publishDate: '2024-01-08',
      views: 98,
      image: 'https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'events',
      categoryLabel: 'Eventos'
    },
    {
      id: 5,
      title: 'Novo projeto de capacitação profissional',
      excerpt: 'Lançamento de curso gratuito de capacitação profissional para jovens e adultos.',
      content: 'A partir de fevereiro, estaremos oferecendo um novo projeto de capacitação profissional voltado para jovens a partir de 16 anos e adultos da comunidade. O curso abordará temas como elaboração de currículo, técnicas de entrevista, empreendedorismo básico e desenvolvimento de habilidades interpessoais. As aulas acontecerão aos sábados, das 9h às 12h, com duração de 2 meses. Ao final do curso, os participantes receberão certificado de participação e apoio na busca por oportunidades de trabalho através de nossa rede de parceiros. As inscrições começam no dia 20 de janeiro e são limitadas a 25 vagas.',
      author: 'Laura Costa',
      publishDate: '2024-01-05',
      views: 134,
      image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'education',
      categoryLabel: 'Educação'
    }
  ]

  const filteredNews = newsItems.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'education': return '#E31969'
      case 'community': return '#61CE70'
      case 'events': return '#8B5CF6'
      case 'achievements': return '#F59E0B'
      default: return '#6B7280'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Notícias
        </h1>
        <p className="text-lg text-gray-600">
          Fique por dentro das últimas novidades da ONG Força Flor
        </p>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" aria-hidden="true" />
          <input
            type="text"
            placeholder="Buscar notícias por título ou conteúdo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E31969] focus:border-[#E31969] text-base"
            aria-label="Buscar notícias"
          />
        </div>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNews.map((item) => (
          <article
            key={item.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer"
            onClick={() => setSelectedNews(item)}
          >
            <div className="relative">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 left-4">
                <span
                  className="px-3 py-1 text-sm font-medium rounded-full text-white"
                  style={{ backgroundColor: getCategoryColor(item.category) }}
                >
                  {item.categoryLabel}
                </span>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                {item.title}
              </h3>
              <p className="text-base text-gray-600 mb-4 line-clamp-3">
                {item.excerpt}
              </p>

              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-1" aria-hidden="true" />
                    {item.author}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" aria-hidden="true" />
                    {new Date(item.publishDate).toLocaleDateString('pt-BR')}
                  </div>
                </div>
                <div className="flex items-center">
                  <Eye className="w-4 h-4 mr-1" aria-hidden="true" />
                  {item.views}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {filteredNews.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Nenhuma notícia encontrada
          </h3>
          <p className="text-base text-gray-600">
            Tente ajustar sua busca para encontrar o que procura.
          </p>
        </div>
      )}

      {/* News Detail Modal */}
      {selectedNews && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
              onClick={() => setSelectedNews(null)}
            />

            <div className="inline-block w-full max-w-4xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
              <div className="flex justify-between items-start mb-6">
                <div className="flex-1">
                  <span
                    className="inline-block px-3 py-1 text-sm font-medium rounded-full text-white mb-4"
                    style={{ backgroundColor: getCategoryColor(selectedNews.category) }}
                  >
                    {selectedNews.categoryLabel}
                  </span>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {selectedNews.title}
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedNews(null)}
                  className="p-2 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#E31969] rounded-lg"
                >
                  ✕
                </button>
              </div>

              <img
                src={selectedNews.image}
                alt={selectedNews.title}
                className="w-full h-64 object-cover rounded-lg mb-6"
              />

              <div className="flex items-center space-x-6 text-sm text-gray-500 mb-6 pb-6 border-b border-gray-200">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  {selectedNews.author}
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  {new Date(selectedNews.publishDate).toLocaleDateString('pt-BR')}
                </div>
                <div className="flex items-center">
                  <Eye className="w-4 h-4 mr-2" />
                  {selectedNews.views} visualizações
                </div>
              </div>

              <div className="prose max-w-none">
                <p className="text-base text-gray-700 leading-relaxed whitespace-pre-line">
                  {selectedNews.content}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setSelectedNews(null)}
                  className="px-6 py-3 bg-[#E31969] text-white rounded-lg hover:bg-[#c41456] active:bg-[#a01145] transition-colors duration-200 font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#E31969] focus:ring-offset-2"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
