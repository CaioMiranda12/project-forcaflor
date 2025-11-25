"use server";

import { connectDatabase } from "@/lib/db";
import { Post } from "../models/Post";
import { revalidatePath } from "next/cache";
import { verifyAuth } from "@/lib/auth";
import { uploadImage } from "@/lib/cloudinary";

interface UpdatePostData {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  categoryId: string;
  status: "published" | "draft" | "scheduled";
  image?: string | File;
  author: string;
  featured?: boolean;
  publishDate?: string | null;
}

export async function updatePost(data: UpdatePostData) {

  try {
    await connectDatabase();

    const auth = await verifyAuth();
    if (!auth.ok) return { success: false, message: auth.error };

    const user = auth.user;
    const isAdmin = user?.isAdmin === true;

    const existing = await Post.findById(data.id);
    if (!existing) {
      return { success: false, message: "Post não encontrado." };
    }

    // ✔ Se for file, sobe para cloudinary
    let imageUrl = typeof data.image === "string" ? data.image : existing.image;

    if (data.image instanceof File) {
      imageUrl = await uploadImage(data.image);
    }

    let status = existing.status;
    let publishDate = existing.publishDate;

    if (isAdmin) {
      // admin pode alterar status
      status = data.status;

      if (data.status === "published" && !existing.publishDate) {
        publishDate = new Date(); // define data automática da publicação
      } else if (data.status === "scheduled") {
        publishDate = data.publishDate ?? existing.publishDate;
      }
    }

    const updated = await Post.findByIdAndUpdate(
      data.id,
      {
        title: data.title,
        excerpt: data.excerpt,
        content: data.content,
        category: data.categoryId,
        status,
        image: imageUrl,
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
