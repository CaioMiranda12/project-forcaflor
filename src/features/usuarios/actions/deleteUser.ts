"use server";

import { connectDatabase } from "@/lib/db";
import User from "@/app/models/User";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { verifyAuth } from "@/lib/auth";

const SECRET_KEY = process.env.JWT_SECRET!;

export async function deleteUser(userId: string) {
  try {
    await connectDatabase();

    const auth = await verifyAuth();
    if (!auth.ok || !auth.user) {
      return { success: false, message: "Usuário não autenticado." };
    }

    if (!auth.user.isAdmin) {
      return { success: false, message: "Acesso negado. Apenas admins podem deletar usuários." };
    }

    // 🔒 Evita que o admin delete a si mesmo (opcional)
    if (auth.user.userId === userId) {
      return {
        success: false,
        message: "Você não pode excluir a si mesmo enquanto logado."
      };
    }

    // Verifica se o usuário existe
    const user = await User.findById(userId);

    if (!user) {
      return { success: false, message: "Usuário não encontrado." };
    }

    await User.findByIdAndDelete(userId);

    return {
      success: true,
      message: `Usuário "${user.name}" foi deletado com sucesso.`,
    };

  } catch (err) {
    console.error("Erro ao deletar usuário:", err);
    return { success: false, message: "Erro ao deletar usuário." };
  }
}
