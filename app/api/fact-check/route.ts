import { NextResponse } from "next/server";
import { Prisma, PrismaClient } from "@prisma/client";
import { fetchModelResult } from "@/utils/aiUtils";

const prisma = new PrismaClient();

async function writeResult(
  userId: number,
  groupId: number,
  claim: string,
  labelTag: number,
  evidenceLists: EvidenceResult[]
) {
  const evidenceData: { evidence_claim: string; evidence: string }[] =
    evidenceLists.map(({ claim, evidence }) => ({
      evidence_claim: claim,
      evidence: evidence,
    }));

  await prisma.claim.create({
    data: {
      owner_id: userId,
      group_id: groupId,
      claim: claim,
      label_tag: labelTag,
      evidence: {
        createMany: {
          data: evidenceData,
        },
      },
    },
  });
}

function notFoundResponse() {
  return new Response(
    JSON.stringify({
      msg: "Không xác định người dùng hoặc nhóm tin",
    }),
    {
      status: 404,
    }
  );
}

export async function POST(request: Request) {
  // const data = await request.json();
  const data: FactCheckRequest = await request.json();

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

    writeResult(
      user!.id,
      claimGroup!.id,
      data.claim,
      aiData.final_label,
      aiData.evidences
    );

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
      claim: data.claim,
      url: "https://hcmut.edu.vn/",
      provider: "HCMUT",
      groupId: claimGroup!.id,
    };

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
