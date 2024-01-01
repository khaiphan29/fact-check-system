import {
  ExternalScrapingRequest,
  RegisterRequest,
  ScrapingStatusResponse,
} from "@/types/global";
import prisma from "@/utils/prismaClient";

async function mockUpScraping(
  data: {
    id: number;
    name: string;
    scraping_url: string;
  }[]
) {
  return data.map((ele) => ({
    id: ele.id,
    name: ele.name,
    scraping_url: ele.scraping_url,
    status: Math.floor(Math.random() + 0.5) === 1 ? true : false,
  }));
}

async function exteralScrape(req: ExternalScrapingRequest) {
  const res = await fetch(process.env.SCRAPING_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  });
  if (res.ok) {
    const data: ScrapingStatusResponse = await res.json();
    return data;
  }
}

export async function POST(request: Request) {
  const scraping_list = await prisma.evidence_source.findMany({
    where: {},
    select: {
      id: true,
      name: true,
      scraping_url: true,
    },
  });

  const data = await exteralScrape({
    data: scraping_list,
  });

  const res_list = data?.list;

  for (let i = 0; i < res_list!.length; i++) {
    await prisma.scraping_history.create({
      data: {
        source_id: res_list![i].id,
        url: res_list![i].scraping_url,
        status: res_list![i].status,
      },
    });
  }

  const response: ScrapingStatusResponse = {
    list: data!.list,
  };

  return new Response(JSON.stringify(response));
}
