"use server";

import { connectDatabase } from "@/lib/db";
import { Post } from "../models/Post";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

interface UpdatePostData {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  categoryId: string;
  status: "published" | "draft" | "scheduled";
  image?: string;
  author: string;
  featured?: boolean;
  publishDate?: string | null;
}

const SECRET_KEY = process.env.JWT_SECRET!;

export async function updatePost(data: UpdatePostData) {

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

    const now = new Date();

    const existing = await Post.findById(data.id);
    if (!existing) {
      return { success: false, message: "Post não encontrado." };
    }

    const publishDate =
      data.status === "published" && !existing.publishDate
        ? now
        : data.publishDate ?? existing.publishDate;

    const updated = await Post.findByIdAndUpdate(
      data.id,
      {
        title: data.title,
        excerpt: data.excerpt,
        content: data.content,
        category: data.categoryId,
        status: data.status,
        image: data.image,
        author: data.author,
        publishDate,
        featured: data.featured ?? false,
        updatedAt: new Date(),
      },
      { new: true }
    ).populate('category', 'label color');

    if (!updated) {
      return { success: false, message: "Post não encontrado." };
    }

    revalidatePath("/posts");

    return {
      success: true,
      message: "Post atualizado com sucesso!",
      data: {
        id: updated._id.toString(),
        title: updated.title,
        category: updated.category ? {
          id: updated.category._id.toString(),
          label: updated.category.label,
          color: updated.category.color
        } : null
      },
    };
  } catch (error) {
    console.error("❌ Erro ao atualizar post:", error);
    return { success: false, message: "Erro ao atualizar post." };
  }
}
