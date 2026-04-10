import { auth0 } from '@/app/lib/auth0.js'
import LoginButton from "@/components/LoginButton";
import LogoutButton from "@/components/LogoutButton";
import Profile from "@/components/Profile";
import { redirect } from "next/navigation";
import ChatClient from './ChatClient';


export default async function Home() {
  const session = await auth0.getSession();
  const user = session?.user;
    
// Si no hay sesion iniciada, redirige al login. Sino va al chat del cliente
  if (!session) {
    redirect("/auth/login");
  }
  return <ChatClient />
}