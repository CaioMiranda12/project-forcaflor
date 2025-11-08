"use server";

import { connectDatabase } from "@/lib/db";
import { Post } from "../models/Post";

interface CreatePostData {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image?: string;
  status: "published" | "draft" | "scheduled";
  author: string;
  featured?: boolean;
}

export async function createPost(data: CreatePostData) {
  try {
    await connectDatabase();

    const publishDate = data.status === "published" ? new Date() : null;

    const newPost = await Post.create({
      title: data.title,
      excerpt: data.excerpt,
      content: data.content,
      category: data.category,
      image: data.image,
      status: data.status,
      author: data.author,
      featured: data.featured ?? false,
      publishDate,
    });

    return {
      success: true,
      message: "Post criado com sucesso!",
      data: {
        _id: newPost._id.toString(),
        title: newPost.title,
        status: newPost.status,
        featured: newPost.featured,
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
