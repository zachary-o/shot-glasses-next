import { ShotGlass } from "@prisma/client"
import { useInfiniteQuery } from "@tanstack/react-query"

export function useShotGlassesData(
  initialData: ShotGlass[],
  searchParams: {
    continents?: string
    countries?: string
    search?: string
    sortBy?: string
  },
  pageSize: number
) {
  const queryKey = ["shotGlasses", searchParams]

  return useInfiniteQuery({
    queryKey,
    queryFn: async ({ pageParam = 0 }) => {
      const query = new URLSearchParams(searchParams).toString()
      const response = await fetch(`/api/shotGlasses?${query}`)
      if (!response.ok) throw new Error("Failed to fetch shot glasses")

      const allData = await response.json()

      const startIndex = pageParam * pageSize
      const endIndex = startIndex + pageSize
      const pageData = allData.slice(startIndex, endIndex)

      return {
        data: pageData,
        nextCursor: endIndex < allData.length ? pageParam + 1 : undefined,
        hasMore: endIndex < allData.length,
        total: allData.length,
      }
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.nextCursor
    },
    initialData:
      initialData.length > 0
        ? {
            pages: [
              {
                data: initialData.slice(0, pageSize),
                nextCursor: initialData.length > pageSize ? 1 : undefined,
                hasMore: initialData.length > pageSize,
                total: initialData.length,
              },
            ],
            pageParams: [0],
          }
        : undefined,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  })
}
