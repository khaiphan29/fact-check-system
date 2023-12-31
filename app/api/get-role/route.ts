import { NextResponse } from "next/server";
import prisma from "@/utils/prismaClient";
import {
  GetRoleRequest,
  GetRoleResponse,
} from "@/types/global";

export async function POST(request: Request) {
  const data: GetRoleRequest = await request.json();

  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
    select: {
      role: true,
    },
  });

  if (!user) {
    return new Response(JSON.stringify({}), {
      status: 401,
    });
  }

  const response: GetRoleResponse = {
    role: user.role!.name,
  };

  prisma.$disconnect;
  return new NextResponse(JSON.stringify(response));
}
