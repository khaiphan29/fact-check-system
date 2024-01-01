import { AccountFormData, RegisterRequest } from "@/types/global";
import prisma from "@/utils/prismaClient";

// const prisma = new PrismaClient();

export async function POST(request: Request) {
  const data: {
    email: string;
  } = await request.json();

  await prisma.user.delete({
    where: {
      email: data.email,
      NOT: {
        role_id: 1,
      },
    },
  });

  await prisma.$disconnect;

  return new Response(JSON.stringify({}));
}
