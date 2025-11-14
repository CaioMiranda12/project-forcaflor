import UsuariosClient from '@/features/usuarios/components/UsuariosClient'
import { getUsers } from '@/features/usuarios/actions/getUsers'
import { AuthUser } from '@/features/auth/types/AuthUser'

export default async function Usuarios() {
  const users = await getUsers()

  return (
    <UsuariosClient users={users} />
  )
}
