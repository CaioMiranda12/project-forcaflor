"use server";

import { connectDatabase } from "@/lib/db";
import { Category } from "../models/Category";
import { CategoryType } from "../types/category";

export async function updateCategory(
  id: string,
  data: { label?: string; color?: string }
) {
  try {
    await connectDatabase();

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
