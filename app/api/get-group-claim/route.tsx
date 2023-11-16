import { NextResponse } from "next/server";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const data: GroupResultRequest = await request.json();

  const claims = await prisma.claim.findMany({
    where: {
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

  // const errorResponse: ErrorResponse = {
  //   msg: "Không thể"
  // }
  
  if (!claims.length) {
    return new Response(JSON.stringify({}), {
      status: 401,
    });
  }

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
