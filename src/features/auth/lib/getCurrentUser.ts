"use server";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { AuthUser } from "../types/AuthUser";

export async function getCurrentUser() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as AuthUser;
    return decoded;
  } catch {
    return null;
  }
}
