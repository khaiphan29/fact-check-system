import { NextResponse } from "next/server";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const data: {
    email: string;
    isQuick: boolean;
    groupId: number;
    claim: string;
  } = await request.json();
  //console.log(data);
  const claimNum = Number(data.claim);

  const user = await prisma.user.findFirst({
    where: {
      email: data.email,
    },
  });
  //console.log(user)

  let claimGroup: {
    id: number;
    owner_id: number | null;
    name: string | null;
    created_date: Date | null;
    modified_date: Date | null;
  } | null;

  if (data.isQuick) {
    claimGroup = await prisma.claim_group.findFirst({
      where: {
        AND: [{ owner_id: Number(user?.id) }, { name: "Kiểm Tin Nhanh" }],
      },
    });

    if (!claimGroup) {
      claimGroup = await prisma.claim_group.create({
        data: {
          owner_id: Number(user?.id),
          name: "Kiểm Tin Nhanh",
        },
      });
    }
  } else {
    claimGroup = await prisma.claim_group.findUnique({
      where: {
        id: data.groupId,
      },
    });

    if (!claimGroup) {
      claimGroup = await prisma.claim_group.create({
        data: {
          owner_id: Number(user?.id),
          name: data.claim,
        },
      });
    }
  }

  const rating: number =
    claimNum < 4 && claimNum > 0 ? claimNum : Math.floor(Math.random() * 3 + 1);

  const evidenceId = Math.floor(Math.random() + 1.5);
  const evidence = await prisma.evidence.findUnique({
    where: {
      id: evidenceId,
    },
  });

  const url: string = evidence!.url!;
  const provider = await prisma.user.findUnique({
    where: {
      id: evidence?.owner_id!,
    },
  });

  const createClaim = await prisma.claim.create({
    data: {
      claim: data.claim,
      result_tag: rating,
      evidence_id: evidence?.id,
      group_id: Number(claimGroup?.id),
      owner_id: Number(user?.id),
    },
  });

  await prisma.claim_group.update({
    where: {
      id: claimGroup?.id,
    },
    data: {
      modified_date: new Date(),
    },
  });

  const response = JSON.stringify({
    rating: rating,
    claim: data.claim,
    fact: evidence!.evidence!,
    url: evidence?.url!,
    provider: provider?.name!,
    groupId: claimGroup?.id,
  });

  //console.log("Fact Checking...", response);

  return new NextResponse(response);
}
