import Filters from "@/components/shared/Filters"
import SearchInput from "@/components/shared/SearchInput"
import ShotGlassesList from "@/components/shared/ShotGlassesList"
import SortDropdown from "@/components/shared/SortDropdown"
import { getAllShotGlasses, GetSearchParams } from "@/queries/getAllShotGlasses"
import { Suspense } from "react"

export default async function Home({
  searchParams,
  modal,
}: {
  searchParams: Promise<GetSearchParams>
  modal: React.ReactNode
}) {
  const resolvedSearchParams = await searchParams
  const items = await getAllShotGlasses(resolvedSearchParams)

  return (
    <main className="flex flex-row gap-14 font-normal space-y-4">
      <Suspense>
        <Filters />
      </Suspense>
      <div className="flex-1">
        <div className="mb-4 flex items-center justify-between">
          <SearchInput />
          <SortDropdown />
        </div>
        <ShotGlassesList initialItems={items} />
      </div>
      {modal}
    </main>
  )
}
