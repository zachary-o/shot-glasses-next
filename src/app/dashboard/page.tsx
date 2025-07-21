import Charts from "@/components/shared/Charts";
import PageTitle from "@/components/shared/PageTitle";
import { getTranslations } from "next-intl/server";

export default async function Dashboard() {
  const t = await getTranslations("Dashboard");

  return (
    <section>
      <PageTitle text={t("title")} />
      <Charts />
    </section>
  );
}
