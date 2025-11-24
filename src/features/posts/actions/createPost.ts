"use server";

import { connectDatabase } from "@/lib/db";
import { Post } from "../models/Post";
import { revalidatePath } from "next/cache";
import { verifyAuth } from "@/lib/auth";
import { uploadImage } from "@/lib/cloudinary";

interface CreatePostData {
  title: string;
  excerpt: string;
  content: string;
  categoryId: string;
  image?: string | File;
  status: "published" | "draft" | "scheduled";
  author: string;
  featured?: boolean;
  publishDate?: string | null;
}

export async function createPost(data: CreatePostData) {
  try {
    await connectDatabase();

    const auth = await verifyAuth();
    if (!auth.ok) return { success: false, message: auth.error };

    // ✔ Se a imagem for File → faz upload
    let imageUrl = typeof data.image === "string" ? data.image : undefined;

    if (data.image instanceof File) {
      imageUrl = await uploadImage(data.image);
    }

    const now = new Date();

    const publishDate =
      data.status === "published"
        ? now
        : data.status === "scheduled"
          ? data.publishDate ?? null
          : null;

    const newPost = await Post.create({
      title: data.title,
      excerpt: data.excerpt,
      content: data.content,
      category: data.categoryId,
      image: imageUrl,
      status: data.status,
      author: data.author,
      publishDate,
      featured: data.featured ?? false
    });

    const populatedPost = await newPost.populate("category", "label color");

    revalidatePath("/posts");

    return {
      success: true,
      message: "Post criado com sucesso!",
      data: {
        id: populatedPost._id.toString(),
        title: populatedPost.title,
        excerpt: populatedPost.excerpt,
        content: populatedPost.content,
        status: populatedPost.status,
        author: populatedPost.author,
        featured: populatedPost.featured,
        publishDate: populatedPost.publishDate,
        createdAt: populatedPost.createdAt,
        updatedAt: populatedPost.updatedAt,
        image: populatedPost.image,
        category: populatedPost.category
          ? {
              id: populatedPost.category._id.toString(),
              label: populatedPost.category.label,
              color: populatedPost.category.color,
            }
          : null,
      },
    };
  } catch (error) {
    console.error("❌ Erro ao criar post:", error);
    return { success: false, message: "Erro ao criar post." };
  }
}
