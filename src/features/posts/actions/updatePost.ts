"use server";

import { connectDatabase } from "@/lib/db";
import { Post } from "../models/Post";

interface UpdatePostData {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  status: "published" | "draft" | "scheduled";
  image?: string;
  author: string;
  featured?: boolean;
}

export async function updatePost(data: UpdatePostData) {
  try {
    await connectDatabase();

    const updated = await Post.findByIdAndUpdate(
      data._id,
      {
        title: data.title,
        excerpt: data.excerpt,
        content: data.content,
        category: data.category,
        status: data.status,
        image: data.image,
        author: data.author,
        featured: data.featured || false,
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (!updated) {
      return { success: false, message: "Post não encontrado." };
    }

    return {
      success: true,
      message: "Post atualizado com sucesso!",
      data: {
        _id: updated._id.toString(),
        title: updated.title,
      },
    };
  } catch (error) {
    console.error("❌ Erro ao atualizar post:", error);
    return { success: false, message: "Erro ao atualizar post." };
  }
}
