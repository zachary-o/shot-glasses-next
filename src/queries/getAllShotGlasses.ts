import { GetSearchParams } from "@/types";
import { ShotGlass } from "@prisma/client";

export const getAllShotGlasses = async (
  searchParams: GetSearchParams,
  locale: string
): Promise<ShotGlass[]> => {
  const query = new URLSearchParams({
    ...searchParams,
    locale,
    skip: "0",
    take: "10",
  }).toString();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/shotGlasses?${query}`
  );
  if (!res.ok) throw new Error("Failed to fetch initial shot glasses");
  const result = await res.json();
  return result.data;
};
