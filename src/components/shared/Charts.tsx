import BarChartCustom from "@/components/shared/BarChartCustom";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import Map from "@/components/shared/Map";
import PieChartCustom from "@/components/shared/PieChartCustom";
import { ShotGlass } from "@prisma/client";
import { Suspense, use } from "react";

const fetchShotGlasses = async (): Promise<ShotGlass[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/shotGlasses`
  );
  const result = await response.json();

  return result.data || [];
};

const customStyles = {
  width: "100%",
  height: 540,
  borderRadius: 10,
  backgroundColor: "none",
  marginBottom: 40,
};

const Charts = () => {
  const data = use(fetchShotGlasses());

  //WRAP LoadingSpinner inside a div with dynamiv height
  return (
    <>
      <Suspense
        fallback={
          <div className="h-[540px] w-full flex items-center justify-center">
            <LoadingSpinner />
          </div>
        }
      >
        <Map zoom={2} items={data} customStyles={customStyles} />
      </Suspense>
      <div className="flex flex-row gap-5">
        <BarChartCustom items={data} />
        <PieChartCustom />
      </div>
    </>
  );
};
export default Charts;
