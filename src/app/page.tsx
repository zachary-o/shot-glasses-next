"use client"

import { Locale } from "@/i18n/config"
import { useTranslations } from "next-intl"
import { useTransition } from "react"
import { setUserLocale } from "./services/locale"
import clsx from "clsx"

export default function Home() {
  const t = useTranslations("HomePage")
  const [isPending, startTransition] = useTransition()

  function onClick(value: string) {
    const locale = value as Locale
    startTransition(() => {
      setUserLocale(locale)
    })
  }
  return (
    <main className="font-normal space-y-4">
      <div className="space-x-2">
        <button
          className={clsx(
            "rounded-sm p-2 transition-colors hover:bg-slate-200 cursor-pointer",
            isPending && "pointer-events-none opacity-60"
          )}
          onClick={() => onClick("en")}
        >
          EN
        </button>
        <button
          className={clsx(
            "rounded-sm p-2 transition-colors hover:bg-slate-200 cursor-pointer",
            isPending && "pointer-events-none opacity-60"
          )}
          onClick={() => onClick("uk")}
        >
          UKR
        </button>
      </div>
      <h1>{t("title")}</h1>
    </main>
  )
}
