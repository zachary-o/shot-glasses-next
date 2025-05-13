"use client"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet"

import { Locale } from "@/i18n/config"
import { GlassWater } from "lucide-react"
import { signIn, signOut, useSession } from "next-auth/react"
import { useTranslations } from "next-intl"
import Link from "next/link"
import { useState, useTransition } from "react"
import { setUserLocale } from "../../app/services/locale"
import { Button } from "../ui/button"
import LanguageToggle from "./LanguageToggle"

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
    <header className="h-18 flex items-center justify-between mb-10">
      {/* LEFT PART */}
      <div className="flex items-center">
        <Link
          href="/"
          className="font-[family-name:var(--font-pacifico)] text-[41px] text-[var(--color-red)] min-w-[244px] select-none"
        >
          {t("logo")}
        </Link>
        <div className="space-x-2 ml-8 hidden md:inline">
          <LanguageToggle
            currentLang={currentLang}
            isPending={isPending}
            onClick={onClick}
          />
        </div>
      </div>
      {/* RIGHT PART */}
      <div className="hidden md:flex items-center gap-10 ">
        <Link
          href="/dashboard"
          className="text-[var(--color-red)] cursor-pointer"
        >
          {t("dashboard")}
        </Link>
        {session && (
          <Link
            href="/admin"
            className="text-[var(--color-red)] cursor-pointer"
          >
            {t("admin")}
          </Link>
        )}
        {session ? (
          <Button
            className="bg-[var(--color-red)] text-white cursor-pointer hover:bg-[#b21c11]"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            {t("logout")}
          </Button>
        ) : (
          <Button
            className="bg-[var(--color-red)] text-white cursor-pointer hover:bg-[#b21c11]"
            onClick={() => signIn("google")}
          >
            {t("adminLogin")}
          </Button>
        )}
      </div>
      {/* MOBILE DRAWER PANEL */}
      <Sheet>
        <SheetTrigger asChild className="md:hidden">
          <Button
            className="bg-[var(--color-red)] text-white cursor-pointer hover:bg-[#b21c11]"
            size="icon"
          >
            <GlassWater />
          </Button>
        </SheetTrigger>
        <SheetContent className="bg-[#FFFDFA] w-[300px]">
          <SheetHeader aria-label="Sidebar Title">
            <SheetTitle className="text-[var(--color-red)]">
              {t("menuTitle")}
            </SheetTitle>
          </SheetHeader>
          <div className="p-4">
            <div className="flex flex-row items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <LanguageToggle
                  currentLang={currentLang}
                  isPending={isPending}
                  onClick={onClick}
                />
              </div>

              {session ? (
                <Button
                  className="bg-[var(--color-red)] text-white cursor-pointer hover:bg-[#b21c11]"
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  {t("logout")}
                </Button>
              ) : (
                <Button
                  className="bg-[var(--color-red)] text-white cursor-pointer hover:bg-[#b21c11]"
                  onClick={() => signIn("google")}
                >
                  {t("adminLogin")}
                </Button>
              )}
            </div>
            <div className="flex flex-col gap-4">
              <Link
                href="/dashboard"
                className="text-[var(--color-red)] text-2xl cursor-pointer"
              >
                {t("dashboard")}
              </Link>
              {session && (
                <Link
                  href="/admin"
                  className="text-[var(--color-red)] text-2xl cursor-pointer"
                >
                  {t("admin")}
                </Link>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  )
}

export default Header
