"use server";

import { connectDatabase } from "@/lib/db";
import { Category } from "../models/Category";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const SECRET_KEY = process.env.JWT_SECRET!;


export async function deleteCategory(id: string) {
  try {
    await connectDatabase();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return { success: false, message: "Usuário não autenticado." };
    }

    try {
          jwt.verify(token, SECRET_KEY);
    } catch {
          return { success: false, message: "Token inválido." };
      }

    const deleted = await Category.findByIdAndDelete(id).lean();

    if (!deleted) {
      return { success: false, message: "Categoria não encontrada." };
    }

    return { success: true, message: "Categoria excluída com sucesso!" };
  } catch (error) {
    console.error("❌ Erro ao excluir categoria:", error);
    return { success: false, message: "Erro ao excluir categoria." };
  }
}
