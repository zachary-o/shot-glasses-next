import { ShotGlass } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export function useShotGlassesData(
  initialData: ShotGlass[],
  searchParams: { continents?: string; countries: string }
) {
  const queryKey = ["shotGlasses", searchParams];

  return useQuery({
    queryKey,
    queryFn: async () => {
      const query = new URLSearchParams(searchParams).toString();
      const response = await fetch(`/api/shotGlasses?${query}`);
      if (!response.ok) throw new Error("Failed to fetch shot glasses");
      return response.json();
    },
    initialData: () => initialData,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}
