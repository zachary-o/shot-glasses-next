// import { useShotGlassMutations } from "@/hooks/useShotGlassMutations";

import { ShotGlass } from "@prisma/client"
import Image from "next/image"

const ShotGlassCard = ({ shotGlass }: { shotGlass: ShotGlass }) => {
  //   const { deleteShotGlass, isDeleting } = useShotGlassMutations();
  return (
    <div className="w-[230px] py-[20px] px-[30px] flex flex-col border border-[#D2D0D0] rounded-sm">
      <Image
        className="rounded-sm mb-3"
        width={200}
        height={200}
        src={shotGlass.imageUrl}
        alt={`Shot glass from ${shotGlass.cityEng}`}
      />
      <div>
        <span>{shotGlass.countryEng}</span>
        <div>
          <span>{shotGlass.cityEng}</span>
        </div>
      </div>
    </div>
  )
}
export default ShotGlassCard
