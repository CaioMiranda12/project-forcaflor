import mongoose, { Schema, Document, Model } from "mongoose";

export interface IParticipant extends Document {
  nomeCompleto: string;
  dataNascimento: string;
  sexo?: "masculino" | "feminino";
  endereco?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
  cep?: string;
  telefone?: string;
  celular?: string;
  documento?: {
    rg?: string;
    cpf?: string;
    certidaoNascimento?: string;
  };
  escola?: string;
  serie?: string;
  turno?: string;
  cartaoVacina?: string;
  problemaSaude?: boolean;
  descricaoProblema?: string;
  responsavel?: {
    nomeCompleto?: string;
    email?: string;
    telefone?: string;
    endereco?: string;
    rg?: string;
    cpf?: string;
    nis?: string;
  };
  isActive: Boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const ParticipantSchema = new Schema<IParticipant>({
  nomeCompleto: { type: String, required: true },
  dataNascimento: { type: String, required: true },
  isActive: {
    type: Boolean,
    default: true,
    required: true
  },
  sexo: { type: String, enum: ["masculino", "feminino"] },
  endereco: String,
  bairro: String,
  cidade: String,
  estado: String,
  cep: String,
  telefone: String,
  celular: String,
  documento: {
    rg: String,
    cpf: String,
    certidaoNascimento: String
  },
  escola: String,
  serie: String,
  turno: String,
  cartaoVacina: String,
  problemaSaude: Boolean,
  descricaoProblema: String,
  responsavel: {
    nomeCompleto: String,
    email: String,
    telefone: String,
    endereco: String,
    rg: String,
    cpf: String,
    nis: String
  },
}, { timestamps: true });

const ParticipantModel: Model<IParticipant> = (mongoose.models.Participant as Model<IParticipant>) || mongoose.model<IParticipant>("Participant", ParticipantSchema);

export default ParticipantModel;