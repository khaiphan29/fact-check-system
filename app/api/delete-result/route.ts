 import { NextResponse } from "next/server";
import prisma from "@/utils/prismaClient";
import { DeleteResultRequest } from "@/types/global";

import { notFoundResponse } from "@/utils/routeHandler";

export async function POST(request: Request) {
  const data: DeleteResultRequest = await request.json();

  const updatedClaim = await prisma.claim.update({
    where: {
        id: data.claimId
    },
    data: {
        owner_id: 0,
        group_id: 1,
    }
  })

  if (!updatedClaim) {
    return notFoundResponse();
  }

  prisma.$disconnect;
  return new NextResponse(JSON.stringify({}));
}
