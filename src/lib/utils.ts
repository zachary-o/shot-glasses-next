import { clsx, type ClassValue } from "clsx";
import { Locale } from "date-fns";
import { twMerge } from "tailwind-merge";
import { enUS, uk } from "date-fns/locale";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const localeMap: Record<string, Locale> = {
  en: enUS,
  uk: uk,
};
