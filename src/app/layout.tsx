import Header from "@/components/shared/Header"
import clsx from "clsx"
import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import { NextIntlClientProvider } from "next-intl"
import { getLocale, getMessages } from "next-intl/server"
const roadUI = localFont({
  src: [
    {
      path: "./fonts/RoadUI-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/RoadUI-Bold.woff2",
      weight: "700",
      style: "bold",
    },
  ],
  variable: "--font-roadUI",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Shot Glasses",
  description: "Created by Zach Osetskyi",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()
  const messages = await getMessages();
  return (
    <html lang={locale} className={clsx(roadUI.variable, "min-h-screen")}>
      <body className="max-w-[1278px] mx-auto px-6 lg:px-2 lg:pt-[20px]">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
