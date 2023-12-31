import { NextResponse } from "next/server";
import prisma from "@/utils/prismaClient";
import {
  AccountListRequest,
  AccountListResponse,
  FeedBackListResponse,
} from "@/types/global";
import { notFoundResponse } from "@/utils/routeHandler";

export async function POST(request: Request) {
  const data: AccountListRequest = await request.json();

  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
    select: {
      role: true,
    },
  });

  if (!user || user!.role!.name === "user") {
    return notFoundResponse();
  }

  const feedback_list = await prisma.feedback.findMany({
    where: {},
  });

  const feedbackCount = await prisma.feedback.groupBy({
    by: ["isNegative"],
    _count: {
      id: true,
    },
  });

  const incorrectEvidenceCount = await prisma.feedback.aggregate({
    where: {
      isIncorrectEvidence: true,
    },
    _count: {
      id: true,
    },
  });

  const incorrectRatingCount = await prisma.feedback.aggregate({
    where: {
      isIncorrectRating: true,
    },
    _count: {
      id: true,
    },
  });

  const response: FeedBackListResponse = {
    list: feedback_list.map((ele) => ({
      id: ele.id,
      isPositive: !ele.isNegative ? "Có" : "Không",
      feedBackCheck: {
        isIncorrectEvidence: ele.isIncorrectEvidence ? "Có" : "Không",
        isIncorrectRating: ele.isIncorrectRating ? "Có" : "Không",
      },
      description: ele.content,
    })),
    summary: {
      positive_count: feedbackCount[1]._count.id,
      negative_count: feedbackCount[0]._count.id,
      wrong_evidence_count: incorrectEvidenceCount._count.id,
      wrong_rating_count: incorrectRatingCount._count.id,
    },
  };

  prisma.$disconnect;
  return new NextResponse(JSON.stringify(response));
}
