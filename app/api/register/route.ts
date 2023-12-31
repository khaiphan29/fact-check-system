import prisma from "@/utils/prismaClient";

// const prisma = new PrismaClient();

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
    return new Response(JSON.stringify({ msg: "Người dùng đã tồn tại" }), {
      status: 409,
    });
  }

  const newUser = await prisma.user.create({
    data: {
      username: data.username,
      email: data.email,
      password: data.password,
      name: data.email,
      role_id: 1,
    },
  });

  await prisma.claim_group.create({
    data: {
      owner_id: newUser.id,
      name: "Kiểm Tin Nhanh",
    },
  });

  await prisma.$disconnect;

  if (newUser) {
    return new Response(
      JSON.stringify({
        ...data,
      })
    );
  }
}
