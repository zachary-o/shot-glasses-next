import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "../api/auth/[...nextauth]/authOptions"

export default async function AdminPage() {
  const session = await getServerSession(authOptions)

  if (!session || session.user?.email !== process.env.NEXT_PUBLIC_EMAIL) {
    redirect("/unauthorized")
  }

  return <div>Welcome to the Admin Panel</div>
}
