import { ShotGlass } from "@prisma/client";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useShotGlassesData(
  initialData: ShotGlass[],
  searchParams: {
    continents?: string;
    countries?: string;
    search?: string;
    sortBy?: string;
  },
  pageSize: number
) {
  const queryKey = ["shotGlasses", searchParams];

  return useInfiniteQuery({
    queryKey,
    queryFn: async ({ pageParam = 0 }) => {
      const query = new URLSearchParams({
        ...searchParams,
        skip: String(pageParam),
        take: String(pageSize),
      }).toString();
      const response = await fetch(`/api/shotGlasses?${query}`);
      if (!response.ok) throw new Error("Failed to fetch shot glasses");

      const result = await response.json();
      return {
        data: result.data,
        nextCursor: result.hasMore ? result.nextSkip : undefined,
        hasMore: result.hasMore,
      };
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.nextCursor;
    },
    initialData:
      initialData.length > 0
        ? {
            pages: [
              {
                data: initialData,
                nextCursor:
                  initialData.length >= pageSize ? pageSize : undefined,
                hasMore: initialData.length > pageSize,
              },
            ],
            pageParams: [0],
          }
        : undefined,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}
