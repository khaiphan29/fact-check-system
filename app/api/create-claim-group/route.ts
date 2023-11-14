import { NextResponse } from "next/server";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const data: CreateClaimGroupRequest = await request.json();

  const user = await prisma.user.findFirst({
    where: {
      email: data.email,
    },
  });

  const newGroup = await prisma.claim_group.create({
    data: {
      owner_id: user?.id,
      name: data.name,
    },
  });

  //console.log(groups)

  return new NextResponse(
    JSON.stringify({ id: newGroup.id, name: newGroup.name })
  );
}
