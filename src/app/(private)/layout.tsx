import { getCurrentUser } from "@/features/auth/lib/getCurrentUser";
import BaseLayoutClient from "@/shared/components/layout/BaseLayoutClient";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: {
    default: "Painel do Voluntário | Força Flor",
    template: "%s | Força Flor",
  },
};

export default async function PrivateLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/')
  }

  return (
    <BaseLayoutClient
      user={user}>
      {children}
    </BaseLayoutClient>
  )
}