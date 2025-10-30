'use client'

import { useEffect, useState } from "react";

import { Sidebar } from "../_components/sidebar";
import { Header } from "../_components/header";
import { getCurrentUser } from "../lib/getCurrentUser";
import { AuthUser } from "@/types/authuser.type";


export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    getCurrentUser().then(setUser);
  }, []);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} user={user} />

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {children}
        </main>
      </div>

    </div>
  )
}