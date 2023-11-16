import { NextResponse } from "next/server";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const data: SingleClaimRequest = await request.json();

  const claims = await prisma.claim.findFirst({
    where: {
      id: data.claimId,
      user: {
        email: data.email,
      },
    },
    include: {
      evidence: {
        select: {
          evidence_claim: true,
          evidence: true,
        },
      },
    },
  });

  const response: SingleClaimResponse = {
    final_label: claims!.label_tag,
    evidences: claims!.evidence.map((ele) => ({
      claim: ele.evidence_claim,
      evidence: ele.evidence,
    })),
    claim: claims!.claim,
    url: "empty",
    provider: "HCMUT",
    groupId: claims!.group_id,
    claimId: claims!.id,
  };

  prisma.$disconnect;
  return new NextResponse(JSON.stringify(response));
}
