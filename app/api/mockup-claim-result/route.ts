import { NextResponse } from "next/server";
import { Prisma, PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

export async function POST(request: Request) {
  const data: ClaimResultRequest = await request.json();

  const results: ClaimResult[] = [];
  for (let i = 0; i < 20; i++) {
    results.push({
      id: i,
      rating: Math.floor(Math.random() * 3),
      claim:
        "@Aprillion - I'm afraid I'm still not getting it, possibly being a bit dense. :-) Why would you need an effect with just the initial array value? (I mean, there may be an infrequent use case, but...) And even if you do, what does it have to do with the question?",
    });
  }

  const response: ClaimResultResponse = {
    results: results,
  };

  return new NextResponse(JSON.stringify({ ...response }));
}
