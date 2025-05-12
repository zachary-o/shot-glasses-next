import { useTranslations } from "next-intl";


export default function Home() {
    const t = useTranslations("HomePage")
  
  return (
    <main className="font-normal space-y-4">
      
      <h1 className="text-[var(--color-red)]">{t("title")}</h1>
    </main>
  );
}
