// import { useShotGlassMutations } from "@/hooks/useShotGlassMutations";

import { ShotGlass } from "@prisma/client";
import { Info } from "lucide-react";
import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const ShotGlassCard = ({ shotGlass }: { shotGlass: ShotGlass }) => {
  const locale = useLocale();

  //   const { deleteShotGlass, isDeleting } = useShotGlassMutations();
  return (
    <div className="w-[230px] py-[20px] px-[30px] flex flex-col border border-[#D2D0D0] rounded-sm hover:border-[var(--color-red)] transition-all">
      <Image
        className="rounded-sm mb-3"
        width={200}
        height={200}
        src={shotGlass.imageUrl}
        alt={`Shot glass from ${shotGlass.cityEng}`}
      />
      <div>
        <span className="font-bold">
          {locale === "en" ? shotGlass.countryEng : shotGlass.countryUkr}
        </span>
        <div className="flex flex-row items-center gap-4">
          <span>{locale === "en" ? shotGlass.cityEng : shotGlass.cityUkr}</span>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info
                className="hover:cursor-pointer"
                size={16}
                color="#646262"
                absoluteStrokeWidth
              />
            </TooltipTrigger>
            <TooltipContent>
              <Link href={`/shotGlass/${shotGlass.id}`} scroll={false}>
                Add to library
              </Link>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};
export default ShotGlassCard;
