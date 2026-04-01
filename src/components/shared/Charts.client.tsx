"use client";

import dynamic from "next/dynamic";
import { ShotGlass } from "@prisma/client";

const BarChartCustom = dynamic(
  () => import("@/components/shared/BarChartCustom"),
  { ssr: false }
);
const PieChartCustom = dynamic(
  () => import("@/components/shared/PieChartCustom"),
  { ssr: false }
);
const Map = dynamic(() => import("@/components/shared/Map"), { ssr: false });

const customStyles = {
  width: "100%",
  height: "clamp(280px, 50vw, 540px)",
  borderRadius: 10,
  backgroundColor: "none",
  marginBottom: 40,
  boxShadow:
    "0 1px 3px 0 var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 1px 2px -1px var(--tw-shadow-color, rgb(0 0 0 / 0.1))",
};

export default function ChartsClient({ items }: { items: ShotGlass[] }) {
  return (
    <>
      <Map zoom={2} items={items} customStyles={customStyles} />
      <div className="flex flex-row gap-5 mb-4">
        <BarChartCustom items={items} />
        <PieChartCustom items={items} />
      </div>
    </>
  );
}
