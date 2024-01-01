import { AccountFormData, RegisterRequest } from "@/types/global";
import prisma from "@/utils/prismaClient";

// const prisma = new PrismaClient();

export async function POST(request: Request) {
  const data: AccountFormData = await request.json();

  const newUser = await prisma.user.update({
    where: {
      email: data.email,
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
