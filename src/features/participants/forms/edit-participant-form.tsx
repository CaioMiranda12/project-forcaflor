import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const editParticipantSchema = z.object({
  nomeCompleto: z.string().min(3, "Informe o nome completo"),
  dataNascimento: z.string().regex(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d\d$/, "Formato inválido"),
  idade: z.number().min(0),
  sexo: z.enum(["masculino", "feminino"]),
  endereco: z.string().min(1, "Informe o endereço completo"),
  bairro: z.string().min(1, "Informe o bairro"),
  cidade: z.string().min(1, "Informe a cidade"),
  estado: z.string().min(1, "Informe o estado"),
  cep: z.string().min(8, "CEP inválido"),
  telefone: z.string().optional(),
  celular: z.string().min(8, "Celular inválido"),

  documento: z.object({
    rg: z.string().optional(),
    cpf: z.string().optional(),
    certidaoNascimento: z.string().optional(),
  }).refine(data => data.rg || data.cpf || data.certidaoNascimento, {
    message: "Informe pelo menos um documento (RG, CPF ou Certidão)",
  }),

  escola: z.string().min(1, "Informe a escola"),
  serie: z.string().min(1, "Informe o ano/série"),
  turno: z.string().min(1, "Informe o turno"),
  cartaoVacina: z.string().optional(),

  problemaSaude: z.boolean(),
  descricaoProblema: z.string().optional(),

  responsavel: z.object({
    nomeCompleto: z.string().min(3, "Informe o nome completo"),
    email: z.string().email("Email inválido"),
    telefone: z.string().min(8, "Telefone inválido"),
    endereco: z.string().min(1, "Informe o endereço completo"),
    rg: z.string().min(1, "Informe o RG"),
    cpf: z.string().min(11, "Informe o CPF"),
    nis: z.string().optional(),
  }),

  isActive: z.boolean(),
});

export type EditParticipantFormData = z.infer<typeof editParticipantSchema>;

export function useEditParticipantForm(defaultValues?: Partial<EditParticipantFormData>) {
  return useForm<EditParticipantFormData>({
    resolver: zodResolver(editParticipantSchema),
    defaultValues: {
      nomeCompleto: "",
      dataNascimento: "",
      idade: 0,
      sexo: "masculino",
      endereco: "",
      bairro: "",
      cidade: "",
      estado: "",
      cep: "",
      telefone: "",
      celular: "",
      documento: {
        rg: "",
        cpf: "",
        certidaoNascimento: "",
      },
      escola: "",
      serie: "",
      turno: "",
      cartaoVacina: "",
      problemaSaude: false,
      descricaoProblema: "",
      responsavel: {
        nomeCompleto: "",
        email: "",
        telefone: "",
        endereco: "",
        rg: "",
        cpf: "",
        nis: "",
      },
      isActive: true,
      ...defaultValues,
    }
  });
}

