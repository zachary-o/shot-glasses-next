import { multiSelectVariants } from "@/components/shared/CountriesSelect"
import { ShotGlass } from "@prisma/client"
import { type VariantProps } from "class-variance-authority"

export type GeoType = {
  nameEng: string
  nameUkr: string
  continentEng: string
  continentUkr: string
}

export type Continent = Pick<GeoType, "continentEng" | "continentUkr">

export type Country = Pick<GeoType, "nameEng" | "nameUkr">
export interface MultiSelectProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "value">,
    VariantProps<typeof multiSelectVariants> {
  options: GeoType[] | Country[]
  isMulti: boolean
  value?: Country | Country[]
  onValueChange: (value: Country | Country[] | string[]) => void
  defaultValue?: string[]
  placeholder?: string
  maxCount?: number
  modalPopover?: boolean
  asChild?: boolean
  className?: string
}

export type ContinentsCheckboxGroupProps = {
  value?: Continent | Continent[]
  isMulti: boolean
  onValueChange: (value: Continent | Continent[] | string[]) => void
  options: Continent[]
}

export type CreateShotGlassInput = Omit<
  ShotGlass,
  "id" | "createdAt" | "updatedAt"
>

export interface GetSearchParams {
  search?: string
  sortBy?: string
  continents?: string
  countries?: string
  limit?: string
  offset?: string
}
