"use client";

import { SessionProvider } from "next-auth/react";
import { NextIntlClientProvider } from "next-intl";
import { ReactNode } from "react";
import { LoadingBarContainer } from "react-top-loading-bar";
import TopLoadingBarTrigger from "./TopLoadingBarTrigger";

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
          <TopLoadingBarTrigger />
          {children}
        </LoadingBarContainer>
      </NextIntlClientProvider>
    </SessionProvider>
  );
};

export default Providers;
