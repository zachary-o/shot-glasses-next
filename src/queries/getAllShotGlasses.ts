import { prisma } from "@/prisma"
import { Prisma, ShotGlass } from "@prisma/client"
import { Locale } from "next-intl"
export interface GetSearchParams {
  search?: string
  sortBy?: string
  continents?: string
  countries?: string
}

export const getAllShotGlasses = async (
  searchParams: GetSearchParams
): Promise<ShotGlass[]> => {
  const continents = searchParams.continents?.split(",") || []
  const countries = searchParams.countries?.split(",") || []
  const search = searchParams.search?.trim() || ""

  const where: Prisma.ShotGlassWhereInput = {}

  if (continents.length > 0) {
    where.continentEng = { in: continents }
  }

  if (countries.length > 0) {
    where.countryEng = { in: countries }
  }

  if (search && search.length > 0) {
    where.OR = [
      { cityEng: { contains: search, mode: "insensitive" } },
      { countryEng: { contains: search, mode: "insensitive" } },
      { continentEng: { contains: search, mode: "insensitive" } },
      { cityUkr: { contains: search, mode: "insensitive" } },
      { countryUkr: { contains: search, mode: "insensitive" } },
      { continentUkr: { contains: search, mode: "insensitive" } },
    ]
  }

  try {
    return await prisma.shotGlass.findMany({ where })
  } catch (error) {
    throw new Error(`Failed to fetch shot glasses: ${error}`)
  }
}
