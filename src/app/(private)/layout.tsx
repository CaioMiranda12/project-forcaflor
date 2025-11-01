import { getCurrentUser } from "@/features/auth/lib/getCurrentUser";
import BaseLayoutClient from "@/shared/components/layout/BaseLayoutClient";
import { redirect } from "next/navigation";


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