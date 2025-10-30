'use client'

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Calendar, FileText, Home, LogOut, Menu, Newspaper, User, Users, X } from "lucide-react";


export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname();


  const menuItems = [
    { path: '/', label: 'Início', icon: Home },
    { path: '/perfil', label: 'Perfil', icon: User },
    { path: '/noticias', label: 'Notícias', icon: Newspaper },
    { path: '/cronograma', label: 'Cronograma', icon: Calendar },
    { path: '/usuarios', label: 'Usuários', icon: Users },
    { path: '/posts', label: 'Posts', icon: FileText },
  ]

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }


  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:bg-white lg:border-r lg:border-gray-200">
        <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-[#E31969]">Portal Força Flor</h1>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2" role="navigation" aria-label="Menu principal">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.path

            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center px-4 py-3 text-base font-medium rounded-lg transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#E31969] focus:ring-offset-2 ${isActive
                  ? 'bg-[#E31969] text-white shadow-lg'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-[#E31969]'
                  }`}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon className="w-5 h-5 mr-3" aria-hidden="true" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button
            className="flex items-center w-full px-4 py-3 text-base font-medium text-gray-700 rounded-lg hover:bg-gray-100 hover:text-red-600 transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            aria-label="Sair do sistema"
          >
            <LogOut className="w-5 h-5 mr-3" aria-hidden="true" />
            Sair
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}

      {/* Mobile Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:hidden ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <h1 className="text-lg font-bold text-[#E31969]">Portal Força Flor</h1>
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#E31969] cursor-pointer"
            aria-label="Fechar menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2" role="navigation" aria-label="Menu principal mobile">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.path

            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={toggleSidebar}
                className={`flex items-center px-4 py-3 text-base font-medium rounded-lg transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#E31969] focus:ring-offset-2 ${isActive
                  ? 'bg-[#E31969] text-white shadow-lg'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-[#E31969]'
                  }`}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon className="w-5 h-5 mr-3" aria-hidden="true" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button
            className="flex items-center w-full px-4 py-3 text-base font-medium text-gray-700 rounded-lg hover:bg-gray-100 hover:text-red-600 transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            aria-label="Sair do sistema"
          >
            <LogOut className="w-5 h-5 mr-3" aria-hidden="true" />
            Sair
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 shadow-sm">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6">
            <div className="flex items-center">
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 lg:hidden focus:outline-none focus:ring-2 focus:ring-[#E31969] cursor-pointer"
                aria-label="Abrir menu"
              >
                <Menu className="w-6 h-6" />
              </button>
              <h2 className="ml-2 text-xl font-semibold text-gray-900 lg:ml-0">
                Dashboard
              </h2>
            </div>

            <div className="flex items-center space-x-4">
              {/* Logo da Força Flor */}
              <div className="flex items-center">
                <img
                  src="https://lumi.new/lumi.ing/logo.png"
                  alt="Logo Força Flor"
                  className="w-8 h-8 rounded-full"
                />
                <span className="ml-2 text-sm font-medium text-[#E31969] hidden sm:inline">
                  Força Flor
                </span>
              </div>
              <div className="w-8 h-8 bg-[#61CE70] rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-white">U</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}