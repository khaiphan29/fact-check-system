import { NextResponse } from "next/server";
import prisma from "@/utils/prismaClient";
import {
  AccountListRequest,
  AccountListResponse,
  FeedBackListResponse,
  ScrapingHistoryResponse,
} from "@/types/global";
import { notFoundResponse } from "@/utils/routeHandler";

export async function POST(request: Request) {
  const data: { source_name: string } = await request.json();

  const history = await prisma.scraping_history.findMany({
    where: {
      source: {
        name: data.source_name,
      },
    },
  });

  const response: ScrapingHistoryResponse = {
    list: history.map((ele) => ({
      url: ele.url,
      status: ele.status,
      created_date: ele.created_date
    }))
  };

  prisma.$disconnect;
  return new NextResponse(JSON.stringify(response));
}
