import { NextResponse } from "next/server";
import prisma from "@/utils/prismaClient";
import { FeedBackRequest } from "@/types/global";

import { notFoundResponse } from "@/utils/routeHandler";

export async function POST(request: Request) {
  const data: FeedBackRequest = await request.json();

  const newFeedback = await prisma.feedback.create({
    data: {
      claim_id: data.claimId,
      isNegative: data.isNegative,
      isIncorrectEvidence: data.feedBackCheck.isIncorrectEvidence,
      isIncorrectRating: data.feedBackCheck.isIncorrectRating,
      content: data.description,
    },
  });

  if (!newFeedback) {
    return notFoundResponse();
  }

  prisma.$disconnect;
  return new NextResponse(JSON.stringify({}));
}
