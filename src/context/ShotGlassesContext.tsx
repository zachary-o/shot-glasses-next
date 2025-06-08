"use client";

import { useShotGlassesData } from "@/hooks/useShotGlassesData";
import { ShotGlass } from "@prisma/client";
import { createContext, useContext, ReactNode } from "react";

type ShotGlassesContextValue = {
  shotGlasses: ShotGlass[];
  isLoadingShotGlasses: boolean;
  error: Error | null;
};

type ShotGlassesProviderProps = {
  children: ReactNode;
  initialItems: ShotGlass[];
};

const ShotGlassesContext = createContext<ShotGlassesContextValue | null>(null);

export function ShotGlassesProvider({
  children,
  initialItems,
}: ShotGlassesProviderProps) {
  const {
    data: shotGlasses,
    isLoading,
    error,
  } = useShotGlassesData(initialItems);

  return (
    <ShotGlassesContext.Provider
      value={{ shotGlasses, isLoadingShotGlasses: isLoading, error }}
    >
      {children}
    </ShotGlassesContext.Provider>
  );
}

export function useShotGlasses() {
  const context = useContext(ShotGlassesContext);

  if (!context) {
    throw new Error("useShotGlasses must be used within ShotGlassesProvider");
  }
  return context;
}
