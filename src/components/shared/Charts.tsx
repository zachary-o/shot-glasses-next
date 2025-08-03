import BarChartCustom from "@/components/shared/BarChartCustom";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import Map from "@/components/shared/Map";
import PieChartCustom from "@/components/shared/PieChartCustom";
import { ShotGlass } from "@prisma/client";
import { Suspense, use } from "react";

const fetchShotGlasses = async (): Promise<ShotGlass[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/shotGlasses`,
    { cache: "force-cache" }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch shot glasses");
  }

  const result = await response.json();

  return result.data || [];
};

const customStyles = {
  width: "100%",
  height: 540,
  borderRadius: 10,
  backgroundColor: "none",
  marginBottom: 40,
  boxShadow:
    "0 1px 3px 0 var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 1px 2px -1px var(--tw-shadow-color, rgb(0 0 0 / 0.1))",
};

const Charts = () => {
  const data = use(fetchShotGlasses());

  return (
    <>
      <Suspense fallback={<LoadingSpinner height="540" />}>
        <Map zoom={2} items={data} customStyles={customStyles} />
      </Suspense>
      <div className="flex flex-row gap-5">
        <Suspense fallback={<LoadingSpinner height="400" />}>
          <BarChartCustom items={data} />
        </Suspense>
        <Suspense fallback={<LoadingSpinner height="400" />}>
          <PieChartCustom items={data} />
        </Suspense>
      </div>
    </>
  );
};
export default Charts;
