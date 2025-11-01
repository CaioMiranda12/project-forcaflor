import { createContext, useContext } from "react";
import { AuthUser } from "../types/AuthUser";

const AuthContext = createContext<{ user: AuthUser | null }>({ user: null });

export function AuthProvider({
  user,
  children
}: {
  user: AuthUser | null;
  children: React.ReactNode;
}) {
  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext);
}