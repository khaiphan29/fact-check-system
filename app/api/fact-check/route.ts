import { NextResponse } from "next/server";
import prisma from "@/utils/prismaClient";
import { fetchModelResult } from "@/utils/aiUtils";
import { notFoundResponse } from "@/utils/routeHandler";
import {
  AIResponse,
  FactCheckRequest,
  FactCheckResponse,
} from "@/types/global";

// const prisma = new PrismaClient();

async function writeResult(
  userId: number,
  groupId: number,
  claim: string,
  labelTag: number,
  evidence: string,
  provider: string,
  url: string
): Promise<number> {
  const evidenceData: {
    content: string;
    provider: string;
    url: string;
  } = {
    content: evidence,
    provider: provider,
    url: url,
  };

  const source = await prisma.evidence_source.findUnique({
    where: {
      name: provider,
    },
  });

  if (!source) return -1;

  const newClaim = await prisma.claim.create({
    data: {
      owner_id: userId,
      group_id: groupId,
      claim: claim,
      label_tag: labelTag,
      evidence: {
        create: {
          content: evidence,
          provider_id: source?.id,
          url: url,
        },
      },
    },
  });
  return newClaim.id;
}

export async function POST(request: Request) {
  // const data = await request.json();
  const data: FactCheckRequest = await request.json();

  console.log(data);

  const groupQueryData = data.isQuick
    ? {
        name: "Kiểm Tin Nhanh",
      }
    : {
        id: data.groupId,
      };

  const claimGroup = await prisma.claim_group.findFirst({
    where: {
      ...groupQueryData,
      user: {
        email: data.email,
      },
    },
    select: {
      id: true,
    },
  });

  if (!claimGroup) return notFoundResponse();

  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
    select: {
      id: true,
    },
  });

  if (!user) return notFoundResponse();

  try {
    const aiData: AIResponse = await fetchModelResult(data.claim);

    const claimID = await writeResult(
      user!.id,
      claimGroup!.id,
      data.claim,
      aiData.final_label,
      aiData.evidence,
      aiData.provider,
      aiData.url
    );

    if (claimID === -1) return notFoundResponse()

    await prisma.claim_group.update({
      where: {
        id: claimGroup.id,
      },
      data: {
        modified_date: new Date(),
      },
    });

    const response: FactCheckResponse = {
      ...aiData,
      claimId: claimID,
      claim: data.claim,
      groupId: claimGroup!.id,
    };

    console.log("FACT_CHECK RESULT:");
    console.log(response);

    prisma.$disconnect();
    return new NextResponse(JSON.stringify({ ...response }));
  } catch (e) {
    const error = e as Error;
    prisma.$disconnect();
    return new Response(
      JSON.stringify({
        msg: error.message,
      }),
      {
        status: 404,
      }
    );
  }
}
