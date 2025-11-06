"use server";

import { connectDatabase } from "@/lib/db";
import { Category } from "../models/Category";

export async function getCategories() {
  try {
    await connectDatabase();

    const categories = await Category.find().sort({ label: 1 }).lean();

    return {
      success: true,
      data: categories.map((cat) => ({
        id: cat._id.toString(),
        label: cat.label,
        slug: cat.slug,
        color: cat.color,
      })),
    };
  } catch (error) {
    console.error("❌ Erro ao buscar categorias:", error);
    return { success: false, message: "Erro ao buscar categorias." };
  }
}
