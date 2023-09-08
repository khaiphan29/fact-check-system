import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const data: { username: string; email: string; password: string } =
    await request.json();

  console.log("Creating new user ...");

  const user = await prisma.user.count({
    where: {
      OR: [
        {
          email: data.email,
        },
        {
          username: data.username,
        },
      ],
    },
  });

  if (user) {
    return new Response(
      JSON.stringify({
        msg: 0,
        data,
      })
    );
  }

  const newUser = await prisma.user.create({
    data: {
      username: data.username,
      email: data.email,
      password: data.password,
      role: "1",
    },
  });

  if (newUser) {
    return new Response(
      JSON.stringify({
        msg: 1,
        ...data,
      })
    );
  }
}
