
import React, { useState, useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Modal } from '@/features/posts/components/layout/Modal'
import { User, Mail, Phone, MapPin, FileText, GraduationCap, Users } from 'lucide-react'
import { Participants } from '../types/participants'

const editStudentSchema = z.object({
  nomeCompleto: z.string().min(3, 'Informe o nome completo'),
  dataNascimento: z.string(),
  idade: z.number().min(0),
  sexo: z.enum(['masculino', 'feminino']),
  endereco: z.string().min(1, 'Informe o endereço completo'),
  bairro: z.string().min(1, 'Informe o bairro'),
  cidade: z.string().min(1, 'Informe a cidade'),
  estado: z.string().min(1, 'Informe o estado'),
  cep: z.string().min(8, 'CEP inválido'),
  telefone: z.string().optional(),
  celular: z.string().min(8, 'Celular inválido'),
  escola: z.string().min(1, 'Informe a escola'),
  serie: z.string().min(1, 'Informe o ano/série'),
  turno: z.string().min(1, 'Informe o turno'),
  problemaSaude: z.boolean(),
  descricaoProblema: z.string().optional(),
  responsavel: z.object({
    nomeCompleto: z.string().min(3, 'Informe o nome completo'),
    email: z.string().email('Email inválido'),
    telefone: z.string().min(8, 'Telefone inválido'),
  }),
  status: z.enum(['active', 'inactive']),
})

export type EditStudentFormData = z.infer<typeof editStudentSchema>

interface EditStudentModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (studentId: number, studentData: EditStudentFormData) => void
  participants: Participants | null
}

export function EditStudentModal({
  isOpen,
  onClose,
  onSave,
  participants,
}: EditStudentModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setValue,
  } = useForm<EditStudentFormData>({
    resolver: zodResolver(editStudentSchema),
  })

  const problemaSaude = watch('problemaSaude')
  const dataNascimento = watch('dataNascimento')

  useEffect(() => {
    if (participants) {
      reset({
        nomeCompleto: participants.nomeCompleto,
        dataNascimento: participants.dataNascimento,
        idade: participants.idade,
        sexo: participants.sexo,
        endereco: participants.endereco,
        bairro: participants.bairro,
        cidade: participants.cidade,
        estado: participants.estado,
        cep: participants.cep,
        telefone: participants.telefone || '',
        celular: participants.celular,
        escola: participants.escola,
        serie: participants.serie,
        turno: participants.turno,
        problemaSaude: participants.problemaSaude,
        descricaoProblema: participants.descricaoProblema || '',
        responsavel: {
          nomeCompleto: participants.responsavel.nomeCompleto,
          email: participants.responsavel.email,
          telefone: participants.responsavel.telefone,
        },
        status: participants.status,
      })
    }
  }, [participants, reset])

  // Calcular idade automaticamente
  useEffect(() => {
    if (dataNascimento) {
      const birthDate = new Date(dataNascimento)
      const today = new Date()
      let age = today.getFullYear() - birthDate.getFullYear()
      const monthDiff = today.getMonth() - birthDate.getMonth()
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--
      }
      setValue('idade', age)
    }
  }, [dataNascimento, setValue])

  const onSubmit = async (data: EditStudentFormData) => {
    if (!participants) return

    setIsSubmitting(true)
    try {
      await onSave(participants.id, data)
      onClose()
    } catch (error) {
      console.error('Erro ao atualizar estudante:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

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
                  {...register('celular')}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#E31969] focus:border-[#E31969] text-base ${errors.celular ? 'border-red-500' : 'border-gray-300'
                    }`}
                />
              </div>
              {errors.celular && (
                <p className="mt-1 text-sm text-red-600">{errors.celular.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                Status <span className="text-red-500">*</span>
              </label>
              <select
                id="status"
                {...register('status')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E31969] focus:border-[#E31969] text-base bg-white cursor-pointer"
              >
                <option value="active">Ativo</option>
                <option value="inactive">Inativo</option>
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
                Ano/Série <span className="text-red-500">*</span>
              </label>
              <input
                id="serie"
                {...register('serie')}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#E31969] focus:border-[#E31969] text-base ${errors.serie ? 'border-red-500' : 'border-gray-300'
                  }`}
              />
              {errors.serie && <p className="mt-1 text-sm text-red-600">{errors.serie.message}</p>}
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
                  {...register('responsavel.telefone')}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#E31969] focus:border-[#E31969] text-base ${errors.responsavel?.telefone ? 'border-red-500' : 'border-gray-300'
                    }`}
                />
              </div>
              {errors.responsavel?.telefone && (
                <p className="mt-1 text-sm text-red-600">{errors.responsavel.telefone.message}</p>
              )}
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
