import Filters from "@/components/shared/Filters";
import ShotGlassesList from "@/components/shared/ShotGlassesList";
import {
  getAllShotGlasses,
  GetSearchParams,
} from "@/queries/getAllShotGlasses";
import { Suspense } from "react";

export default async function Home({
  searchParams,
  modal,
}: {
  searchParams: Promise<GetSearchParams>;
  modal: React.ReactNode;
}) {
  const resolvedSearchParams = await searchParams;
  const items = await getAllShotGlasses(resolvedSearchParams);
  
  return (
    <main className="flex flex-row gap-14 font-normal space-y-4">
      <Suspense>
        <Filters />
      </Suspense>
      <ShotGlassesList initialItems={items} />
      {modal}
    </main>
  );
}
