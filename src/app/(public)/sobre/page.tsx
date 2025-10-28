
export default function Sobre() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-linear-to-r from-primary to-secondary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Sobre a Força Flor
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
              Uma organização dedicada ao desenvolvimento social e educacional da nossa comunidade
            </p>
          </div>
        </div>
      </section>

      {/* Missão, Visão e Valores */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Missão</h2>
              <p className="text-gray-600 text-base leading-relaxed">
                Promover o desenvolvimento social, educacional e cultural da comunidade através de ações solidárias e programas de capacitação.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Visão</h2>
              <p className="text-gray-600 text-base leading-relaxed">
                Ser referência em transformação social, construindo uma comunidade mais justa, educada e solidária.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-linear-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Valores</h2>
              <p className="text-gray-600 text-base leading-relaxed">
                Solidariedade, transparência, respeito, inclusão e compromisso com o desenvolvimento humano e social.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* História */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
              Nossa História
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                A Força Flor nasceu do sonho de transformar vidas através da educação e do apoio comunitário.
                Fundada em 2015, nossa organização começou como uma pequena iniciativa local focada em
                oferecer reforço escolar para crianças em situação de vulnerabilidade social.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Ao longo dos anos, expandimos nossos serviços para incluir atividades culturais, esportivas
                e de capacitação profissional. Hoje, atendemos mais de 300 famílias em nossa comunidade,
                oferecendo desde educação infantil até programas de geração de renda para adultos.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Nossa jornada é marcada pela dedicação de voluntários, parceiros e pela confiança da
                comunidade que atendemos. Cada conquista é resultado do trabalho coletivo em prol de
                um futuro melhor para todos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Equipe */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Nossa Equipe
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { nome: "Maria Silva", cargo: "Diretora Executiva", descricao: "Educadora com mais de 15 anos de experiência em projetos sociais" },
              { nome: "João Santos", cargo: "Coordenador Pedagógico", descricao: "Pedagogo especializado em educação inclusiva e desenvolvimento infantil" },
              { nome: "Ana Costa", cargo: "Assistente Social", descricao: "Profissional dedicada ao acompanhamento familiar e social das crianças" }
            ].map((membro, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
                <div className="w-20 h-20 bg-linear-to-r from-primary to-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">
                    {membro.nome.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{membro.nome}</h3>
                <p className="text-primary font-semibold mb-3">{membro.cargo}</p>
                <p className="text-gray-600 text-base leading-relaxed">{membro.descricao}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}