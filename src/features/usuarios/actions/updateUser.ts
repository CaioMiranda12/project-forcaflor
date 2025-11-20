"use server";

import { connectDatabase } from "@/lib/db";
import User from "@/app/models/User";
import { verifyAuth } from "@/lib/auth";

interface UpdateUserPayload {
  name: string;
  email: string;
  isAdmin: boolean;
}

export async function updateUser(userId: string, data: UpdateUserPayload) {
  try {
    await connectDatabase();

    const auth = await verifyAuth();
    if (!auth.ok || !auth.user) {
      return { success: false, message: "Usuário não autenticado." };
    }

    if (!auth.user.isAdmin) {
      return { success: false, message: "Acesso negado. Apenas admins podem editar usuários." };
    }

    if (!data.name || !data.email) {
      return { success: false, message: "Nome e email são obrigatórios." };
    }

    const user = await User.findById(userId);

    if (!user) {
      return { success: false, message: "Usuário não encontrado." };
    }

    user.name = data.name;
    user.email = data.email;
    user.isAdmin = data.isAdmin;

    await user.save();

    return {
      success: true,
      message: "Usuário atualizado com sucesso.",
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    };

  } catch (err) {
    console.error("Erro ao atualizar usuário:", err);
    return { success: false, message: "Erro ao atualizar usuário." };
  }
}
