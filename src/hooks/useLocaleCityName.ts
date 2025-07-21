import { useLocale } from "next-intl";

export const useLocaleCityName = (cityNameEng: string, cityNameUkr: string) => {
  const locale = useLocale();

  return locale === "en" ? cityNameEng : cityNameUkr;
};
