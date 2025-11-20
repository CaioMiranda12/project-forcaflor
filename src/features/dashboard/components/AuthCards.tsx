'use client';

import { LogIn, UserPlus } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/features/auth/context/AuthContext';

export default function AuthCards() {
  const { user } = useAuth();

  if (user) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Card Login */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
        <div className="text-center">
          <div className="p-4 bg-[#E31969] rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <LogIn className="w-8 h-8 text-white" aria-hidden="true" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Fazer Login
          </h3>
          <p className="text-gray-600 mb-4">
            Acesse sua conta para gerenciar atividades e conteúdo (Voluntários e Administradores)
          </p>
          <Link
            href="/login"
            className="w-full px-6 py-3 bg-[#E31969] text-white rounded-lg hover:bg-[#c41456] transition-colors duration-200 font-medium"
          >
            Entrar
          </Link>
        </div>
      </div>

      {/* Card Cadastro */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
        <div className="text-center">
          <div className="p-4 bg-[#61CE70] rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <UserPlus className="w-8 h-8 text-white" aria-hidden="true" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Fazer ficha de inscrição
          </h3>
          <p className="text-gray-600 mb-4">
            Preencha sua ficha de inscrição para participar das atividades da comunidade
          </p>
          <Link
            href="/cadastro"
            className="w-full px-6 py-3 bg-[#61CE70] text-white rounded-lg hover:bg-[#4fb85f] transition-colors duration-200 font-medium"
          >
            Cadastrar
          </Link>
        </div>
      </div>
    </div>
  );
}
