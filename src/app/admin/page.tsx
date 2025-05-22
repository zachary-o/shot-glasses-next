import AdminForm from "@/components/shared/AdminForm"
import PageTitle from "@/components/shared/PageTitle"
import { getServerSession } from "next-auth"
import { getTranslations } from "next-intl/server"
import { redirect } from "next/navigation"
import { authOptions } from "../api/auth/[...nextauth]/authOptions"

export default async function AdminPage() {
  const t = await getTranslations("Admin")
  const session = await getServerSession(authOptions)

  if (!session || session.user?.email !== process.env.NEXT_PUBLIC_EMAIL) {
    redirect("/unauthorized")
  }

  return (
    <section>
      <PageTitle text={t("title")} />
      <AdminForm />
    </section>
  )
}
