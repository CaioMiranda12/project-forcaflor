"use server";

import Student from "@/app/models/Student";
import { connectDatabase } from "@/lib/db";


export async function getStudents() {
  try {
    await connectDatabase();

    const students = await Student.find().lean();

    // retorna já formatado para o front
    return students.map((s: any) => ({
      id: s._id.toString(),
      nomeCompleto: s.nomeCompleto,
      dataNascimento: s.dataNascimento,
      idade: s.idade,
      sexo: s.sexo,
      endereco: s.endereco,
      bairro: s.bairro,
      cidade: s.cidade,
      estado: s.estado,
      cep: s.cep,
      telefone: s.telefone,
      celular: s.celular,
      documento: {
        rg: s.documento?.rg || "",
        cpf: s.documento?.cpf || "",
        certidaoNascimento: s.documento?.certidaoNascimento || "",
      },
      escola: s.escola,
      serie: s.serie,
      turno: s.turno,
      cartaoVacina: s.cartaoVacina || "",
      problemaSaude: s.problemaSaude,
      descricaoProblema: s.descricaoProblema || "",
      responsavel: {
        nomeCompleto: s.responsavel?.nomeCompleto,
        email: s.responsavel?.email,
        telefone: s.responsavel?.telefone,
        endereco: s.responsavel?.endereco,
        rg: s.responsavel?.rg,
        cpf: s.responsavel?.cpf,
        nis: s.responsavel?.nis || "",
      },
      aceitouTermos: s.aceitouTermos,
    }));
  } catch (err) {
    console.error("Erro ao listar students:", err);
    return [];
  }
}
