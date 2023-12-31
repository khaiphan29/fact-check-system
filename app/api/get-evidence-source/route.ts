import { NextResponse } from "next/server";
import prisma from "@/utils/prismaClient";
import {
  EvidenceSourcesRequest,
  EvidenceSourcesResponse,
} from "@/types/global";
import { notFoundResponse } from "@/utils/routeHandler";

export async function POST(request: Request) {
  const data: EvidenceSourcesRequest = await request.json();

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

  const evidence_sources = await prisma.evidence_source.findMany({
    where: {},
    select: {
      id: true,
      name: true,
      scraping_url: true,
      scraping_history: {
        select: {
          status: true,
        },
        orderBy: {
          created_date: "desc",
        },
        take: 1,
      },
    },
  });

  const response: EvidenceSourcesResponse = {
    sources: evidence_sources.map((ele) => ({
      id: ele.id,
      name: ele.name,
      scraping_url: ele.scraping_url,
      status: ele.scraping_history[0] ? ele.scraping_history[0].status : undefined,
    })),
  };

  prisma.$disconnect;
  return new NextResponse(JSON.stringify(response));
}
