
'use client'
import React from 'react'

export default function Projetos() {
  const projetos = [
    {
      titulo: "Escolinha Força Flor",
      descricao: "Educação infantil de qualidade para crianças de 3 a 6 anos, com atividades pedagógicas, recreativas e alimentação balanceada.",
      beneficiarios: "120 crianças",
      status: "Ativo",
      categoria: "Educação"
    },
    {
      titulo: "Reforço Escolar",
      descricao: "Apoio pedagógico para estudantes do ensino fundamental, com foco em português, matemática e desenvolvimento de habilidades.",
      beneficiarios: "80 estudantes",
      status: "Ativo",
      categoria: "Educação"
    },
    {
      titulo: "Oficinas Culturais",
      descricao: "Atividades de música, dança, teatro e artes visuais para crianças e adolescentes, promovendo expressão cultural e criatividade.",
      beneficiarios: "60 participantes",
      status: "Ativo",
      categoria: "Cultura"
    },
    {
      titulo: "Capacitação Profissional",
      descricao: "Cursos de qualificação profissional para jovens e adultos em áreas como informática, artesanato e empreendedorismo.",
      beneficiarios: "40 adultos",
      status: "Ativo",
      categoria: "Capacitação"
    },
    {
      titulo: "Horta Comunitária",
      descricao: "Projeto de agricultura urbana que ensina técnicas de cultivo sustentável e fornece alimentos frescos para a comunidade.",
      beneficiarios: "25 famílias",
      status: "Ativo",
      categoria: "Sustentabilidade"
    },
    {
      titulo: "Apoio Nutricional",
      descricao: "Programa de distribuição de cestas básicas e orientação nutricional para famílias em situação de vulnerabilidade.",
      beneficiarios: "150 famílias",
      status: "Ativo",
      categoria: "Assistência Social"
    }
  ]

  const categorias = ["Todos", "Educação", "Cultura", "Capacitação", "Sustentabilidade", "Assistência Social"]
  const [categoriaAtiva, setCategoriaAtiva] = React.useState("Todos")

  const projetosFiltrados = categoriaAtiva === "Todos"
    ? projetos
    : projetos.filter(projeto => projeto.categoria === categoriaAtiva)

  const getCategoriaColor = (categoria: string) => {
    const cores = {
      "Educação": "bg-blue-100 text-blue-800",
      "Cultura": "bg-purple-100 text-purple-800",
      "Capacitação": "bg-green-100 text-green-800",
      "Sustentabilidade": "bg-emerald-100 text-emerald-800",
      "Assistência Social": "bg-orange-100 text-orange-800"
    }
    return cores[categoria as keyof typeof cores] || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-linear-to-r from-primary to-secondary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Nossos Projetos
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
              Conheça as iniciativas que transformam vidas em nossa comunidade
            </p>
          </div>
        </div>
      </section>

      {/* Filtros */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categorias.map((categoria) => (
              <button
                key={categoria}
                onClick={() => setCategoriaAtiva(categoria)}
                className={`px-6 py-3 rounded-full font-semibold text-base transition-all duration-200 cursor-pointer transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${categoriaAtiva === categoria
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                aria-pressed={categoriaAtiva === categoria}
              >
                {categoria}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lista de Projetos */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projetosFiltrados.map((projeto, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getCategoriaColor(projeto.categoria)}`}>
                      {projeto.categoria}
                    </span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                      {projeto.status}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {projeto.titulo}
                  </h3>

                  <p className="text-gray-600 text-base leading-relaxed mb-4">
                    {projeto.descricao}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-primary mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A2.99 2.99 0 0 0 17.06 7H16c-1.66 0-3 1.34-3 3v2c0 .55-.45 1-1 1s-1-.45-1-1V9c0-.55-.45-1-1-1H8c-1.66 0-3 1.34-3 3v2c0 .55-.45 1-1 1s-1-.45-1-1v-2c0-1.66 1.34-3 3-3h2c.34 0 .68.07 1 .18V10c0-2.21 1.79-4 4-4h1.06c1.77 0 3.37 1.24 3.72 2.97L20 16v6h-4z" />
                      </svg>
                      <span className="text-sm font-semibold text-gray-700">
                        {projeto.beneficiarios}
                      </span>
                    </div>
                    <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                      Saiba mais
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impacto */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Nosso Impacto
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { numero: "300+", label: "Famílias Atendidas", icone: "👨‍👩‍👧‍👦" },
              { numero: "500+", label: "Crianças Beneficiadas", icone: "👶" },
              { numero: "50+", label: "Voluntários Ativos", icone: "🤝" },
              { numero: "8", label: "Anos de Atuação", icone: "🏆" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-4">{stat.icone}</div>
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.numero}
                </div>
                <div className="text-gray-600 font-semibold">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-linear-to-r from-primary to-secondary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Faça Parte da Transformação
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Junte-se a nós e ajude a construir um futuro melhor para nossa comunidade
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-primary font-bold rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary">
              Seja Voluntário
            </button>
            <button className="px-8 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-primary transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary">
              Faça uma Doação
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
