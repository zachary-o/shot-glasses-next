import { GetSearchParams } from "@/types";
import { ShotGlass } from "@prisma/client";

export const getAllShotGlasses = async (
  searchParams: GetSearchParams,
  locale: string
): Promise<ShotGlass[]> => {
  const queryParams = new URLSearchParams();

  Object.entries(searchParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (Array.isArray(value)) {
        queryParams.set(key, value.join(","));
      } else {
        queryParams.set(key, String(value));
      }
    }
  });

  queryParams.set("locale", locale);
  queryParams.set("skip", "0");
  queryParams.set("take", "10");

  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_SITE_URL
    }/api/shotGlasses?${queryParams.toString()}`
  );

  if (!res.ok) throw new Error("Failed to fetch initial shot glasses");
  const result = await res.json();
  return result.data;
};
