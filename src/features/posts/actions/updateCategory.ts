"use server";

import { connectDatabase } from "@/lib/db";
import { Category } from "../models/Category";
import { CategoryType } from "../types/category";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET!;

export async function updateCategory(
  id: string,
  data: { label?: string; color?: string }
) {
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

    const category = (await Category.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true, runValidators: true }
    ).lean()) as CategoryType | null;

    if (!category) {
      return { success: false, message: "Categoria não encontrada." };
    }

    return {
      success: true,
      message: "Categoria atualizada com sucesso!",
      data: {
        _id: category._id.toString(),
        label: category.label,
        color: category.color,
      },
    };
  } catch (error) {
    console.error("❌ Erro ao atualizar categoria:", error);
    return { success: false, message: "Erro ao atualizar categoria." };
  }
}
