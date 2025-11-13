'use server'

import User from '@/app/models/User'
import { connectDatabase } from '@/lib/db'

import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

const SECRET_KEY = process.env.JWT_SECRET!

export async function loginUserAction(formData: FormData) {
  const name = formData.get('name') as string
  const password = formData.get('password') as string

  await connectDatabase()

  const user = await User.findOne({ name, password })

  if (!user) {
    throw new Error('Usuário não encontrado')
  }

  const token = jwt.sign(
    { userId: user._id, nome: user.name },
    SECRET_KEY,
    { expiresIn: '1d' }
  )

  const cookieStore = await cookies()

  cookieStore.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 // 1 dia
  })

  return { success: true, message: 'Login realizado com sucesso' }
}
