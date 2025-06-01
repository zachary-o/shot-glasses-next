import Header from "@/components/shared/Header"
import Providers from "@/components/shared/Providers"
import { Toaster } from "@/components/ui/sonner"
import clsx from "clsx"
import type { Metadata } from "next"
import { getLocale, getMessages } from "next-intl/server"
import localFont from "next/font/local"
import "./globals.css"
import { getUserLocale } from "./services/locale"

const pacifico = localFont({
  src: "./fonts/Pacifico-Regular.ttf",
  weight: "400",
  style: "normal",
  display: "swap",
  variable: "--font-pacifico",
})

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
  const messages = await getMessages()
  const initialLang = await getUserLocale()

  return (
    <html
      lang={locale}
      className={clsx(roadUI.variable, pacifico.variable, "min-h-screen")}
    >
      <body className="max-w-[1278px] bg-[#FFFDFA] mx-auto !px-6 lg:px-2 lg:pt-[20px]">
        <Providers locale={locale} messages={messages}>
          <Header initialLang={initialLang} />
          <Toaster />
          {children}
        </Providers>
      </body>
    </html>
  )
}
