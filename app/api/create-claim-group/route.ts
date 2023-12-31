import { NextResponse } from "next/server";
import prisma from "@/utils/prismaClient";
import { CreateClaimGroupRequest } from "@/types/global";

// const prisma = new PrismaClient();

export async function POST(request: Request) {
  const data: CreateClaimGroupRequest = await request.json();

  console.log("Creating new group");

  const user = await prisma.user.findFirst({
    where: {
      email: data.email,
    },
  });

  const newGroup = await prisma.claim_group.create({
    data: {
      owner_id: user?.id,
      name: data.groupName,
    },
  });

  //console.log(groups)

  return new NextResponse(
    JSON.stringify({ id: newGroup.id, name: newGroup.name })
  );
}
