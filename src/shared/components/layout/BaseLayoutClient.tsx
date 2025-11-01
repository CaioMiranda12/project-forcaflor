'use client'

import { useState } from "react";
import { Sidebar } from "./sidebar";
import { Header } from "./header";
import type { AuthUser } from "@/features/auth/types/AuthUser";
import { AuthProvider } from "@/features/auth/context/AuthContext";

export default function BaseLayoutClient({
  user,
  children,
}: {
  user: AuthUser | null;
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AuthProvider user={user}>
      <div className="flex h-screen bg-gray-50">
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          user={user}
        />

        <div className="flex flex-col flex-1 overflow-hidden">
          <Header
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            user={user}
          />
          <main className="flex-1 overflow-y-auto p-4 sm:p-6">
            {children}
          </main>
        </div>
      </div>
    </AuthProvider>
  );
}
