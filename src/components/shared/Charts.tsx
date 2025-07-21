import Map from "@/components/shared/Map";
import { ShotGlass } from "@prisma/client";
import { Suspense, use } from "react";
import LoadingSpinner from "./LoadingSpinner";

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

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Map zoom={2} items={data} customStyles={customStyles} />
    </Suspense>
  );
};
export default Charts;
