'use server'

import { connectDatabase } from "@/lib/db"

import User from "@/app/models/User"

export async function getUsers() {
  await connectDatabase()

  try {
    const users = await User.find()

    return users.map(u => ({
      id: u._id.toString(),
      name: u.name,
      email: u.email,
      isAdmin: u.isAdmin,
    }))
  } catch (error) {
    console.error(error)
    return []
  }
}
