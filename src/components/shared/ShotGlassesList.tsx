"use client";

import { useShotGlassesData } from "@/hooks/useShotGlassesData";
import { useEffect } from "react";
import { useLoadingBar } from "react-top-loading-bar";
import ShotGlassCard from "./ShotGlassCard";
import { toast } from "sonner";
import { ShotGlass } from "@prisma/client";

const ShotGlassesList = ({ initialItems }: { initialItems: ShotGlass[] }) => {
  const {
    data: shotGlasses,
    isLoading,
    error,
  } = useShotGlassesData(initialItems);

  const loadingBar = useLoadingBar();

  if (error) {
    toast.error(
      `Failed to load items. Please try again. Error: ${error.message}`
    );
  }

  useEffect(() => {
    if (!loadingBar) return;

    if (isLoading) {
      loadingBar.start();
    } else {
      loadingBar.complete();
    }
  }, [isLoading, loadingBar]);

  return (
    <div className="grid justify-between [grid-template-columns:repeat(2,230px)] md:[grid-template-columns:repeat(3,230px)] lg:[grid-template-columns:repeat(4,230px)] xl:[grid-template-columns:repeat(5,230px)]">
      {shotGlasses.map((shotGlass: ShotGlass) => (
        <ShotGlassCard key={shotGlass.id} shotGlass={shotGlass} />
      ))}
    </div>
  );
};
export default ShotGlassesList;
