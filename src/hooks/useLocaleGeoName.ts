import { useLocale } from "next-intl";

export const useLocaleGeoName = (nameEng: string, nameUkr: string) => {
  const locale = useLocale();

  return locale === "en" ? nameEng : nameUkr;
};
