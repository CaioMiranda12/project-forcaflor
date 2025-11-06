"use server";

import { connectDatabase } from "@/lib/db";
import { Category } from "../models/Category";

export async function deleteCategory(id: string) {
  try {
    await connectDatabase();

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
