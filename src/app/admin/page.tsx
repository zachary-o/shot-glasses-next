import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { toast } from "sonner"
import { authOptions } from "../api/auth/[...nextauth]/authOptions"

export default async function AdminPage() {
  const session = await getServerSession(authOptions)

  if (!session || session.user?.email !== process.env.NEXT_PUBLIC_EMAIL) {
    toast("You are not logged in as an admin!", {
      description: "Please log in to add new shot glasses",
      action: {
        label: "Close",
        onClick: () => console.log("Undo"),
      },
    })
    redirect("/")
  }

  return <div>Welcome to the Admin Panel</div>
}
