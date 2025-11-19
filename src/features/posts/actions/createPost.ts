"use server";

import { connectDatabase } from "@/lib/db";
import { Post } from "../models/Post";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

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

const SECRET_KEY = process.env.JWT_SECRET!;

export async function createPost(data: CreatePostData) {
  try {
    await connectDatabase();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return { success: false, message: "Usuário não autenticado." };
    }

    let payload: any;
    try {
      payload = jwt.verify(token, SECRET_KEY);
    } catch {
      return { success: false, message: "Token inválido." };
    }

    // O autor do post deve ser o usuário logado
    // const authorId = payload.userId || payload._id;

    // if (!authorId) {
    //   return { success: false, message: "Autor inválido no token." };
    // }

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
