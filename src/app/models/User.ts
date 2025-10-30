// models/User.ts
import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  nomeCompleto: string;
  dataNascimento: string;
  idade?: number;
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
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema = new Schema<IUser>({
  nomeCompleto: { type: String, required: true },
  dataNascimento: { type: String, required: true },
  idade: { type: Number },
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
  }
}, { timestamps: true });

const UserModel: Model<IUser> = (mongoose.models.User as Model<IUser>) || mongoose.model<IUser>("User", UserSchema);

export default UserModel;
