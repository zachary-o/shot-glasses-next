import { prisma } from "@/prisma";
import { ShotGlass } from "@prisma/client";

export const getAllShotGlasses = async (): Promise<ShotGlass[]> => {
  try {
    return await prisma.shotGlass.findMany();
  } catch (error) {
    throw new Error(`Failed to fetch shot glasses: ${error}`);
  }
};
