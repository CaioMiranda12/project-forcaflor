"use server";

import { connectDatabase } from "@/lib/db";
import { Post } from "../models/Post";
import { verifyAuth } from "@/lib/auth";

export async function deletePost(postId: string) {
  try {
    await connectDatabase();

    const auth = await verifyAuth();
    if (!auth.ok) return { success: false, message: auth.error };

    const deletedPost = await Post.findByIdAndDelete(postId);

    if (!deletedPost) {
      return {
        success: false,
        message: "Post não encontrado.",
      };
    }

    return {
      success: true,
      message: "Post deletado com sucesso!",
    };
  } catch (error) {
    console.error("❌ Erro ao deletar post:", error);
    return {
      success: false,
      message: "Erro ao deletar post.",
    };
  }
}
