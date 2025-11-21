export interface Participants {
  id: string
  nomeCompleto: string
  dataNascimento: string
  idade: number
  sexo: "masculino" | "feminino"
  endereco: string
  bairro: string
  cidade: string
  estado: string
  cep: string
  telefone?: string
  celular: string
  documento: {
    rg?: string
    cpf?: string
    certidaoNascimento?: string
  }
  escola: string
  serie: string
  turno: string
  cartaoVacina?: string
  problemaSaude: boolean
  descricaoProblema?: string
  responsavel: {
    nomeCompleto: string
    email: string
    telefone: string
    endereco: string
    rg: string
    cpf: string
    nis?: string
  }
  aceitouTermos: boolean
  status: "active" | "inactive"
  createdAt: string
}
