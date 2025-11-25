'use client'

import { registerParticipant } from '@/features/participants/actions/registerParticipant'
import { ParticipantFormData, useParticipantForm } from '@/features/participants/forms/participant-form'
import { formatCelular } from '@/shared/utils/formatCelular'
import { formatCPF } from '@/shared/utils/formatCpf'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

export default function Cadastro() {
  const router = useRouter()
  const form = useParticipantForm();
  const [isLoading, setIsLoading] = useState(false)

  async function onSubmit(data: ParticipantFormData) {
    try {
      setIsLoading(true)

      const formData = new FormData()

      Object.entries(data).forEach(([key, value]) => {
        if (typeof value === "object" && value !== null) {
          Object.entries(value).forEach(([subKey, subValue]) => {
            formData.append(`${key}.${subKey}`, String(subValue ?? ""))
          })
        } else {
          formData.append(key, String(value ?? ""))
        }
      })

      await registerParticipant(formData)
      toast.success('Cadastro realizado com sucesso!')
      router.push('/')
    } catch {
      toast.error('Erro ao realizar cadastro. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  const cpfJovem = form.watch("documento.cpf");
  const cpfResponsavel = form.watch("responsavel.cpf")

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '')
    if (value.length > 2 && value.length <= 4) {
      value = `${value.slice(0, 2)}/${value.slice(2)}`
    } else if (value.length > 4) {
      value = `${value.slice(0, 2)}/${value.slice(2, 4)}/${value.slice(4, 8)}`
    }

    e.target.value = value
    form.setValue('dataNascimento', value)
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

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                    {...form.register('nomeCompleto')}
                    className="w-full bg-white px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    placeholder="Digite o nome completo do jovem"
                    style={form.formState.errors.nomeCompleto && { border: '2px solid red' }}
                  />
                  {form.formState.errors.nomeCompleto && (
                    <p className="text-red-600 text-sm mt-1">{form.formState.errors.nomeCompleto.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="dataNascimento" className="block text-base font-medium text-gray-700 mb-2">
                    Data de Nascimento *
                  </label>
                  <input
                    type="text"
                    maxLength={10}
                    {...form.register('dataNascimento', {
                      required: 'A data de nascimento é obrigatória',
                      pattern: {
                        value: /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d\d$/,
                        message: 'Formato inválido. Use dd/mm/aaaa',
                      },
                    })}
                    placeholder="dd/mm/aaaa"
                    onChange={handleDateChange}
                    className="w-full bg-white px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    style={form.formState.errors.dataNascimento && { border: '2px solid red' }}

                  />
                  {form.formState.errors.dataNascimento && (
                    <p className="text-red-600 text-sm mt-1">{form.formState.errors.dataNascimento.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="idade" className="block text-base font-medium text-gray-700 mb-2">
                    Idade
                  </label>
                  <input
                    type="number"
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
                        value="masculino"
                        checked={form.watch('sexo') === 'masculino'}
                        onChange={() => form.setValue('sexo', 'masculino')}
                        className="mr-2 w-4 h-4 text-primary focus:ring-primary"
                      />
                      <span className="text-base">Masculino</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        value="feminino"
                        checked={form.watch('sexo') === 'feminino'}
                        onChange={() => form.setValue('sexo', 'feminino')}
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
                    {...form.register("endereco")}
                    className="w-full bg-white px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    placeholder="Rua, número, complemento"
                    style={form.formState.errors.endereco && { border: '2px solid red' }}
                  />
                  {form.formState.errors.endereco && (
                    <p className="text-red-600 text-sm mt-1">{form.formState.errors.endereco.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="bairro" className="block text-base font-medium text-gray-700 mb-2">
                    Bairro *
                  </label>
                  <input
                    type="text"
                    {...form.register("bairro")}
                    className="w-full bg-white px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    style={form.formState.errors.bairro && { border: '2px solid red' }}
                  />
                  {form.formState.errors.bairro && (
                    <p className="text-red-600 text-sm mt-1">{form.formState.errors.bairro.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="cidade" className="block text-base font-medium text-gray-700 mb-2">
                    Cidade *
                  </label>
                  <input
                    type="text"
                    {...form.register("cidade")}
                    className="w-full bg-white px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    style={form.formState.errors.cidade && { border: '2px solid red' }}
                  />
                  {form.formState.errors.cidade && (
                    <p className="text-red-600 text-sm mt-1">{form.formState.errors.cidade.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="estado" className="block text-base font-medium text-gray-700 mb-2">
                    Estado *
                  </label>
                  <select
                    id="estado"
                    {...form.register('estado')}
                    className="w-full bg-white px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors cursor-pointer"
                    style={form.formState.errors.estado && { border: '2px solid red' }}
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
                  {form.formState.errors.estado && (
                    <p className="text-red-600 text-sm mt-1">{form.formState.errors.estado.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="cep" className="block text-base font-medium text-gray-700 mb-2">
                    CEP
                  </label>
                  <input
                    type="text"
                    {...form.register('cep')}
                    className="w-full bg-white px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    placeholder="00000-000"
                    style={form.formState.errors.cep && { border: '2px solid red' }}
                  />
                  {form.formState.errors.cep && (
                    <p className="text-red-600 text-sm mt-1">{form.formState.errors.cep.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="telefone" className="block text-base font-medium text-gray-700 mb-2">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    {...form.register('telefone')}
                    className="w-full bg-white px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    placeholder="(85) 3333-3333"
                  />
                  {form.formState.errors.telefone && (
                    <p className="text-red-600 text-sm mt-1">{form.formState.errors.telefone.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="celular" className="block text-base font-medium text-gray-700 mb-2">
                    Celular *
                  </label>
                  <input
                    type="tel"
                    value={form.watch("celular")}
                    onChange={(e) => {
                      const masked = formatCelular(e.target.value);
                      form.setValue("celular", masked, { shouldValidate: true });
                    }}
                    className="w-full bg-white px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    placeholder="(85) 99999-9999"
                    style={form.formState.errors.celular && { border: '2px solid red' }}
                  />
                  {form.formState.errors.celular && (
                    <p className="text-red-600 text-sm mt-1">{form.formState.errors.celular.message}</p>
                  )}
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
                        {...form.register('documento.rg')}

                        className="w-full bg-white px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="cpf" className="block text-base font-medium text-gray-700 mb-2">
                        CPF Nº
                      </label>
                      <input
                        type="text"
                        value={cpfJovem}
                        onChange={(e) => {
                          const masked = formatCPF(e.target.value);
                          form.setValue("documento.cpf", masked, { shouldValidate: true });
                        }}
                        className="w-full bg-white px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                        placeholder="000.000.000-00"
                      />
                    </div>

                    <div>
                      <label htmlFor="certidaoNascimento" className="block text-base font-medium text-gray-700 mb-2">
                        Certidão de Nascimento
                      </label>
                      <input
                        type="text"
                        {...form.register('documento.certidaoNascimento')}

                        className="w-full bg-white px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                      />
                    </div>
                  </div>

                  {form.formState.errors.documento && (
                    <p className="text-red-600 text-sm mt-1">{form.formState.errors.documento.message}</p>
                  )}
                </div>

                <div className="lg:col-span-2">
                  <label htmlFor="escola" className="block text-base font-medium text-gray-700 mb-2">
                    Escola que Estuda *
                  </label>
                  <input
                    type="text"
                    {...form.register('escola')}
                    className="w-full bg-white px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    style={form.formState.errors.escola && { border: '2px solid red' }}
                  />
                  {form.formState.errors.escola && (
                    <p className="text-red-600 text-sm mt-1">{form.formState.errors.escola.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="ano" className="block text-base font-medium text-gray-700 mb-2">
                    Ano/Série *
                  </label>
                  <select
                    id="ano"
                    {...form.register('serie')}
                    className="w-full bg-white px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors cursor-pointer"
                    style={form.formState.errors.serie && { border: '2px solid red' }}
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
                  {form.formState.errors.serie && (
                    <p className="text-red-600 text-sm mt-1">{form.formState.errors.serie.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="turno" className="block text-base font-medium text-gray-700 mb-2">
                    Turno *
                  </label>
                  <select
                    id="turno"
                    {...form.register('turno')}
                    className="w-full bg-white px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors cursor-pointer"
                    style={form.formState.errors.turno && { border: '2px solid red' }}
                  >
                    <option value="">Selecione</option>
                    <option value="Manhã">Manhã</option>
                    <option value="Tarde">Tarde</option>
                    <option value="Noite">Noite</option>
                    <option value="Integral">Integral</option>
                  </select>
                  {form.formState.errors.turno && (
                    <p className="text-red-600 text-sm mt-1">{form.formState.errors.turno.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="cartaoVacina" className="block text-base font-medium text-gray-700 mb-2">
                    Cartão de Vacina Nº
                  </label>
                  <input
                    type="text"
                    {...form.register('cartaoVacina')}
                    className="w-full bg-white px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  />
                  {form.formState.errors.cartaoVacina && (
                    <p className="text-red-600 text-sm mt-1">{form.formState.errors.cartaoVacina.message}</p>
                  )}
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
                        checked={form.watch('problemaSaude') === true}
                        onChange={() => form.setValue('problemaSaude', true)}
                        className="mr-2 w-4 h-4 text-primary focus:ring-primary"
                      />
                      <span className="text-base">Sim</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="problemaSaude"
                        value="nao"
                        checked={form.watch('problemaSaude') === false}
                        onChange={() => form.setValue('problemaSaude', false)}
                        className="mr-2 w-4 h-4 text-primary focus:ring-primary"
                      />
                      <span className="text-base">Não</span>
                    </label>
                  </div>

                  {form.watch('problemaSaude') === true && (
                    <div>
                      <label htmlFor="descricaoSaude" className="block text-base font-medium text-gray-700 mb-2">
                        Descreva o problema de saúde:
                      </label>
                      <textarea
                        {...form.register('descricaoProblema')} // verificar depois

                        rows={3}
                        className="w-full bg-white px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors resize-vertical"
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
                    {...form.register('responsavel.nomeCompleto')}
                    className="w-full bg-white px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    style={form.formState.errors.responsavel?.nomeCompleto && { border: '2px solid red' }}
                  />
                  {form.formState.errors.responsavel?.nomeCompleto && (
                    <p className="text-red-600 text-sm mt-1">{form.formState.errors.responsavel.nomeCompleto.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="emailResponsavel" className="block text-base font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    {...form.register('responsavel.email')}
                    className="w-full bg-white px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    placeholder="exemplo@email.com"
                    style={form.formState.errors.responsavel?.email && { border: '2px solid red' }}
                  />
                  {form.formState.errors.responsavel?.email && (
                    <p className="text-red-600 text-sm mt-1">{form.formState.errors.responsavel.email.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="telefoneResponsavel" className="block text-base font-medium text-gray-700 mb-2">
                    Telefone *
                  </label>
                  <input
                    type="tel"
                    {...form.register('responsavel.telefone')}
                    className="w-full bg-white px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    placeholder="(85) 99999-9999"
                    style={form.formState.errors.responsavel?.telefone && { border: '2px solid red' }}
                  />
                  {form.formState.errors.responsavel?.telefone && (
                    <p className="text-red-600 text-sm mt-1">{form.formState.errors.responsavel.telefone.message}</p>
                  )}
                </div>

                <div className="lg:col-span-2">
                  <label htmlFor="enderecoResponsavel" className="block text-base font-medium text-gray-700 mb-2">
                    Endereço Completo com Número *
                  </label>
                  <input
                    type="text"
                    {...form.register('responsavel.endereco')}
                    className="w-full bg-white px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    placeholder="Rua, número, complemento"
                    style={form.formState.errors.responsavel?.endereco && { border: '2px solid red' }}
                  />
                  {form.formState.errors.responsavel?.endereco && (
                    <p className="text-red-600 text-sm mt-1">{form.formState.errors.responsavel.endereco.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="rgResponsavel" className="block text-base font-medium text-gray-700 mb-2">
                    RG Nº *
                  </label>
                  <input
                    type="text"
                    {...form.register('responsavel.rg')}
                    className="w-full bg-white px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    style={form.formState.errors.responsavel?.rg && { border: '2px solid red' }}
                  />
                  {form.formState.errors.responsavel?.rg && (
                    <p className="text-red-600 text-sm mt-1">{form.formState.errors.responsavel.rg.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="cpfResponsavel" className="block text-base font-medium text-gray-700 mb-2">
                    CPF Nº *
                  </label>
                  <input
                    type="text"
                    value={cpfResponsavel}
                    onChange={(e) => {
                      const masked = formatCPF(e.target.value);
                      form.setValue("responsavel.cpf", masked);
                    }}
                    className="w-full bg-white px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    placeholder="000.000.000-00"
                    style={form.formState.errors.responsavel?.cpf && { border: '2px solid red' }}
                  />
                  {form.formState.errors.responsavel?.cpf && (
                    <p className="text-red-600 text-sm mt-1">{form.formState.errors.responsavel.cpf.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="nisResponsavel" className="block text-base font-medium text-gray-700 mb-2">
                    NIS Nº
                  </label>
                  <input
                    type="text"
                    {...form.register('responsavel.nis')}
                    className="w-full bg-white px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    style={form.formState.errors.responsavel?.nis && { border: '2px solid red' }}
                  />
                  {form.formState.errors.responsavel?.nis && (
                    <p className="text-red-600 text-sm mt-1">{form.formState.errors.responsavel.nis.message}</p>
                  )}
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
                  {...form.register("aceitouTermos")}
                  checked={form.watch("aceitouTermos")}
                  onChange={(e) => form.setValue("aceitouTermos", e.target.checked)}
                  className="mt-1 w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded cursor-pointer"
                />
                <label htmlFor="aceitarTermos" className="text-base text-gray-700 cursor-pointer">
                  <span className="font-medium">Li e aceito</span> o Termo de Direitos e Responsabilidades,
                  autorizando a participação nas atividades da OSC Força Flor e o uso de imagem conforme descrito acima. *
                </label>
              </div>
              {form.formState.errors.aceitouTermos && (
                <p className="text-red-600 text-sm mt-3">{form.formState.errors.aceitouTermos.message}</p>
              )}
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

