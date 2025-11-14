'use client'

import Link from 'next/link'
import React, { useState } from 'react'

import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { LoginFormData, useLoginForm } from '@/features/auth/components/login-form'
import { loginUser } from '@/features/auth/actions/loginUser'

export default function Login() {
  const [isLoading, setIsLoading] = useState(false)
  const form = useLoginForm();
  const router = useRouter();

  async function onSubmit(data: LoginFormData) {
    try {
      setIsLoading(true)
      const formData = new FormData()
      formData.append('email', data.email)
      formData.append('password', data.password)

      const result = await loginUser(formData)
      if (!result.success) {
        toast.error(result.message)
        return
      }

      toast.success('Login bem-sucedido!')
      router.push('/')
      router.refresh()

    } catch (err) {
      toast.error('Usuario não encontrado')
    }
    finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-primary-50 to-secondary-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto h-16 w-16 bg-linear-to-r from-primary to-secondary rounded-full flex items-center justify-center mb-4">
              <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Entrar
            </h1>
            <p className="text-base text-gray-600">
              Acesse sua conta na Força Flor
            </p>
          </div>

          {/* Formulário */}
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="nomeCompleto" className="block text-base font-medium text-gray-700 mb-2">
                E-mail *
              </label>
              <input
                type="text"
                {...form.register('email')}
                className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                placeholder="Digite seu e-mail"
                style={form.formState.errors.email && { border: '2px solid red' }}
              />
              {form.formState.errors.email && (
                <p className="text-red-600 text-sm mt-1">{form.formState.errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="dataNascimento" className="block text-base font-medium text-gray-700 mb-2">
                Senha *
              </label>
              <input
                type="password"
                {...form.register('password')}
                placeholder='Digite a senha'
                className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                style={form.formState.errors.password && { border: '2px solid red' }}
              />
              {form.formState.errors.password && (
                <p className="text-red-600 text-sm mt-1">{form.formState.errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-6 py-4 text-base font-medium text-white bg-linear-to-r from-primary to-primary-400 border border-transparent rounded-lg hover:from-primary-dark hover:to-primary-darker active:from-primary-darker active:to-primary-darker focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Entrando...
                </span>
              ) : (
                'Entrar'
              )}
            </button>
          </form>

          {/* Links adicionais */}
          <div className="mt-8 text-center space-y-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Ainda não tem conta?</span>
              </div>
            </div>

            <Link
              href="/cadastro"
              className="block w-full px-6 py-3 text-base font-medium text-primary bg-white border-2 border-primary rounded-lg hover:bg-primary-50 active:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200 cursor-pointer transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Fazer Cadastro na Escolinha
            </Link>

            <Link
              href="/"
              className="block text-base text-gray-600 hover:text-primary transition-colors duration-200 cursor-pointer"
            >
              ← Voltar para o início
            </Link>
          </div>
        </div>

        {/* Informação adicional */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Precisa de ajuda? Entre em contato com a OSC Força Flor
          </p>
        </div>
      </div>
    </div>
  )
}

