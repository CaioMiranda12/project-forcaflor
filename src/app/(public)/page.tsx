'use client'

import React from 'react'
import { Heart, Users, Leaf, BookOpen, ArrowRight, Star, Award, MapPin } from 'lucide-react'
import Link from 'next/link'
import NewsCard from './_components/newscard'
import Image from 'next/image'

export default function Home() {

  const stats = [
    { number: '22', label: 'Anos de atuação', icon: Award },
    { number: '500+', label: 'Crianças atendidas', icon: Users },
    { number: '15', label: 'Projetos ativos', icon: Star },
    { number: '5000m²', label: 'Área da sede', icon: MapPin },
  ]

  const areas = [
    {
      icon: Users,
      title: 'Direitos da Criança',
      description: 'Garantia de direitos fundamentais para crianças e adolescentes da comunidade.',
      color: 'from-primary-500 to-primary-600'
    },
    {
      icon: BookOpen,
      title: 'Educação Profissional',
      description: 'Capacitação e formação profissional para jovens e adultos.',
      color: 'from-secondary-500 to-secondary-600'
    },
    {
      icon: Leaf,
      title: 'Sustentabilidade',
      description: 'Projetos ambientais e uso sustentável dos recursos naturais.',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Heart,
      title: 'Empreendedorismo',
      description: 'Geração de renda e oportunidades de trabalho para a comunidade.',
      color: 'from-purple-500 to-purple-600'
    },
  ]

  const news = [
    {
      title: 'Nova turma de capacitação profissional inicia em março',
      summary: 'Força Flor abre inscrições para curso de informática básica e empreendedorismo voltado para jovens da comunidade de São Pedro.',
      date: '15 de fevereiro de 2024',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg',
      category: 'Educação'
    },
    {
      title: 'Projeto de horta comunitária beneficia 50 famílias',
      summary: 'Iniciativa sustentável promove segurança alimentar e geração de renda através do cultivo orgânico de hortaliças.',
      date: '10 de fevereiro de 2024',
      image: 'https://images.pexels.com/photos/4503821/pexels-photo-4503821.jpeg',
      category: 'Sustentabilidade'
    },
    {
      title: 'Campanha de doação de materiais escolares arrecada 200 kits',
      summary: 'Graças à solidariedade da comunidade, conseguimos distribuir materiais escolares para crianças em situação de vulnerabilidade.',
      date: '5 de fevereiro de 2024',
      image: 'https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg',
      category: 'Voluntariado'
    }
  ]

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 text-white overflow-hidden" aria-labelledby="hero-title">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div
              className="opacity-0 translate-x-[-40px] animate-fade-in-left [animation-delay:200ms] animation-fill-forwards"
            >
              <h1 id="hero-title" className="text-4xl lg:text-6xl font-bold mb-6 leading-tight text-white">
                Transformando vidas através do
                <span className="text-secondary-300"> voluntariado</span>
              </h1>
              <p className="text-xl lg:text-2xl mb-8 leading-relaxed text-gray-100">
                Há mais de 23 anos, a Força Flor atua na comunidade de São Pedro,
                Paracuru-CE, promovendo educação, sustentabilidade e oportunidades.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/voluntariado"
                  className="bg-white text-primary-600 hover:bg-gray-50 active:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600 cursor-pointer inline-flex items-center justify-center"
                  aria-label="Saiba como se tornar voluntário"
                >
                  Seja Voluntário
                  <ArrowRight className="w-5 h-5 ml-2" aria-hidden="true" />
                </Link>
                <Link
                  href="/sobre"
                  className="border-2 border-white text-white hover:bg-white hover:text-primary-600 active:bg-gray-100 active:text-primary-700 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white cursor-pointer inline-flex items-center justify-center"
                  aria-label="Conheça mais sobre nossa história"
                >
                  Nossa História
                </Link>
              </div>
            </div>

            <div
              className="relative opacity-0 translate-x-[40px] animate-fade-in-right [animation-delay:400ms] animation-fill-forwards"
            >
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg"
                  alt="Crianças participando de atividades educativas na Força Flor"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-6 shadow-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-white" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">500+</p>
                    <p className="text-gray-600 text-base">Vidas transformadas</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        className="py-16 bg-gray-50"
        aria-labelledby="stats-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 opacity-0 animate-fade-up"
          >
            {stats.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-white" aria-hidden="true" />
                  </div>
                  <p className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">{stat.number}</p>
                  <p className="text-gray-600 text-base font-medium">{stat.label}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        className="py-20 bg-white"
        aria-labelledby="about-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div
              className="opacity-0 translate-x-[-40px] animate-fade-in-left animation-fill-forwards"
            >
              <h2 id="about-title" className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Sobre a Força Flor
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Fundada em 19 de setembro de 2002, a Força Flor é uma organização sem fins lucrativos
                que tem como objetivo apoiar a comunidade através de ações transformadoras.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Nossa sede própria na comunidade rural de São Pedro – Paracuru possui 5.000m²
                com infraestrutura completa para desenvolver projetos educacionais, esportivos,
                culturais e de empreendedorismo.
              </p>
              <Link
                href="/sobre"
                className="inline-flex items-center bg-primary-500 hover:bg-primary-600 active:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 cursor-pointer"
                aria-label="Saiba mais sobre nossa história e missão"
              >
                Saiba Mais
                <ArrowRight className="w-5 h-5 ml-2" aria-hidden="true" />
              </Link>
            </div>

            <div
              className="relative opacity-0 translate-x-[40px] animate-fade-in-right animation-fill-forwards"
            >
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg"
                  alt="Vista aérea da sede da Força Flor em São Pedro, Paracuru"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Areas de Atuação */}
      <section
        className="py-20 bg-gray-50"
        aria-labelledby="areas-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="text-center mb-16 opacity-0 animate-fade-up animation-fill-forwards"
          >
            <h2 id="areas-title" className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Nossas Áreas de Atuação
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Trabalhamos em diferentes frentes para promover o desenvolvimento
              integral da comunidade de São Pedro.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {areas.map((area, index) => {
              const IconComponent = area.icon
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group opacity-0 animate-fade-up animation-delay-[${index * 100}ms] animation-fill-forwards"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${area.color} rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8 text-white" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{area.title}</h3>
                  <p className="text-gray-600 text-base leading-relaxed">{area.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* News Section */}
      {/* <section className="py-20 bg-white" aria-labelledby="news-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 id="news-title" className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Últimas Notícias
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Fique por dentro das nossas atividades, projetos e conquistas
              que estão transformando a vida da comunidade.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {news.map((article, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <NewsCard {...article} />
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/noticias"
              className="inline-flex items-center bg-primary-500 hover:bg-primary-600 active:bg-primary-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 cursor-pointer"
              aria-label="Ver todas as notícias da Força Flor"
            >
              Ver Todas as Notícias
              <ArrowRight className="w-5 h-5 ml-2" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section
        className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600 text-white"
        aria-labelledby="cta-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            className="opacity-0 animate-fade-up animation-fill-forwards"
          >
            <h2 id="cta-title" className="text-3xl lg:text-4xl font-bold mb-6 text-white">
              Faça Parte Desta Transformação
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Sua ajuda pode fazer a diferença na vida de centenas de crianças,
              jovens e famílias da comunidade de São Pedro. Junte-se a nós!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/voluntariado"
                className="bg-white text-primary-600 hover:bg-gray-50 active:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600 cursor-pointer inline-flex items-center justify-center"
                aria-label="Saiba como se tornar voluntário da Força Flor"
              >
                Quero Ser Voluntário
                <Heart className="w-5 h-5 ml-2" aria-hidden="true" />
              </Link>
              <Link
                href="/contato"
                className="border-2 border-white text-white hover:bg-white hover:text-primary-600 active:bg-gray-100 active:text-primary-700 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white cursor-pointer inline-flex items-center justify-center"
                aria-label="Entre em contato conosco"
              >
                Entre em Contato
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
