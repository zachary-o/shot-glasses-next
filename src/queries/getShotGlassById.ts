import { ShotGlass } from "@prisma/client";

export const getShotGlassById = async (
  id: string
): Promise<ShotGlass | null> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/shotGlass/${Number(id)}`
  );

  if (!res.ok) throw new Error("Failed to fetch a shot glass");
  const result = await res.json();
  return result.data;
};
