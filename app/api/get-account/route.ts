import { AccountFormData } from "@/types/global";
import prisma from "@/utils/prismaClient";
import { notFoundResponse } from "@/utils/routeHandler";

// const prisma = new PrismaClient();

export async function POST(request: Request) {
  const data: { email: string } = await request.json();

  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (!user) {
    return notFoundResponse();
  }

  const response: AccountFormData = {
    email: user?.email!,
    username: user.username,
    name: user.name,
    role_id: user.role_id.toString(),
    phone: user.phone ? user.phone : "",
    password: user.password,
  };

  await prisma.$disconnect;

  return new Response(JSON.stringify(response));
}
