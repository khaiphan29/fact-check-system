import prisma from "@/utils/prismaClient";
import { NextResponse } from "next/server";

// const prisma = new PrismaClient();

export async function POST(request: Request) {
  const data: { id: number; name: string } = await request.json();

  if (data.name != "Kiểm Tin Nhanh") {
    const deleteGroup = await prisma.claim_group.delete({
      where: {
        id: Number(data.id),
      },
    });
  }

  return new NextResponse(JSON.stringify({}));
}
