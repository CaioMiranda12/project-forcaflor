"use server";

import { connectDatabase } from "@/lib/db";
import { Category } from "../models/Category";
import { verifyAuth } from "@/lib/auth";

export async function deleteCategory(id: string) {
  try {
    await connectDatabase();

    const auth = await verifyAuth();
    if (!auth.ok) return { success: false, message: auth.error };

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
