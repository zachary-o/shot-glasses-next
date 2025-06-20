import { prisma } from "@/prisma";
import { ShotGlass } from "@prisma/client";

export interface GetSearchParams {
  query?: string
  sortBy?: string
  continents?: string
  countries?: string
}


export const getAllShotGlasses = async (params: GetSearchParams): Promise<ShotGlass[]> => {
  try {
    return await prisma.shotGlass.findMany();
  } catch (error) {
    throw new Error(`Failed to fetch shot glasses: ${error}`);
  }
};
