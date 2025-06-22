"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { NextIntlClientProvider } from "next-intl";
import { ReactNode, useState } from "react";
import { LoadingBarContainer } from "react-top-loading-bar";
import { Toaster } from "../ui/sonner";

const Providers = ({
  children,
  locale,
  messages,
}: {
  children: ReactNode;
  locale: string;
  messages: Record<string, string>;
}) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <SessionProvider>
      <NextIntlClientProvider
        locale={locale}
        messages={messages}
        timeZone="Europe/Kyiv"
      >
        <QueryClientProvider client={queryClient}>
          <LoadingBarContainer
            props={{
              color: "var(--color-red)",
              height: 2,
            }}
          >
            <Toaster />
            {children}
          </LoadingBarContainer>
        </QueryClientProvider>
      </NextIntlClientProvider>
    </SessionProvider>
  );
};

export default Providers;
