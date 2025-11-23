"use server";

import { connectDatabase } from "@/lib/db";
import Participant from "@/app/models/Participant";
import { verifyAuth } from "@/lib/auth";

export async function deleteParticipant(id: string) {
  try {
    await connectDatabase();

    const auth = await verifyAuth();
    if (!auth.ok) return { success: false, message: auth.error };

    const user = auth.user;
    const isAdmin = user?.isAdmin === true;

    if (!isAdmin) {
      return { success: false, message: "Acesso negado. Apenas administradores podem excluir participantes." };
    }

    const deleted = await Participant.findByIdAndDelete(id);

    if (!deleted) {
      return {
        success: false,
        message: "Participante não encontrado.",
      };
    }

    return {
      success: true,
      message: "Participante deletado com sucesso!",
    };

  } catch (error) {
    console.error("❌ Erro ao deletar participante:", error);
    return {
      success: false,
      message: "Erro ao deletar participante.",
    };
  }
}
