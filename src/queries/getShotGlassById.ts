import { prisma } from "@/prisma";
import { ShotGlass } from "@prisma/client";

export const getShotGlassById = async (
  id: string
): Promise<ShotGlass | null> => {
  const shotGlass = prisma.shotGlass.findUnique({
    where: { id: Number(id) },
  });

  return shotGlass;
};
