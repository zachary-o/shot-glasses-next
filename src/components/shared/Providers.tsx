"use client"

import { SessionProvider } from "next-auth/react"
import { NextIntlClientProvider } from "next-intl"
import { ReactNode } from "react"

const Providers = ({
  children,
  locale,
  messages,
}: {
  children: ReactNode
  locale: string
  messages: Record<string, any>
}) => {
  return (
    <SessionProvider>
      <NextIntlClientProvider
        locale={locale}
        messages={messages}
        timeZone="Europe/Kyiv"
      >
        {children}
      </NextIntlClientProvider>
    </SessionProvider>
  )
}

export default Providers
