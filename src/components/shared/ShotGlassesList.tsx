"use client";

import { useShotGlasses } from "@/context/ShotGlassesContext";
import { useLoadingBar } from "react-top-loading-bar";
import ShotGlassCard from "./ShotGlassCard";

const ShotGlassesList = () => {
  const { shotGlasses, isLoadingShotGlasses, error } = useShotGlasses();
  const { start, complete } = useLoadingBar();

  if (error) {
    return "CREATE AN ERROR BOUNDARY COMPONENT!!!!!";
  }

  if (isLoadingShotGlasses) {
    start();
  } else {
    complete();
  }

  return (
    <div>
      {shotGlasses.map((shotGlass) => (
        <ShotGlassCard key={shotGlass.id} {...shotGlass} />
      ))}
    </div>
  );
};
export default ShotGlassesList;
