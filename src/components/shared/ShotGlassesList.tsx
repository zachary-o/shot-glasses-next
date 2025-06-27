"use client"

import { useShotGlassesData } from "@/hooks/useShotGlassesData"
import { GetSearchParams } from "@/types"
import { ShotGlass } from "@prisma/client"
import { useEffect, useMemo } from "react"
import { useLoadingBar } from "react-top-loading-bar"
import { toast } from "sonner"
import ShotGlassCard from "./ShotGlassCard"
import { Button } from "../ui/button"

const ShotGlassesList = ({
  initialItems,
  searchParams,
}: {
  initialItems: ShotGlass[]
  searchParams: GetSearchParams
}) => {
  const loadingBar = useLoadingBar()
  const pageSize = 10
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useShotGlassesData(initialItems, searchParams, pageSize)

  const shotGlasses = useMemo(() => {
    return data?.pages.flatMap((page) => page.data) || []
  }, [data])

  if (error) {
    toast.error(
      `Failed to load items. Please try again. Error: ${error.message}`
    )
  }

  useEffect(() => {
    if (!loadingBar) return

    if (isLoading || isFetchingNextPage) {
      loadingBar.start()
    } else {
      loadingBar.complete()
    }
  }, [isLoading, isFetchingNextPage, loadingBar])

  const handleShowMore = () => {
    fetchNextPage()
  }

  return (
    <div className="flex-1 grid gap-y-4 justify-between [grid-template-columns:repeat(2,230px)] md:[grid-template-columns:repeat(3,230px)] lg:[grid-template-columns:repeat(3,230px)] xl:[grid-template-columns:repeat(4,230px)]">
      {shotGlasses.map((shotGlass: ShotGlass) => (
        <ShotGlassCard key={shotGlass.id} shotGlass={shotGlass} />
      ))}

      {hasNextPage && (
        <div className="flex justify-center">
          <Button
            onClick={handleShowMore}
            disabled={isLoading || isFetchingNextPage}
            variant="outline"
            className="px-8 py-2"
          >
            {isFetchingNextPage ? "Loading..." : "Show More"}
          </Button>
        </div>
      )}
    </div>
  )
}

export default ShotGlassesList
