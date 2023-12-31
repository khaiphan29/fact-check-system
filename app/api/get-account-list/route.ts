import { NextResponse } from "next/server";
import prisma from "@/utils/prismaClient";
import { AccountListRequest, AccountListResponse } from "@/types/global";
import { notFoundResponse } from "@/utils/routeHandler";

export async function POST(request: Request) {
  const data: AccountListRequest = await request.json();

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

  const user_list = await prisma.user.findMany({
    where: {},
    include: {
      role: true,
    },
  });

  const response: AccountListResponse = {
    accounts: user_list.map((ele) => ({
      name: ele.name,
      email: ele.email,
      username: ele.username,
      role: ele.role!.name,
      phone: ele.phone || "",
    })),
  };

  prisma.$disconnect;
  return new NextResponse(JSON.stringify(response));
}
