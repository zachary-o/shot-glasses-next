import { prisma } from "@/prisma";
import { GetSearchParams } from "@/types";
import { Prisma, ShotGlass } from "@prisma/client";

export const getAllShotGlasses = async (
  searchParams: GetSearchParams,
  locale: string
): Promise<ShotGlass[]> => {
  const continents = searchParams.continents?.split(",") || [];
  const countries = searchParams.countries?.split(",") || [];
  const search = searchParams.search?.trim() || "";
  const sortBy = searchParams.sortBy?.trim() || "";

  const isLocaleEng = locale === "en";

  const where: Prisma.ShotGlassWhereInput = {};
  let orderBy: Prisma.ShotGlassOrderByWithRelationInput = {};

  if (continents && continents.length > 0) {
    where.continentEng = { in: continents };
  }

  if (countries && countries.length > 0) {
    where.countryEng = { in: countries };
  }

  if (search && search.length > 0) {
    where.OR = isLocaleEng
      ? [
          { cityEng: { contains: search, mode: "insensitive" } },
          { countryEng: { contains: search, mode: "insensitive" } },
          { continentEng: { contains: search, mode: "insensitive" } },
        ]
      : [
          { cityUkr: { contains: search, mode: "insensitive" } },
          { countryUkr: { contains: search, mode: "insensitive" } },
          { continentUkr: { contains: search, mode: "insensitive" } },
        ];
  }

  if (sortBy && sortBy.length > 0) {
    switch (sortBy) {
      case "cityAsc":
        orderBy = { [isLocaleEng ? "cityEng" : "cityUkr"]: "asc" };
        break;
      case "cityDesc":
        orderBy = { [isLocaleEng ? "cityEng" : "cityUkr"]: "desc" };
        break;
      case "countryAsc":
        orderBy = { [isLocaleEng ? "countryEng" : "countryUkr"]: "asc" };
        break;
      case "countryDesc":
        orderBy = { [isLocaleEng ? "countryEng" : "countryUkr"]: "desc" };
        break;
      // case "popularityAsc":
      //   orderBy = { likes: "asc" }
      //   break
      // case "popularityDesc":
      //   orderBy = { likes: "desc" }
      //   break
      default:
        break;
    }
  }

  try {
    return await prisma.shotGlass.findMany({
      where,
      orderBy,
    });
  } catch (error) {
    throw new Error(`Failed to fetch shot glasses: ${error}`);
  }
};
