import { AccountFormData, AccountModRequest, RegisterRequest } from "@/types/global";
import prisma from "@/utils/prismaClient";

// const prisma = new PrismaClient();

export async function POST(request: Request) {
  const data: AccountModRequest = await request.json();

  await prisma.user.update({
    where: {
      email: data.old_email,
    },
    data: {
      username: data.username,
      email: data.email,
      password: data.password,
      name: data.name,
      role_id: Number(data.role_id),
      phone: data.phone,
    },
  });

  await prisma.$disconnect;

  return new Response(JSON.stringify({}));
}
