"use client"

import { Locale } from "@/i18n/config"
import clsx from "clsx"
import { useTranslations } from "next-intl"
import { useState, useTransition } from "react"
import { setUserLocale } from "../../app/services/locale"
import { signIn, signOut, useSession } from "next-auth/react"
import { Button } from "../ui/button"
import Link from "next/link"

const Header = ({ initialLang }: { initialLang: Locale }) => {
  const t = useTranslations("Header")
  const { data: session } = useSession()
  const [isPending, startTransition] = useTransition()
  const [currentLang, setCurrentLang] = useState<Locale>(initialLang)
  console.log("session", session)
  function onClick(value: string) {
    startTransition(() => {
      setCurrentLang(value as Locale)
      setUserLocale(value as Locale)
    })
  }

  return (
    <header className="h-18 flex items-center justify-between">
      {/* LEFT PART */}
      <div className="flex items-center">
        <Link
          href="/"
          className="font-[family-name:var(--font-pacifico)] text-[41px] text-[var(--color-red)] min-w-[244px]"
        >
          {t("logo")}
        </Link>
        <div className="space-x-2 ml-8">
          <button
            className={clsx(
              "text-[var(--color-red)] cursor-pointer",
              isPending && "pointer-events-none opacity-60",
              currentLang !== "en" ? "opacity-60" : ""
            )}
            onClick={() => onClick("en")}
          >
            EN
          </button>
          <button
            className={clsx(
              "text-[var(--color-red)] cursor-pointer",
              isPending && "pointer-events-none opacity-60",
              currentLang !== "uk" ? "opacity-60" : ""
            )}
            onClick={() => onClick("uk")}
          >
            УКР
          </button>
        </div>
      </div>
      {/* RIGHT PART */}
      <div className="flex items-center gap-10">
        <Link
          href="/dashboard"
          className="text-[var(--color-red)] cursor-pointer"
        >
          {t("dashboard")}
        </Link>
        {session && (
          <Link href="admin" className="text-[var(--color-red)] cursor-pointer">
            {t("admin")}
          </Link>
        )}
        {session ? (
          <Button
            className="bg-[var(--color-red)] text-white cursor-pointer"
            onClick={() => signOut()}
          >
            {t("logout")}
          </Button>
        ) : (
          <Button
            className="bg-[var(--color-red)] text-white cursor-pointer"
            onClick={() => signIn("google")}
          >
            {t("adminLogin")}
          </Button>
        )}
      </div>
    </header>
  )
}

export default Header
