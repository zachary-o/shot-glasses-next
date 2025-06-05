import { ShotGlass } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export function useShotGlassesData(initialData: ShotGlass[]) {
  return useQuery({
    queryKey: ["shotGlasses"],
    queryFn: async () => {
      // Client-side must use API routes, not direct queries
      // I want to keep my server and client code separate
      const response = await fetch("/api/shotGlasses");
      if (!response.ok) throw new Error("Failed to fetch shot glasses");
      return response.json();
    },
    initialData,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}
