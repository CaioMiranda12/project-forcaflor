'use client'
import React, { useEffect } from 'react'
import { Modal } from '@/features/posts/components/layout/Modal'
import { User, Mail, Phone, MapPin, GraduationCap, Users, FileText, Calendar } from 'lucide-react'
import { Participants } from '../types/participants'
import { EditParticipantFormData, useEditParticipantForm } from '../forms/edit-participant-form'
import { formatCPF } from '@/shared/utils/formatCpf'
import { formatCelular } from '@/shared/utils/formatCelular'
import { formatTelefone } from '@/shared/utils/formatTelefone'
interface EditParticipantModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (participantId: string, participantData: EditParticipantFormData) => void
  participants: Participants | null
}

export function EditParticipantModal({
  isOpen,
  onClose,
  onSave,
  participants,
}: EditParticipantModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting }
  } = useEditParticipantForm();


  const problemaSaude = watch('problemaSaude')
  const dataNascimento = watch('dataNascimento')

  const cpfJovem = watch("documento.cpf");
  const cpfResponsavel = watch("responsavel.cpf")

  useEffect(() => {
    if (isOpen && participants) {
      setValue("isActive", participants.isActive);
      reset({
        nomeCompleto: participants.nomeCompleto,
        dataNascimento: participants.dataNascimento,
        sexo: participants.sexo,
        endereco: participants.endereco,
        bairro: participants.bairro,
        cidade: participants.cidade,
        estado: participants.estado,
        cep: participants.cep,
        telefone: participants.telefone || '',
        celular: participants.celular,
        documento: {
          rg: participants.documento.rg || '',
          cpf: participants.documento.cpf || '',
          certidaoNascimento: participants.documento.certidaoNascimento || '',
        },
        escola: participants.escola,
        serie: participants.serie,
        turno: participants.turno,
        cartaoVacina: participants.cartaoVacina || '',
        problemaSaude: participants.problemaSaude,
        descricaoProblema: participants.descricaoProblema || '',
        responsavel: {
          nomeCompleto: participants.responsavel.nomeCompleto,
          email: participants.responsavel.email,
          telefone: participants.responsavel.telefone,
          endereco: participants.responsavel.endereco,
          rg: participants.responsavel.rg,
          cpf: participants.responsavel.cpf,
          nis: participants.responsavel.nis || '',
        },
      })
    }
  }, [participants, reset])

  const onSubmit = async (data: EditParticipantFormData) => {
    if (!participants) return

    try {
      await onSave(participants.id, data)
      onClose()
    } catch (error) {
      console.error('Erro ao atualizar estudante:', error)
    }
  }

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');

    if (value.length > 2 && value.length <= 4) {
      value = `${value.slice(0, 2)}/${value.slice(2)}`;
    } else if (value.length > 4) {
      value = `${value.slice(0, 2)}/${value.slice(2, 4)}/${value.slice(4, 8)}`;
    }

    e.target.value = value;
    setValue('dataNascimento', value);
  };


  if (!participants) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Editar Estudante" size="lg">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Dados do Estudante */}
        <div className="space-y-4">
          <h3 className="text-base font-semibold text-gray-900 mb-3">Dados do Estudante</h3>
          <div>
            <label htmlFor="nomeCompleto" className="block text-sm font-medium text-gray-700 mb-2">
              Nome Completo <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <User
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
                aria-hidden="true"
              />
              <input
                id="nomeCompleto"
                {...register('nomeCompleto')}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#E31969] focus:border-[#E31969] text-base ${errors.nomeCompleto ? 'border-red-500' : 'border-gray-300'
                  }`}
              />
            </div>
            {errors.nomeCompleto && (
              <p className="mt-1 text-sm text-red-600">{errors.nomeCompleto.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="dataNascimento" className="block text-sm font-medium text-gray-700 mb-2">
                Data de Nascimento <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Calendar
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
                  aria-hidden="true"
                />
                <input
                  id="dataNascimento"
                  type="text"
                  maxLength={10}
                  {...register('dataNascimento')}
                  onChange={handleDateChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#E31969] focus:border-[#E31969] text-base ${errors.dataNascimento ? 'border-red-500' : 'border-gray-300'
                    }`}
                />
              </div>
              {errors.dataNascimento && (
                <p className="mt-1 text-sm text-red-600">{errors.dataNascimento.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="sexo" className="block text-sm font-medium text-gray-700 mb-2">
                Sexo <span className="text-red-500">*</span>
              </label>
              <select
                id="sexo"
                {...register('sexo')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E31969] focus:border-[#E31969] text-base bg-white cursor-pointer"
              >
                <option value="masculino">Masculino</option>
                <option value="feminino">Feminino</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="telefone" className="block text-sm font-medium text-gray-700 mb-2">
                Telefone
              </label>
              <div className="relative">
                <Phone
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
                  aria-hidden="true"
                />
                <input
                  id="telefone"
                  value={watch("telefone")}
                  onChange={(e) => {
                    const masked = formatTelefone(e.target.value);
                    setValue("telefone", masked, { shouldValidate: true });
                  }}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E31969] focus:border-[#E31969] text-base"
                />
              </div>
            </div>

            <div>
              <label htmlFor="celular" className="block text-sm font-medium text-gray-700 mb-2">
                Celular <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Phone
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
                  aria-hidden="true"
                />
                <input
                  id="celular"
                  value={watch("celular")}
                  onChange={(e) => {
                    const masked = formatCelular(e.target.value);
                    setValue("celular", masked, { shouldValidate: true });
                  }}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#E31969] focus:border-[#E31969] text-base ${errors.celular ? 'border-red-500' : 'border-gray-300'
                    }`}
                />
              </div>
              {errors.celular && (
                <p className="mt-1 text-sm text-red-600">{errors.celular.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="isActive" className="block text-sm font-medium text-gray-700 mb-2">
                Status <span className="text-red-500">*</span>
              </label>
              <select
                id="status"
                {...register("isActive", {
                  setValueAs: (v) => v === "true",
                })}
                value={watch("isActive") ? "true" : "false"}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E31969] focus:border-[#E31969] text-base bg-white cursor-pointer"
              >
                <option value="true">Ativo</option>
                <option value="false">Inativo</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="endereco" className="block text-sm font-medium text-gray-700 mb-2">
              Endereço <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <MapPin
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
                aria-hidden="true"
              />
              <input
                id="endereco"
                {...register('endereco')}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#E31969] focus:border-[#E31969] text-base ${errors.endereco ? 'border-red-500' : 'border-gray-300'
                  }`}
              />
            </div>
            {errors.endereco && (
              <p className="mt-1 text-sm text-red-600">{errors.endereco.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="bairro" className="block text-sm font-medium text-gray-700 mb-2">
                Bairro <span className="text-red-500">*</span>
              </label>
              <input
                id="bairro"
                {...register('bairro')}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#E31969] focus:border-[#E31969] text-base ${errors.bairro ? 'border-red-500' : 'border-gray-300'
                  }`}
              />
              {errors.bairro && <p className="mt-1 text-sm text-red-600">{errors.bairro.message}</p>}
            </div>

            <div>
              <label htmlFor="cidade" className="block text-sm font-medium text-gray-700 mb-2">
                Cidade <span className="text-red-500">*</span>
              </label>
              <input
                id="cidade"
                {...register('cidade')}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#E31969] focus:border-[#E31969] text-base ${errors.cidade ? 'border-red-500' : 'border-gray-300'
                  }`}
              />
              {errors.cidade && <p className="mt-1 text-sm text-red-600">{errors.cidade.message}</p>}
            </div>

            <div>
              <label htmlFor="estado" className="block text-sm font-medium text-gray-700 mb-2">
                Estado <span className="text-red-500">*</span>
              </label>
              <input
                id="estado"
                {...register('estado')}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#E31969] focus:border-[#E31969] text-base ${errors.estado ? 'border-red-500' : 'border-gray-300'
                  }`}
                maxLength={2}
              />
              {errors.estado && <p className="mt-1 text-sm text-red-600">{errors.estado.message}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="cep" className="block text-sm font-medium text-gray-700 mb-2">
              CEP <span className="text-red-500">*</span>
            </label>
            <input
              id="cep"
              {...register('cep')}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#E31969] focus:border-[#E31969] text-base ${errors.cep ? 'border-red-500' : 'border-gray-300'
                }`}
              placeholder="00000-000"
            />
            {errors.cep && <p className="mt-1 text-sm text-red-600">{errors.cep.message}</p>}
          </div>

          <div className="border-t pt-4 mt-4">
            <h3 className="text-base font-semibold text-gray-900 mb-3">
              Documentos (pelo menos um obrigatório)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label htmlFor="documento.rg" className="block text-sm font-medium text-gray-700 mb-2">
                  RG
                </label>
                <div className="relative">
                  <FileText
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
                    aria-hidden="true"
                  />
                  <input
                    id="documento.rg"
                    {...register('documento.rg')}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E31969] focus:border-[#E31969] text-base"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="documento.cpf" className="block text-sm font-medium text-gray-700 mb-2">
                  CPF
                </label>
                <div className="relative">
                  <FileText
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
                    aria-hidden="true"
                  />
                  <input
                    id="documento.cpf"
                    value={cpfJovem}
                    onChange={(e) => {
                      const masked = formatCPF(e.target.value);
                      setValue("documento.cpf", masked, { shouldValidate: true });
                    }}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E31969] focus:border-[#E31969] text-base"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="documento.certidaoNascimento"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Certidão
                </label>
                <div className="relative">
                  <FileText
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
                    aria-hidden="true"
                  />
                  <input
                    id="documento.certidaoNascimento"
                    {...register('documento.certidaoNascimento')}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E31969] focus:border-[#E31969] text-base"
                  />
                </div>
              </div>
            </div>
            {errors.documento && (
              <p className="mt-1 text-sm text-red-600">{errors.documento.message}</p>
            )}
          </div>
        </div>

        {/* Educação */}
        <div className="space-y-4 border-t pt-4">
          <h3 className="text-base font-semibold text-gray-900 mb-3">Informações Educacionais</h3>
          <div>
            <label htmlFor="escola" className="block text-sm font-medium text-gray-700 mb-2">
              Escola <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <GraduationCap
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
                aria-hidden="true"
              />
              <input
                id="escola"
                {...register('escola')}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#E31969] focus:border-[#E31969] text-base ${errors.escola ? 'border-red-500' : 'border-gray-300'
                  }`}
              />
            </div>
            {errors.escola && <p className="mt-1 text-sm text-red-600">{errors.escola.message}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="serie" className="block text-sm font-medium text-gray-700 mb-2">
                Série <span className="text-red-500">*</span>
              </label>
              <select
                id="serie"
                {...register('serie')}
                className="w-full bg-white px-4 py-3 text-base border border-gray-300 rounded-lg 
                 focus:ring-2 focus:ring-primary focus:border-primary transition-colors cursor-pointer"
                style={errors.serie && { border: '2px solid red' }}
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
              {errors.serie && (
                <p className="mt-1 text-sm text-red-600">{errors.serie.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="turno" className="block text-sm font-medium text-gray-700 mb-2">
                Turno <span className="text-red-500">*</span>
              </label>
              <select
                id="turno"
                {...register('turno')}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#E31969] focus:border-[#E31969] text-base bg-white cursor-pointer ${errors.turno ? 'border-red-500' : 'border-gray-300'
                  }`}
              >
                <option value="">Selecione</option>
                <option value="Manhã">Manhã</option>
                <option value="Tarde">Tarde</option>
                <option value="Noite">Noite</option>
                <option value="Integral">Integral</option>
              </select>
              {errors.turno && <p className="mt-1 text-sm text-red-600">{errors.turno.message}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="cartaoVacina" className="block text-sm font-medium text-gray-700 mb-2">
              Cartão de Vacina (Número)
            </label>
            <input
              id="cartaoVacina"
              {...register('cartaoVacina')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E31969] focus:border-[#E31969] text-base"
            />
          </div>

          <div>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                {...register('problemaSaude')}
                className="w-4 h-4 text-[#E31969] border-gray-300 rounded focus:ring-[#E31969] cursor-pointer"
              />
              <span className="ml-2 text-sm text-gray-700">
                O estudante possui algum problema de saúde?
              </span>
            </label>
          </div>

          {problemaSaude && (
            <div>
              <label
                htmlFor="descricaoProblema"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Descreva o problema de saúde
              </label>
              <textarea
                id="descricaoProblema"
                {...register('descricaoProblema')}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E31969] focus:border-[#E31969] text-base"
              />
            </div>
          )}
        </div>

        {/* Dados do Responsável */}
        <div className="space-y-4 border-t pt-4">
          <h3 className="text-base font-semibold text-gray-900 mb-3">Dados do Responsável</h3>
          <div>
            <label
              htmlFor="responsavel.nomeCompleto"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Nome Completo <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Users
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
                aria-hidden="true"
              />
              <input
                id="responsavel.nomeCompleto"
                {...register('responsavel.nomeCompleto')}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#E31969] focus:border-[#E31969] text-base ${errors.responsavel?.nomeCompleto ? 'border-red-500' : 'border-gray-300'
                  }`}
              />
            </div>
            {errors.responsavel?.nomeCompleto && (
              <p className="mt-1 text-sm text-red-600">{errors.responsavel.nomeCompleto.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="responsavel.email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
                  aria-hidden="true"
                />
                <input
                  id="responsavel.email"
                  type="email"
                  {...register('responsavel.email')}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#E31969] focus:border-[#E31969] text-base ${errors.responsavel?.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                />
              </div>
              {errors.responsavel?.email && (
                <p className="mt-1 text-sm text-red-600">{errors.responsavel.email.message}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="responsavel.telefone"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Telefone <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Phone
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
                  aria-hidden="true"
                />
                <input
                  id="responsavel.telefone"
                  value={watch("responsavel.telefone")}
                  onChange={(e) => {
                    const masked = formatTelefone(e.target.value);
                    setValue("responsavel.telefone", masked, { shouldValidate: true });
                  }}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#E31969] focus:border-[#E31969] text-base ${errors.responsavel?.telefone ? 'border-red-500' : 'border-gray-300'
                    }`}
                />
              </div>
              {errors.responsavel?.telefone && (
                <p className="mt-1 text-sm text-red-600">{errors.responsavel.telefone.message}</p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="responsavel.endereco"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Endereço <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <MapPin
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
                aria-hidden="true"
              />
              <input
                id="responsavel.endereco"
                {...register('responsavel.endereco')}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#E31969] focus:border-[#E31969] text-base ${errors.responsavel?.endereco ? 'border-red-500' : 'border-gray-300'
                  }`}
              />
            </div>
            {errors.responsavel?.endereco && (
              <p className="mt-1 text-sm text-red-600">{errors.responsavel.endereco.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="responsavel.rg" className="block text-sm font-medium text-gray-700 mb-2">
                RG <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FileText
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
                  aria-hidden="true"
                />
                <input
                  id="responsavel.rg"
                  {...register('responsavel.rg')}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#E31969] focus:border-[#E31969] text-base ${errors.responsavel?.rg ? 'border-red-500' : 'border-gray-300'
                    }`}
                />
              </div>
              {errors.responsavel?.rg && (
                <p className="mt-1 text-sm text-red-600">{errors.responsavel.rg.message}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="responsavel.cpf"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                CPF <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FileText
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
                  aria-hidden="true"
                />
                <input
                  id="responsavel.cpf"
                  value={cpfResponsavel}
                  onChange={(e) => {
                    const masked = formatCPF(e.target.value);
                    setValue("responsavel.cpf", masked);
                  }}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#E31969] focus:border-[#E31969] text-base ${errors.responsavel?.cpf ? 'border-red-500' : 'border-gray-300'
                    }`}
                />
              </div>
              {errors.responsavel?.cpf && (
                <p className="mt-1 text-sm text-red-600">{errors.responsavel.cpf.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="responsavel.nis" className="block text-sm font-medium text-gray-700 mb-2">
                NIS
              </label>
              <input
                id="responsavel.nis"
                {...register('responsavel.nis')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E31969] focus:border-[#E31969] text-base"
              />
            </div>
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-colors duration-200 font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 px-6 py-3 bg-[#E31969] text-white rounded-lg hover:bg-[#c41456] active:bg-[#a01145] transition-colors duration-200 font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#E31969] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
          </button>
        </div>
      </form>
    </Modal>
  )
}
