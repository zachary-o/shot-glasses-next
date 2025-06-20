import Filters from "@/components/shared/Filters"
import ShotGlassesList from "@/components/shared/ShotGlassesList"
import { getAllShotGlasses, GetSearchParams } from "@/queries/getAllShotGlasses"
import { Suspense } from "react"

export default async function Home({ modal, searchParams }: { modal: React.ReactNode, searchParams: GetSearchParams }) {
  const items = await getAllShotGlasses(searchParams)

  return (
    <main className="font-normal space-y-4">
      <Suspense>
        <Filters />
      </Suspense>
      <ShotGlassesList initialItems={items} />
      {modal}
    </main>
  )
}
