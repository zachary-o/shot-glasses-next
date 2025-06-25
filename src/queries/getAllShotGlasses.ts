import { prisma } from "@/prisma"
import { Prisma, ShotGlass } from "@prisma/client"
export interface GetSearchParams {
  search?: string
  sortBy?: string
  continents?: string
  countries?: string
}

export const getAllShotGlasses = async (
  searchParams: GetSearchParams,
  locale: string
): Promise<ShotGlass[]> => {
  const continents = searchParams.continents?.split(",") || []
  const countries = searchParams.countries?.split(",") || []
  const search = searchParams.search?.trim() || ""
  const sortBy = searchParams.sortBy?.trim() || ""

  let where: Prisma.ShotGlassWhereInput = {}
  let orderBy: Prisma.ShotGlassOrderByWithRelationInput = {}

  if (continents && continents.length > 0) {
    where.continentEng = { in: continents }
  }

  if (countries && countries.length > 0) {
    where.countryEng = { in: countries }
  }

  if (search && search.length > 0) {
    where.OR =
      locale === "en"
        ? [
            { cityEng: { contains: search, mode: "insensitive" } },
            { countryEng: { contains: search, mode: "insensitive" } },
            { continentEng: { contains: search, mode: "insensitive" } },
          ]
        : [
            { cityUkr: { contains: search, mode: "insensitive" } },
            { countryUkr: { contains: search, mode: "insensitive" } },
            { continentUkr: { contains: search, mode: "insensitive" } },
          ]
  }

  if (sortBy && sortBy.length > 0) {
    console.log("sortBy", sortBy)
    switch (sortBy) {
      case "cityAsc":
        orderBy = { [locale === "en" ? "cityEng" : "cityUkr"]: "asc" }
        break
      case "cityDesc":
        orderBy = { [locale === "en" ? "cityEng" : "cityUkr"]: "desc" }
        break
      case "countryAsc":
        orderBy = { [locale === "en" ? "countryEng" : "countryUkr"]: "asc" }
        break
      case "countryDesc":
        orderBy = { [locale === "en" ? "countryEng" : "countryUkr"]: "desc" }
        break
      // case "popularityAsc":
      //   orderBy = { likes: "asc" }
      //   break
      // case "popularityDesc":
      //   orderBy = { likes: "desc" }
      //   break
      default:
        break
    }
  }

  try {
    return await prisma.shotGlass.findMany({ where, orderBy })
  } catch (error) {
    throw new Error(`Failed to fetch shot glasses: ${error}`)
  }
}
