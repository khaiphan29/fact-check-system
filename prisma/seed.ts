import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  await prisma.role.createMany({
    data: [
      {
        id: 1,
        name: "user",
      },
      {
        id: 2,
        name: "admin",
      },
      {
        id: 3,
        name: "writer",
      },
      {
        id: 4,
        name: "evidence provider",
      },
      {
        id: 5,
        name: "data scientist",
      },
      {
        id: 6,
        name: "data staff",
      },
    ],
  });

  await prisma.user.createMany({
    data: [
      {
        id: 0,
        name: "Guest",
        username: "guest",
        email: "guest",
        password: "guest",
        role_id: 1,
      },
      {
        id: 1,
        name: "Admin",
        username: "admin",
        email: "admin",
        password: "admin123",
        role_id: 2,
      },
    ],
  });

  await prisma.claim_group.createMany({
    data: [
      {
        owner_id: 0,
        name: "Kiểm Tin Nhanh",
      },
      {
        owner_id: 1,
        name: "Kiểm Tin Nhanh",
      },
    ],
  });

  await prisma.feedback_topic.createMany({
    data: [
      {
        name: "Sai kết quả",
      },
      {
        name: "Đúng một phần",
      },
      {
        name: "Minh chứng có liên quan nhưng chữa rõ ràng",
      },
      {
        name: "Minh chứng không liên quan",
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
