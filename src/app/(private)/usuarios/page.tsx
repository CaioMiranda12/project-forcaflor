import UsuariosClient from '@/features/usuarios/components/UsuariosClient'
import { getUsers } from '@/features/usuarios/actions/getUsers'

export default async function Usuarios() {
  const users = await getUsers()
  console.log(users)

  return (
    <UsuariosClient />
  )
}
