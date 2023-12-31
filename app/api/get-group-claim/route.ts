import { NextResponse } from "next/server";
import prisma from "@/utils/prismaClient";
import { GroupResultRequest, GroupResultResponse } from "@/types/global";

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
      evidence: {
        select: {
          content: true,
          url: true,
          source: true,
        },
      },
      group_id: true,
    },
    orderBy: {
      created_date: "asc",
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
      groupId: ele.group_id,
      claim: ele.claim,
      rating: ele.label_tag,
      evidence: ele.evidence!.content,
      provider: ele.evidence!.source.name,
      url: ele.evidence!.url,
    })),
  };

  prisma.$disconnect;
  return new NextResponse(JSON.stringify(response));
}
