"use server";

import { connectDatabase } from "@/lib/db";
import { Post } from "../models/Post";

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
      status: data.status,
      author: data.author,
      publishDate,
      featured: data.featured ?? false
    });

    return {
      success: true,
      message: "Post criado com sucesso!",
      data: {
        id: newPost._id.toString(),
        title: newPost.title,
        status: newPost.status,
        featured: newPost.featured,
        publishDate: newPost.publishDate,
        createdAt: newPost.createdAt,
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
