'use client';

import { SessionProvider } from "next-auth/react";
import { NextIntlClientProvider } from "next-intl";
import { ReactNode } from "react";
import { Toaster } from "../ui/sonner";

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
      <NextIntlClientProvider locale={locale} messages={messages}>
        {children}
        <Toaster />
      </NextIntlClientProvider>
    </SessionProvider>
  )
}

export default Providers
