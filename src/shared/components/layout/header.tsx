import { AuthUser } from "@/features/auth/types/AuthUser";
import { Menu } from "lucide-react";

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  user: AuthUser | null;
}

export function Header({ setSidebarOpen, sidebarOpen, user }: HeaderProps) {

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
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
            <span className="text-sm font-medium text-white">{user?.name ? user?.name.charAt(0).toLocaleUpperCase() : 'U'}</span>
          </div>
        </div>
      </div>
    </header>
  )
}