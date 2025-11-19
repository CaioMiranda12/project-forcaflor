"use server";

import { connectDatabase } from "@/lib/db";
import { Category } from "../models/Category";
import { revalidatePath } from "next/cache";
import { CategoryFormData } from "../forms/category-form";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET!;

export async function createCategory(data: CategoryFormData) {
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

    const exists = await Category.findOne({ label: data.label });

    if (exists) {
      return { success: false, message: "Categoria já existe" };
    }

    const category = await Category.create({
      label: data.label,
      color: data.color
    });

    revalidatePath("/posts"); // ou a página onde atualiza categorias

    return {
      success: true,
      category: JSON.parse(JSON.stringify(category))
    };
  } catch (err: any) {
    // Tratamento específico pra erro de duplicidade
    if (err.code === 11000) {
      return {
        success: false,
        message: "Essa categoria já existe!",
      };
    }

    return {
      success: false,
      message: "Erro inesperado ao criar categoria.",
    };
  }

}
