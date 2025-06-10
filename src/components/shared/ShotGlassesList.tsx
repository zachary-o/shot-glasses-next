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
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
      {shotGlasses.map((shotGlass: ShotGlass) => (
        <ShotGlassCard key={shotGlass.id} shotGlass={shotGlass} />
      ))}
    </div>
  );
};
export default ShotGlassesList;
