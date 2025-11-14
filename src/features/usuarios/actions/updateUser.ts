"use server";

import { connectDatabase } from "@/lib/db";
import User from "@/app/models/User";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const SECRET_KEY = process.env.JWT_SECRET!;

interface UpdateUserPayload {
  name: string;
  email: string;
  isAdmin: boolean;
}

export async function updateUser(userId: string, data: UpdateUserPayload) {
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

    if (!decoded.isAdmin) {
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
