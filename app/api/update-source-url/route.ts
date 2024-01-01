import prisma from "@/utils/prismaClient";
import { notFoundResponse } from "@/utils/routeHandler";

// const prisma = new PrismaClient();

export async function POST(request: Request) {
  const data: {
    id: number;
    source: string;
    url: string;
  } = await request.json();

  if (data.url.split("/").length < 3 || data.url.split("/")[2] != data.source) {
    return notFoundResponse();
  }

  await prisma.evidence_source.update({
    where: {
      id: data.id,
    },
    data: {
      scraping_url: data.url,
    },
  });

  await prisma.$disconnect;

  return new Response(JSON.stringify({}));
}
