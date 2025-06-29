import Filters from "@/components/shared/Filters";
import SearchInput from "@/components/shared/SearchInput";
import ShotGlassesList from "@/components/shared/ShotGlassesList";
import SortDropdown from "@/components/shared/SortDropdown";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { getAllShotGlasses } from "@/queries/getAllShotGlasses";
import { ListFilter } from "lucide-react";
import { getLocale } from "next-intl/server";
import { Suspense } from "react";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const locale = await getLocale();
  const resolvedSearchParams = (await searchParams);
  const items = await getAllShotGlasses(resolvedSearchParams, locale);

  return (
    <main className="flex flex-row gap-14 font-normal space-y-4">
      <Suspense>
        <Filters className="hidden lg:flex" />
      </Suspense>
      <div className="flex-1">
        <div className="mb-4 flex items-center justify-between">
          {/* MOBILE DRAWER PANEL WITH FILTER */}
          <Sheet>
            <SheetTrigger asChild>
              <Button className="inline lg:!hidden animated-button" size="icon">
                <ListFilter />
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-[#FFFDFA] w-[300px]" side="left">
              <SheetHeader aria-label="Sidebar Title">
                <SheetTitle className="text-[var(--color-red)]">
                  {/* {t("menuTitle")} */}
                </SheetTitle>
              </SheetHeader>
              <div className="p-4">
                <Suspense>
                  <Filters className="flex lg:hidden" />
                </Suspense>
              </div>
            </SheetContent>
          </Sheet>
          <SearchInput />
          <SortDropdown />
        </div>
        <ShotGlassesList
          initialItems={items}
          searchParams={resolvedSearchParams}
        />
      </div>
    </main>
  );
}
