import { Prisma, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function POST(request: Request) {
  const data: { id: number } = await request.json();
  console.log("Detete");
  console.log(data);
  const deleteGroup = await prisma.claim_group.delete({
    where: {
      id: Number(data.id),
    },
  });

  return new NextResponse(JSON.stringify({}));
}
