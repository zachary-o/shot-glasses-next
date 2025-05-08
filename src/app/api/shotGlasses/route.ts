import { NextRequest, NextResponse } from "next/server"
import { prisma } from "../../../../prisma/prisma-client"

export async function GET() {
  const shotGlasses = await prisma.shotGlass.findMany()
  return NextResponse.json(shotGlasses)
}

export async function POST(req: NextRequest) {
  const data = await req.json()

  const shotGlass = await prisma.shotGlass.create({
    data,
  })

  return NextResponse.json(shotGlass)
}
