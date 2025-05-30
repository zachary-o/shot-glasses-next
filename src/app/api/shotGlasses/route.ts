import { prisma } from "@/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function GET() {
  const shotGlasses = await prisma.shotGlass.findMany()
  return NextResponse.json(shotGlasses)
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()

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
    })

    return NextResponse.json(shotGlass)
  } catch (error) {
    console.error("Error creating ShotGlass:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
