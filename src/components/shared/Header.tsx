"use client";

import { useTranslations } from "next-intl";
import React from "react";

const Header = () => {
  const t = useTranslations("Header");
  return (
    <header className="h-18 flex items-center">
      <h4 className="text-[41px] text-[var(--color-red)]">
        {t("logo")}
      </h4>
    </header>
  );
};

export default Header;
