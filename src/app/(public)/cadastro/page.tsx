'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

export default function Cadastro() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    // Dados do jovem
    nomeCompleto: '',
    dataNascimento: '',
    idade: '',
    sexo: '',
    endereco: '',
    bairro: '',
    cidade: '',
    estado: '',
    cep: '',
    telefone: '',
    celular: '',
    rg: '',
    cpf: '',
    certidaoNascimento: '',
    escola: '',
    ano: '',
    turno: '',
    cartaoVacina: '',
    problemaSaude: '',
    descricaoSaude: '',

    // Dados do responsável
    nomeResponsavel: '',
    emailResponsavel: '',
    telefoneResponsavel: '',
    enderecoResponsavel: '',
    rgResponsavel: '',
    cpfResponsavel: '',
    nisResponsavel: ''
  })

  const [aceitouTermos, setAceitouTermos] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target

    setFormData(prev => ({ ...prev, [name]: value }))

    // Auto-calcular idade baseada na data de nascimento
    if (name === 'dataNascimento' && value) {
      const hoje = new Date()
      const nascimento = new Date(value)
      const idade = hoje.getFullYear() - nascimento.getFullYear()
      const mesAtual = hoje.getMonth()
      const mesNascimento = nascimento.getMonth()

      const idadeCalculada = mesAtual < mesNascimento ||
        (mesAtual === mesNascimento && hoje.getDate() < nascimento.getDate())
        ? idade - 1 : idade

      setFormData(prev => ({ ...prev, idade: idadeCalculada.toString() }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Validações básicas
      if (!formData.nomeCompleto || !formData.dataNascimento || !formData.nomeResponsavel) {
        toast.error('Por favor, preencha todos os campos obrigatórios')
        return
      }

      // Validar se pelo menos um documento foi preenchido
      if (!formData.rg && !formData.cpf && !formData.certidaoNascimento) {
        toast.error('É necessário informar pelo menos um documento: RG, CPF ou Certidão de Nascimento')
        return
      }

      // Validar aceitação dos termos
      if (!aceitouTermos) {
        toast.error('É necessário aceitar o Termo de Direitos e Responsabilidades')
        return
      }

      // Simular envio do cadastro
      await new Promise(resolve => setTimeout(resolve, 2000))

      toast.success('Cadastro realizado com sucesso!')
      router.push('/login')
    } catch (error) {
      toast.error('Erro ao realizar cadastro. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Cadastro - Escolinha de Futebol
            </h1>
            <p className="text-lg text-gray-600">
              OSC Força Flor - Iniciação Esportiva
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Dados do Jovem */}
            <div className="bg-primary-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm mr-3">1</span>
                Dados do Jovem
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <label htmlFor="nomeCompleto" className="block text-base font-medium text-gray-700 mb-2">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    id="nomeCompleto"
                    name="nomeCompleto"
                    value={formData.nomeCompleto}
                    onChange={handleInputChange}
                    required
                    aria-required="true"
                    className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    placeholder="Digite o nome completo do jovem"
                  />
                </div>

                <div>
                  <label htmlFor="dataNascimento" className="block text-base font-medium text-gray-700 mb-2">
                    Data de Nascimento *
                  </label>
                  <input
                    type="date"
                    id="dataNascimento"
                    name="dataNascimento"
                    value={formData.dataNascimento}
                    onChange={handleInputChange}
                    required
                    aria-required="true"
                    className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="idade" className="block text-base font-medium text-gray-700 mb-2">
                    Idade
                  </label>
                  <input
                    type="number"
                    id="idade"
                    name="idade"
                    value={formData.idade}
                    readOnly
                    className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                    placeholder="Calculado automaticamente"
                  />
                </div>

                <div>
                  <label className="block text-base font-medium text-gray-700 mb-2">
                    Sexo *
                  </label>
                  <div className="flex space-x-6">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="sexo"
                        value="masculino"
                        checked={formData.sexo === 'masculino'}
                        onChange={handleInputChange}
                        required
                        className="mr-2 w-4 h-4 text-primary focus:ring-primary"
                      />
                      <span className="text-base">Masculino</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="sexo"
                        value="feminino"
                        checked={formData.sexo === 'feminino'}
                        onChange={handleInputChange}
                        required
                        className="mr-2 w-4 h-4 text-primary focus:ring-primary"
                      />
                      <span className="text-base">Feminino</span>
                    </label>
                  </div>
                </div>

                <div className="lg:col-span-2">
                  <label htmlFor="endereco" className="block text-base font-medium text-gray-700 mb-2">
                    Endereço Completo com Número *
                  </label>
                  <input
                    type="text"
                    id="endereco"
                    name="endereco"
                    value={formData.endereco}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    placeholder="Rua, número, complemento"
                  />
                </div>

                <div>
                  <label htmlFor="bairro" className="block text-base font-medium text-gray-700 mb-2">
                    Bairro *
                  </label>
                  <input
                    type="text"
                    id="bairro"
                    name="bairro"
                    value={formData.bairro}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="cidade" className="block text-base font-medium text-gray-700 mb-2">
                    Cidade *
                  </label>
                  <input
                    type="text"
                    id="cidade"
                    name="cidade"
                    value={formData.cidade}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="estado" className="block text-base font-medium text-gray-700 mb-2">
                    Estado *
                  </label>
                  <select
                    id="estado"
                    name="estado"
                    value={formData.estado}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors cursor-pointer"
                  >
                    <option value="">Selecione</option>
                    <option value="CE">Ceará</option>
                    <option value="AC">Acre</option>
                    <option value="AL">Alagoas</option>
                    <option value="AP">Amapá</option>
                    <option value="AM">Amazonas</option>
                    <option value="BA">Bahia</option>
                    <option value="DF">Distrito Federal</option>
                    <option value="ES">Espírito Santo</option>
                    <option value="GO">Goiás</option>
                    <option value="MA">Maranhão</option>
                    <option value="MT">Mato Grosso</option>
                    <option value="MS">Mato Grosso do Sul</option>
                    <option value="MG">Minas Gerais</option>
                    <option value="PA">Pará</option>
                    <option value="PB">Paraíba</option>
                    <option value="PR">Paraná</option>
                    <option value="PE">Pernambuco</option>
                    <option value="PI">Piauí</option>
                    <option value="RJ">Rio de Janeiro</option>
                    <option value="RN">Rio Grande do Norte</option>
                    <option value="RS">Rio Grande do Sul</option>
                    <option value="RO">Rondônia</option>
                    <option value="RR">Roraima</option>
                    <option value="SC">Santa Catarina</option>
                    <option value="SP">São Paulo</option>
                    <option value="SE">Sergipe</option>
                    <option value="TO">Tocantins</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="cep" className="block text-base font-medium text-gray-700 mb-2">
                    CEP
                  </label>
                  <input
                    type="text"
                    id="cep"
                    name="cep"
                    value={formData.cep}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    placeholder="00000-000"
                  />
                </div>

                <div>
                  <label htmlFor="telefone" className="block text-base font-medium text-gray-700 mb-2">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    id="telefone"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    placeholder="(85) 3333-3333"
                  />
                </div>

                <div>
                  <label htmlFor="celular" className="block text-base font-medium text-gray-700 mb-2">
                    Celular *
                  </label>
                  <input
                    type="tel"
                    id="celular"
                    name="celular"
                    value={formData.celular}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    placeholder="(85) 99999-9999"
                  />
                </div>

                <div className="lg:col-span-3">
                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mb-4">
                    <p className="text-sm text-yellow-800 font-medium">
                      <strong>Documentação:</strong> É necessário informar pelo menos um dos documentos abaixo
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="rg" className="block text-base font-medium text-gray-700 mb-2">
                        RG Nº
                      </label>
                      <input
                        type="text"
                        id="rg"
                        name="rg"
                        value={formData.rg}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="cpf" className="block text-base font-medium text-gray-700 mb-2">
                        CPF Nº
                      </label>
                      <input
                        type="text"
                        id="cpf"
                        name="cpf"
                        value={formData.cpf}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                        placeholder="000.000.000-00"
                      />
                    </div>

                    <div>
                      <label htmlFor="certidaoNascimento" className="block text-base font-medium text-gray-700 mb-2">
                        Certidão de Nascimento
                      </label>
                      <input
                        type="text"
                        id="certidaoNascimento"
                        name="certidaoNascimento"
                        value={formData.certidaoNascimento}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-2">
                  <label htmlFor="escola" className="block text-base font-medium text-gray-700 mb-2">
                    Escola que Estuda *
                  </label>
                  <input
                    type="text"
                    id="escola"
                    name="escola"
                    value={formData.escola}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="ano" className="block text-base font-medium text-gray-700 mb-2">
                    Ano/Série *
                  </label>
                  <select
                    id="ano"
                    name="ano"
                    value={formData.ano}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors cursor-pointer"
                  >
                    <option value="">Selecione</option>
                    <option value="1ano">1º Ano</option>
                    <option value="2ano">2º Ano</option>
                    <option value="3ano">3º Ano</option>
                    <option value="4ano">4º Ano</option>
                    <option value="5ano">5º Ano</option>
                    <option value="6ano">6º Ano</option>
                    <option value="7ano">7º Ano</option>
                    <option value="8ano">8º Ano</option>
                    <option value="9ano">9º Ano</option>
                    <option value="1medio">1º Médio</option>
                    <option value="2medio">2º Médio</option>
                    <option value="3medio">3º Médio</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="turno" className="block text-base font-medium text-gray-700 mb-2">
                    Turno *
                  </label>
                  <select
                    id="turno"
                    name="turno"
                    value={formData.turno}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors cursor-pointer"
                  >
                    <option value="">Selecione</option>
                    <option value="manha">Manhã</option>
                    <option value="tarde">Tarde</option>
                    <option value="noite">Noite</option>
                    <option value="integral">Integral</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="cartaoVacina" className="block text-base font-medium text-gray-700 mb-2">
                    Cartão de Vacina Nº
                  </label>
                  <input
                    type="text"
                    id="cartaoVacina"
                    name="cartaoVacina"
                    value={formData.cartaoVacina}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  />
                </div>

                <div className="lg:col-span-3">
                  <label className="block text-base font-medium text-gray-700 mb-2">
                    Tem algum problema de saúde? (alergia, etc.)
                  </label>
                  <div className="flex space-x-6 mb-4">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="problemaSaude"
                        value="sim"
                        checked={formData.problemaSaude === 'sim'}
                        onChange={handleInputChange}
                        className="mr-2 w-4 h-4 text-primary focus:ring-primary"
                      />
                      <span className="text-base">Sim</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="problemaSaude"
                        value="nao"
                        checked={formData.problemaSaude === 'nao'}
                        onChange={handleInputChange}
                        className="mr-2 w-4 h-4 text-primary focus:ring-primary"
                      />
                      <span className="text-base">Não</span>
                    </label>
                  </div>

                  {formData.problemaSaude === 'sim' && (
                    <div>
                      <label htmlFor="descricaoSaude" className="block text-base font-medium text-gray-700 mb-2">
                        Descreva o problema de saúde:
                      </label>
                      <textarea
                        id="descricaoSaude"
                        name="descricaoSaude"
                        value={formData.descricaoSaude}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors resize-vertical"
                        placeholder="Descreva detalhadamente o problema de saúde..."
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Dados do Responsável */}
            <div className="bg-secondary-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <span className="w-6 h-6 bg-secondary text-white rounded-full flex items-center justify-center text-sm mr-3">2</span>
                Dados do Responsável
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <label htmlFor="nomeResponsavel" className="block text-base font-medium text-gray-700 mb-2">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    id="nomeResponsavel"
                    name="nomeResponsavel"
                    value={formData.nomeResponsavel}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="emailResponsavel" className="block text-base font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="emailResponsavel"
                    name="emailResponsavel"
                    value={formData.emailResponsavel}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    placeholder="exemplo@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="telefoneResponsavel" className="block text-base font-medium text-gray-700 mb-2">
                    Telefone *
                  </label>
                  <input
                    type="tel"
                    id="telefoneResponsavel"
                    name="telefoneResponsavel"
                    value={formData.telefoneResponsavel}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    placeholder="(85) 99999-9999"
                  />
                </div>

                <div className="lg:col-span-2">
                  <label htmlFor="enderecoResponsavel" className="block text-base font-medium text-gray-700 mb-2">
                    Endereço Completo com Número *
                  </label>
                  <input
                    type="text"
                    id="enderecoResponsavel"
                    name="enderecoResponsavel"
                    value={formData.enderecoResponsavel}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    placeholder="Rua, número, complemento"
                  />
                </div>

                <div>
                  <label htmlFor="rgResponsavel" className="block text-base font-medium text-gray-700 mb-2">
                    RG Nº *
                  </label>
                  <input
                    type="text"
                    id="rgResponsavel"
                    name="rgResponsavel"
                    value={formData.rgResponsavel}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="cpfResponsavel" className="block text-base font-medium text-gray-700 mb-2">
                    CPF Nº *
                  </label>
                  <input
                    type="text"
                    id="cpfResponsavel"
                    name="cpfResponsavel"
                    value={formData.cpfResponsavel}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    placeholder="000.000.000-00"
                  />
                </div>

                <div>
                  <label htmlFor="nisResponsavel" className="block text-base font-medium text-gray-700 mb-2">
                    NIS Nº
                  </label>
                  <input
                    type="text"
                    id="nisResponsavel"
                    name="nisResponsavel"
                    value={formData.nisResponsavel}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Termo de Direitos e Responsabilidades */}
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm mr-3">3</span>
                Termo de Direitos e Responsabilidades
              </h2>

              <div className="bg-white p-6 rounded-lg border border-gray-200 max-h-64 overflow-y-auto mb-4">
                <div className="text-sm text-gray-700 space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">DIREITOS DO PARTICIPANTE:</h3>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Participar de todas as atividades esportivas e educacionais oferecidas pelo programa</li>
                      <li>Receber orientação técnica qualificada e acompanhamento pedagógico</li>
                      <li>Utilizar os equipamentos e instalações disponibilizados pela OSC Força Flor</li>
                      <li>Ser tratado com respeito, dignidade e igualdade</li>
                      <li>Ter sua privacidade e dados pessoais protegidos conforme a LGPD</li>
                      <li>Receber atendimento em caso de acidentes durante as atividades</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">RESPONSABILIDADES DO PARTICIPANTE E RESPONSÁVEL:</h3>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Comparecer pontualmente às atividades programadas</li>
                      <li>Respeitar colegas, professores e funcionários da instituição</li>
                      <li>Cuidar adequadamente dos equipamentos e instalações</li>
                      <li>Informar imediatamente sobre problemas de saúde ou lesões</li>
                      <li>Manter atualizados os dados de contato e documentação</li>
                      <li>Seguir as normas de segurança e disciplina estabelecidas</li>
                      <li>Comunicar ausências e desistências com antecedência</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">COMPROMISSOS DA OSC FORÇA FLOR:</h3>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Oferecer atividades esportivas e educacionais de qualidade</li>
                      <li>Manter ambiente seguro e adequado para as práticas esportivas</li>
                      <li>Disponibilizar profissionais qualificados para orientação</li>
                      <li>Zelar pela integridade física e moral dos participantes</li>
                      <li>Manter sigilo das informações pessoais dos cadastrados</li>
                      <li>Comunicar aos responsáveis sobre ocorrências relevantes</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">AUTORIZAÇÃO DE USO DE IMAGEM:</h3>
                    <p className="ml-4">
                      Autorizo o uso da imagem do participante em materiais de divulgação das atividades da OSC Força Flor,
                      incluindo fotografias, vídeos e publicações em redes sociais, sempre com finalidade educativa e promocional
                      das ações sociais desenvolvidas pela organização.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">TERMO DE RESPONSABILIDADE:</h3>
                    <p className="ml-4">
                      Declaro estar ciente de que as atividades esportivas envolvem riscos inerentes à prática,
                      isentando a OSC Força Flor de responsabilidade por acidentes decorrentes de negligência
                      ou descumprimento das orientações de segurança por parte do participante.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="aceitarTermos"
                  checked={aceitouTermos}
                  onChange={(e) => setAceitouTermos(e.target.checked)}
                  required
                  className="mt-1 w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded cursor-pointer"
                />
                <label htmlFor="aceitarTermos" className="text-base text-gray-700 cursor-pointer">
                  <span className="font-medium">Li e aceito</span> o Termo de Direitos e Responsabilidades,
                  autorizando a participação nas atividades da OSC Força Flor e o uso de imagem conforme descrito acima. *
                </label>
              </div>
            </div>

            {/* Botões de Ação */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <button
                type="button"
                onClick={() => router.push('/')}
                className="px-8 py-4 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 active:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200 cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-8 py-4 text-base font-medium text-white bg-primary border border-transparent rounded-lg hover:bg-primary-dark active:bg-primary-darker focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processando...
                  </span>
                ) : (
                  'Finalizar Cadastro'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

