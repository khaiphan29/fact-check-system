import { NextResponse } from "next/server";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
  const data: FactCheckGroupRequest = await request.json();

  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (!user) return notFoundResponse();

  const groups = await prisma.claim_group.findMany({
    where: {
      owner_id: user?.id,
    },
    orderBy: {
      modified_date: "desc",
    },
    select: {
      id: true,
      name: true,
    },
  });

  //console.log(groups)
  prisma.$disconnect;

  const response: FactCheckGroupResponse = {
    groupList: groups,
  };
  return new NextResponse(JSON.stringify(response));
}
