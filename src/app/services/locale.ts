"use server"

import { cookies } from "next/headers"
import { Locale, defaultLocale } from "@/i18n/config"

// In this example the locale is read from a cookie. You could alternatively
// also read it from a database, backend service, or any other source.
const COOKIE_NAME = "NEXT_LOCALE"

export async function getUserLocale(): Promise<Locale> {
  const cookieStore = await cookies()
  const value = cookieStore.get(COOKIE_NAME)?.value
  return (value === "en" || value === "uk") ? value : defaultLocale
}

export async function setUserLocale(locale: Locale) {
  ;(await cookies()).set(COOKIE_NAME, locale)
}
