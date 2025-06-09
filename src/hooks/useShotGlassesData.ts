import { ShotGlass } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export function useShotGlassesData(initialData: ShotGlass[]) {
  return useQuery({
    queryKey: ["shotGlasses"],
    queryFn: async () => {
      const response = await fetch("/api/shotGlasses");
      if (!response.ok) throw new Error("Failed to fetch shot glasses");
      return response.json();
    },
    initialData: () => initialData,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}
