import { getAllShotGlasses } from "@/queries/getAllShotGlasses";
import { use } from "react";
import ChartsClient from "./Charts.client";

export default function Charts() {
  const data = use(getAllShotGlasses({ take: "9999" }, "en"));

  return <ChartsClient items={data} />;
}
