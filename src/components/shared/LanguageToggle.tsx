import { Locale } from "@/i18n/config"
import clsx from "clsx"

const LanguageToggle = ({
  currentLang,
  isPending,
  onClick,
}: {
  currentLang: Locale
  isPending: boolean
  onClick: (value: string) => void
}) => (
  <>
    {["en", "uk"].map((lang) => (
      <button
        key={lang}
        className={clsx(
          "text-[var(--color-red)] cursor-pointer",
          isPending && "pointer-events-none opacity-60",
          currentLang !== lang ? "opacity-60" : ""
        )}
        onClick={() => onClick(lang)}
      >
        {lang.toUpperCase()}
      </button>
    ))}
  </>
)

export default LanguageToggle