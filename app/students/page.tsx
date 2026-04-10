import { auth0 } from '@/app/lib/auth0.js'
import { redirect } from 'next/navigation'
import StudentsClient from './StudentsClient'
import { useUser } from '@auth0/nextjs-auth0'


export default async function StudentsPage() {
  const session = await auth0.getSession()
  const user = session?.user;  
  //const { user, isLoading } = useUser()
  
  //Como es un componente de servidor, no puedo usar hooks como useUser, 
  //por eso uso auth0.getSession() para obtener la sesión del usuario.

  if (!session) redirect('/auth/login')
  return <StudentsClient />
}
