"use server";

import Participant from "@/app/models/Participant";
import { verifyAuth } from "@/lib/auth";
import { connectDatabase } from "@/lib/db";
import { EditParticipantFormData } from "../components/editParticipantModal";

export async function updateParticipant(id: string, formData: EditParticipantFormData) {
  try {
    await connectDatabase();

    const data = { ...formData }; // 👈 AGORA FUNCIONA

    const auth = await verifyAuth();
    if (!auth.ok) return { success: false, message: auth.error };

    const user = auth.user;
    const isAdmin = user?.isAdmin === true;

    if (!isAdmin) {
      return { success: false, message: "Acesso negado." };
    }

    // Recalcular idade se necessário
    if (data.dataNascimento) {
      const nascimento = new Date(data.dataNascimento);
      const hoje = new Date();
      data.idade =
        hoje.getFullYear() -
        nascimento.getFullYear() -
        (hoje <
          new Date(hoje.getFullYear(), nascimento.getMonth(), nascimento.getDate())
          ? 1
          : 0);
    }

    const updated = await Participant.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return { success: false, message: "Participante não encontrado." };
    }

    return {
      success: true,
      message: "Participante atualizado com sucesso!",
      participant: JSON.parse(JSON.stringify({
        id: String(updated._id),
        nomeCompleto: updated.nomeCompleto,
        dataNascimento: updated.dataNascimento,
        sexo: updated.sexo,
        endereco: updated.endereco,
        bairro: updated.bairro,
        cidade: updated.cidade,
        estado: updated.estado,
        cep: updated.cep,
        telefone: updated.telefone,
        celular: updated.celular,
        documento: {
          rg: updated.documento?.rg || "",
          cpf: updated.documento?.cpf || "",
          certidaoNascimento: updated.documento?.certidaoNascimento || "",
        },
        escola: updated.escola,
        serie: updated.serie,
        turno: updated.turno,
        cartaoVacina: updated.cartaoVacina || "",
        problemaSaude: updated.problemaSaude,
        descricaoProblema: updated.descricaoProblema || "",
        responsavel: {
          nomeCompleto: updated.responsavel?.nomeCompleto,
          email: updated.responsavel?.email,
          telefone: updated.responsavel?.telefone,
          endereco: updated.responsavel?.endereco,
          rg: updated.responsavel?.rg,
          cpf: updated.responsavel?.cpf,
          nis: updated.responsavel?.nis || "",
        },
        createdAt: updated.createdAt?.toISOString(),
        updatedAt: updated.updatedAt?.toISOString(),
        isActive: updated.isActive,
      })),
    };
  } catch (err) {
    console.error("Erro ao atualizar participante:", err);
    return { success: false, message: "Erro ao atualizar o participante." };
  }
}
