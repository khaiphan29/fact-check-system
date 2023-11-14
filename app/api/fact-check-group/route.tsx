import { NextResponse } from "next/server";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const data: { email: string } = await request.json();

  // console.log("email: ", data.email)
  if (!data.email) {
    return new NextResponse(JSON.stringify([]));
  }

  const user = await prisma.user.findFirst({
    where: {
      email: data.email,
    },
  });

  const groups = await prisma.claim_group.findMany({
    where: {
      owner_id: user?.id,
    },
    orderBy: {
      modified_date: "desc",
    },
  });

  //console.log(groups)

  return new NextResponse(JSON.stringify({ groups }));
}