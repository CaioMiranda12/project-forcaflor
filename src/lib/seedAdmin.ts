"use server"

import User from "@/app/models/User";
import bcrypt from "bcryptjs";

export async function seedAdmin() {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    console.warn("ADMIN_EMAIL e ADMIN_PASSWORD não definidos.");
    return;
  }

  const existing = await User.findOne({ email: adminEmail });

  if (existing) {
    console.log("Admin já existe.");
    return;
  }

  const hashed = await bcrypt.hash(adminPassword, 10);

  await User.create({
    name: "Administrador",
    email: adminEmail,
    password: hashed,
    isAdmin: true,
  });

  console.log("Admin criado automaticamente!");
}
