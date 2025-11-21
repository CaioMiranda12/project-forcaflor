
import React, { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Modal } from '@/features/posts/components/layout/Modal'
import { User, Mail, Phone, MapPin, FileText, GraduationCap, Calendar, Users } from 'lucide-react'

const studentSchema = z.object({
  // Dados do Jovem
  nomeCompleto: z.string().min(3, 'Informe o nome completo'),
  dataNascimento: z.string().refine(
    (value) => {
      const date = new Date(value)
      const today = new Date()
      return date <= today
    },
    { message: 'A data de nascimento não pode ser futura' }
  ),
  idade: z.number().min(0),
  sexo: z.enum(['masculino', 'feminino']),
  endereco: z.string().min(1, 'Informe o endereço completo'),
  bairro: z.string().min(1, 'Informe o bairro'),
  cidade: z.string().min(1, 'Informe a cidade'),
  estado: z.string().min(1, 'Informe o estado'),
  cep: z.string().min(8, 'CEP inválido'),
  telefone: z.string().optional(),
  celular: z.string().min(8, 'Celular inválido'),
  documento: z
    .object({
      rg: z.string().optional(),
      cpf: z.string().optional(),
      certidaoNascimento: z.string().optional(),
    })
    .refine((data) => data.rg || data.cpf || data.certidaoNascimento, {
      message: 'Informe pelo menos um documento (RG, CPF ou Certidão)',
    }),
  escola: z.string().min(1, 'Informe a escola'),
  serie: z.string().min(1, 'Informe o ano/série'),
  turno: z.string().min(1, 'Informe o turno'),
  cartaoVacina: z.string().optional(),
  problemaSaude: z.boolean(),
  descricaoProblema: z.string().optional(),

  // Dados do Responsável
  responsavel: z.object({
    nomeCompleto: z.string().min(3, 'Informe o nome completo'),
    email: z.string().email('Email inválido'),
    telefone: z.string().min(8, 'Telefone inválido'),
    endereco: z.string().min(1, 'Informe o endereço completo'),
    rg: z.string().min(1, 'Informe o RG'),
    cpf: z.string().min(11, 'Informe o CPF'),
    nis: z.string().optional(),
  }),

  aceitouTermos: z.boolean().refine((val) => val === true, {
    message: 'Você deve aceitar o termo para continuar',
  }),
})

export type StudentFormData = z.infer<typeof studentSchema>

interface StudentModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (studentData: StudentFormData) => void
}

export function StudentModal({ isOpen, onClose, onSave }: StudentModalProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setValue,
  } = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      nomeCompleto: '',
      dataNascimento: '',
      idade: 0,
      sexo: 'masculino',
      endereco: '',
      bairro: '',
      cidade: '',
      estado: '',
      cep: '',
      telefone: '',
      celular: '',
      documento: {
        rg: '',
        cpf: '',
        certidaoNascimento: '',
      },
      escola: '',
      serie: '',
      turno: '',
      cartaoVacina: '',
      problemaSaude: false,
      descricaoProblema: '',
      responsavel: {
        nomeCompleto: '',
        email: '',
        telefone: '',
        endereco: '',
        rg: '',
        cpf: '',
        nis: '',
      },
      aceitouTermos: false,
    },
  })

  const problemaSaude = watch('problemaSaude')
  const dataNascimento = watch('dataNascimento')

  // Calcular idade automaticamente
  React.useEffect(() => {
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

  const onSubmit = async (data: StudentFormData) => {
    setIsSubmitting(true)
    try {
      await onSave(data)
      reset()
      setCurrentStep(1)
      onClose()
    } catch (error) {
      console.error('Erro ao salvar estudante:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    reset()
    setCurrentStep(1)
    onClose()
  }

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 3))
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1))

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Cadastrar Novo Estudante" size="lg">
      {/* Progress Indicator */}
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div className="flex-1">
            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-[#E31969] text-white' : 'bg-gray-200 text-gray-600'
                  }`}
              >
                1
              </div>
              <div
                className={`flex-1 h-1 mx-2 ${currentStep >= 2 ? 'bg-[#E31969]' : 'bg-gray-200'}`}
              />
            </div>
            <p className="text-xs mt-1 text-gray-600">Dados do Estudante</p>
          </div>
          <div className="flex-1">
            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-[#E31969] text-white' : 'bg-gray-200 text-gray-600'
                  }`}
              >
                2
              </div>
              <div
                className={`flex-1 h-1 mx-2 ${currentStep >= 3 ? 'bg-[#E31969]' : 'bg-gray-200'}`}
              />
            </div>
            <p className="text-xs mt-1 text-gray-600">Educação e Saúde</p>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-end">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 3 ? 'bg-[#E31969] text-white' : 'bg-gray-200 text-gray-600'
                  }`}
              >
                3
              </div>
            </div>
            <p className="text-xs mt-1 text-gray-600 text-right">Dados do Responsável</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Step 1: Dados do Estudante */}
        {currentStep === 1 && (
          <div className="space-y-4">
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
                  placeholder="Digite o nome completo"
                />
              </div>
              {errors.nomeCompleto && (
                <p className="mt-1 text-sm text-red-600">{errors.nomeCompleto.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="dataNascimento"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Data de Nascimento <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Calendar
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
                    aria-hidden="true"
                  />
                  <input
                    id="dataNascimento"
                    type="date"
                    {...register('dataNascimento')}
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
                  placeholder="Rua, número"
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
                {errors.bairro && (
                  <p className="mt-1 text-sm text-red-600">{errors.bairro.message}</p>
                )}
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
                {errors.cidade && (
                  <p className="mt-1 text-sm text-red-600">{errors.cidade.message}</p>
                )}
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
                  placeholder="SP"
                  maxLength={2}
                />
                {errors.estado && (
                  <p className="mt-1 text-sm text-red-600">{errors.estado.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                    {...register('telefone')}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E31969] focus:border-[#E31969] text-base"
                    placeholder="(00) 0000-0000"
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
                    {...register('celular')}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#E31969] focus:border-[#E31969] text-base ${errors.celular ? 'border-red-500' : 'border-gray-300'
                      }`}
                    placeholder="(00) 00000-0000"
                  />
                </div>
                {errors.celular && (
                  <p className="mt-1 text-sm text-red-600">{errors.celular.message}</p>
                )}
              </div>
            </div>

            <div className="border-t pt-4 mt-4">
              <h3 className="text-base font-semibold text-gray-900 mb-3">
                Documentos (pelo menos um obrigatório)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label
                    htmlFor="documento.rg"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
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
                  <label
                    htmlFor="documento.cpf"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    CPF
                  </label>
                  <div className="relative">
                    <FileText
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
                      aria-hidden="true"
                    />
                    <input
                      id="documento.cpf"
                      {...register('documento.cpf')}
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
        )}

        {/* Step 2: Educação e Saúde */}
        {currentStep === 2 && (
          <div className="space-y-4">
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
                  placeholder="Ex: 5º Ano"
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

            <div className="border-t pt-4 mt-4">
              <h3 className="text-base font-semibold text-gray-900 mb-3">Informações de Saúde</h3>

              <div>
                <label
                  htmlFor="cartaoVacina"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Cartão de Vacina (Número)
                </label>
                <input
                  id="cartaoVacina"
                  {...register('cartaoVacina')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E31969] focus:border-[#E31969] text-base"
                />
              </div>

              <div className="mt-4">
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
                <div className="mt-4">
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
                    placeholder="Descreva detalhadamente o problema de saúde, medicações, alergias, etc."
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 3: Dados do Responsável */}
        {currentStep === 3 && (
          <div className="space-y-4">
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
                <p className="mt-1 text-sm text-red-600">
                  {errors.responsavel.nomeCompleto.message}
                </p>
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
                <label
                  htmlFor="responsavel.rg"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
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
                    {...register('responsavel.cpf')}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#E31969] focus:border-[#E31969] text-base ${errors.responsavel?.cpf ? 'border-red-500' : 'border-gray-300'
                      }`}
                  />
                </div>
                {errors.responsavel?.cpf && (
                  <p className="mt-1 text-sm text-red-600">{errors.responsavel.cpf.message}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="responsavel.nis"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  NIS
                </label>
                <input
                  id="responsavel.nis"
                  {...register('responsavel.nis')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E31969] focus:border-[#E31969] text-base"
                />
              </div>
            </div>

            <div className="border-t pt-4 mt-4">
              <label className="flex items-start cursor-pointer">
                <input
                  type="checkbox"
                  {...register('aceitouTermos')}
                  className="w-4 h-4 text-[#E31969] border-gray-300 rounded focus:ring-[#E31969] cursor-pointer mt-1"
                />
                <span className="ml-2 text-sm text-gray-700">
                  Declaro que as informações fornecidas são verdadeiras e autorizo o uso dos dados
                  para fins de cadastro na ONG Força Flor <span className="text-red-500">*</span>
                </span>
              </label>
              {errors.aceitouTermos && (
                <p className="mt-1 text-sm text-red-600">{errors.aceitouTermos.message}</p>
              )}
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-colors duration-200 font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Voltar
            </button>
          )}
          {currentStep < 3 ? (
            <button
              type="button"
              onClick={nextStep}
              className="flex-1 px-6 py-3 bg-[#E31969] text-white rounded-lg hover:bg-[#c41456] active:bg-[#a01145] transition-colors duration-200 font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#E31969] focus:ring-offset-2"
            >
              Próximo
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-[#E31969] text-white rounded-lg hover:bg-[#c41456] active:bg-[#a01145] transition-colors duration-200 font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#E31969] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Cadastrando...' : 'Cadastrar Estudante'}
            </button>
          )}
        </div>
      </form>
    </Modal>
  )
}

export default StudentModal
