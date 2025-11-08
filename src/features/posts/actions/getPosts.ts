"use server";

import { connectDatabase } from "@/lib/db";
import { Post } from "../models/Post";

export async function getPosts() {
  try {
    await connectDatabase();

    // Busca posts e popula a categoria (pra já trazer o nome/cor)
    const posts = await Post.find()
      .populate("category", "label color")
      .sort({ createdAt: -1 })

    // Retorna o array já convertido
    const formattedPosts = posts.map((post) => ({
      _id: post._id.toString(),
      title: post.title,
      author: post.author,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category
        ? {
          _id: post.category._id.toString(),
          label: post.category.label,
          color: post.category.color,
        }
        : null,
      image: post.image || "",
      status: post.status,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    }));

    return { success: true, data: formattedPosts };
  } catch (error) {
    console.error("❌ Erro ao buscar posts:", error);
    return { success: false, message: "Erro ao buscar posts." };
  }
}
