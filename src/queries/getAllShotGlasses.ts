import { prisma } from "@/prisma";
import { ShotGlass } from "@prisma/client";
export interface GetSearchParams {
  query?: string;
  sortBy?: string;
  continents?: string;
  countries?: string;
}

export const getAllShotGlasses = async (
  searchParams: GetSearchParams // This stays the same - it's now the resolved object
): Promise<ShotGlass[]> => {
  const continents = searchParams.continents?.split(",") || [];
  const countries = searchParams.countries?.split(",") || [];

  const where: Record<string, unknown> = {};

  if (continents.length > 0) {
    where.continentEng = { in: continents };
  }

  if (countries.length > 0) {
    where.countryEng = { in: countries };
  }

  try {
    return await prisma.shotGlass.findMany({ where });
  } catch (error) {
    throw new Error(`Failed to fetch shot glasses: ${error}`);
  }
};
