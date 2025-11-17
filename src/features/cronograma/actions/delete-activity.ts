"use server";

import { connectDatabase } from "@/lib/db";
import { Activity } from "../models/Activity";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET!;

export async function deleteActivity(activityId: string) {
  try {
    await connectDatabase();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return { success: false, message: "Usuário não autenticado." };
    }

    let decoded: any;
    try {
      decoded = jwt.verify(token, SECRET_KEY);
    } catch {
      return { success: false, message: "Token inválido." };
    }

    // 🔒 Apenas admins podem deletar atividades
    if (!decoded.isAdmin) {
      return { success: false, message: "Apenas administradores podem deletar atividades." };
    }

    // Verifica se a atividade existe
    const activity = await Activity.findById(activityId);

    if (!activity) {
      return { success: false, message: "Atividade não encontrada." };
    }

    // Deleta
    await Activity.findByIdAndDelete(activityId);

    return {
      success: true,
      message: `Atividade "${activity.title}" foi deletada com sucesso.`,
    };

  } catch (err) {
    console.error("Erro ao deletar atividade:", err);
    return { success: false, message: "Erro ao deletar atividade." };
  }
}
