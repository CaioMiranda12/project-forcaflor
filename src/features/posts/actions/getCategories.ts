"use server";

import { connectDatabase } from "@/lib/db";
import { Category } from "../models/Category";
import { CategoryType } from "../types/category";

export async function getCategories() {
  try {
    await connectDatabase();

    const categories = await Category.find().sort({ label: 1 }).lean<CategoryType[]>();

    return {
      success: true,
      data: categories.map((cat) => ({
        _id: cat._id.toString(),
        label: cat.label,
        color: cat.color,
      })),
    };
  } catch (error) {
    console.error("❌ Erro ao buscar categorias:", error);
    return { success: false, message: "Erro ao buscar categorias." };
  }
}
