"use server";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET!;

export async function verifyAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return { ok: false, error: "Usuário não autenticado." };
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return { ok: true, user: decoded };
  } catch {
    return { ok: false, error: "Token inválido." };
  }
}
