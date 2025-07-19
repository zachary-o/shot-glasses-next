import { prisma } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const data = await prisma.shotGlass.findUnique({
    where: { id: Number(id) },
  });

  if (!data) {
    return NextResponse.json({ error: "ShotGlass not found" }, { status: 404 });
  }

  return NextResponse.json(data);
}
