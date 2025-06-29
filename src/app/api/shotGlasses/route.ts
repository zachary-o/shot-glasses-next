import { prisma } from "@/prisma";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const skip = parseInt(searchParams.get("skip") || "0", 10);
  const take = parseInt(searchParams.get("take") || "10", 10);
  const continents = searchParams.get("continents")?.split(",") || [];
  const countries = searchParams.get("countries")?.split(",") || [];
  const search = searchParams.get("search")?.trim() || "";
  const sortBy = searchParams.get("sortBy")?.trim() || "";
  const locale = searchParams.get("locale") || "en";
  const isLocaleEng = locale === "en";

  const where: Prisma.ShotGlassWhereInput = {};
  let orderBy: Prisma.ShotGlassOrderByWithRelationInput = {};

  if (continents.length > 0) {
    where.continentEng = { in: continents };
  }

  if (countries.length > 0) {
    where.countryEng = { in: countries };
  }

  if (search.length > 0) {
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

  if (sortBy) {
    const field = sortBy.replace(/(Asc|Desc)$/, "");
    const direction = sortBy.endsWith("Desc") ? "desc" : "asc";
    orderBy = {
      [isLocaleEng ? `${field}Eng` : `${field}Ukr`]: direction,
    };
  }

  const [data, total] = await Promise.all([
    prisma.shotGlass.findMany({ where, orderBy, skip, take }),
    prisma.shotGlass.count({ where }),
  ]);

  return NextResponse.json({
    data,
    hasMore: skip + take < total,
    nextSkip: skip + take,
  });
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const shotGlass = await prisma.shotGlass.create({
      data: {
        cityEng: data.cityEng,
        cityUkr: data.cityUkr,
        countryEng: data.countryEng,
        countryUkr: data.countryUkr,
        continentEng: data.continentEng,
        continentUkr: data.continentUkr,
        latitude: data.latitude,
        longitude: data.longitude,
        imageUrl: data.imageUrl,
      },
    });

    return NextResponse.json(shotGlass);
  } catch (error) {
    console.error("Error creating ShotGlass:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
