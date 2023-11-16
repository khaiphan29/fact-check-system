import { NextResponse } from "next/server";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const data: GroupResultRequest = await request.json();

  const claims = await prisma.claim.findMany({
    where: {
      // AND: [
      //   {
      //     user: {
      //       email: data.email,
      //     },
      //   },
      //   {
      //     claim_group: {
      //       id: data.groupId,
      //     },
      //   },
      // ],
      user: {
        email: data.email,
      },
      claim_group: {
        id: data.groupId,
      },
    },
    select: {
      id: true,
      label_tag: true,
      claim: true,
    },
    orderBy: {
      created_date: "desc",
    },
  });

  const response: GroupResultResponse = {
    claimList: claims.map((ele) => ({
      id: ele.id,
      claim: ele.claim,
      rating: ele.label_tag,
    })),
  };

  prisma.$disconnect;
  return new NextResponse(JSON.stringify(response));
}
