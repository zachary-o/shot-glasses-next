"use client";

import { SessionProvider } from "next-auth/react";
import { NextIntlClientProvider } from "next-intl";
import { LoadingBarContainer } from "react-top-loading-bar";

import { ReactNode } from "react";

const Providers = ({
  children,
  locale,
  messages,
}: {
  children: ReactNode;
  locale: string;
  messages: Record<string, string>;
}) => {
  return (
    <SessionProvider>
      <NextIntlClientProvider
        locale={locale}
        messages={messages}
        timeZone="Europe/Kyiv"
      >
        <LoadingBarContainer
          props={{
            color: "var(--color-red)",
            height: 2,
          }}
        >
          {children}
        </LoadingBarContainer>
      </NextIntlClientProvider>
    </SessionProvider>
  );
};

export default Providers;
