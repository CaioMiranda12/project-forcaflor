"use server";

import { connectDatabase } from "@/lib/db";
import { Post } from "../models/Post";
import { revalidatePath } from "next/cache";
import { verifyAuth } from "@/lib/auth";

interface CreatePostData {
  title: string;
  excerpt: string;
  content: string;
  categoryId: string;
  image?: string;
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
      image: data.image,
      status: "draft",
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
        featured: populatedPost.featured,
        author: populatedPost.author,
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
    return {
      success: false,
      message: "Erro ao criar post.",
    };
  }
}
