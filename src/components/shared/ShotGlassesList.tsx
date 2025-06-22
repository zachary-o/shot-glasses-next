"use client";

import { useShotGlassesData } from "@/hooks/useShotGlassesData";
import { ShotGlass } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useLoadingBar } from "react-top-loading-bar";
import { toast } from "sonner";
import ShotGlassCard from "./ShotGlassCard";

const ShotGlassesList = ({ initialItems }: { initialItems: ShotGlass[] }) => {
  const loadingBar = useLoadingBar();
  const searchParams = useSearchParams();

  const continents = searchParams.get("continents") || "";
  const countries = searchParams.get("countries") || "";

  const {
    data: shotGlasses,
    isLoading,
    error,
  } = useShotGlassesData(initialItems, { continents, countries });

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
    <div className="flex-1 grid gap-y-4 justify-between [grid-template-columns:repeat(2,230px)] md:[grid-template-columns:repeat(3,230px)] lg:[grid-template-columns:repeat(3,230px)] xl:[grid-template-columns:repeat(4,230px)]">
      {shotGlasses.map((shotGlass: ShotGlass) => (
        <ShotGlassCard key={shotGlass.id} shotGlass={shotGlass} />
      ))}
    </div>
  );
};

export default ShotGlassesList;
