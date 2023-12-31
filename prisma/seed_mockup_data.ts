import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

function generateRandomDate(from: Date, to: Date) {
  return new Date(
    from.getTime() + Math.random() * (to.getTime() - from.getTime())
  );
}

async function generateRandomClaim() {
  let created_date = generateRandomDate(new Date(2023, 0, 1), new Date());
  let isNegative = Math.floor(Math.random() * 2) ? true : false;
  await prisma.claim.create({
    data: {
      owner_id: 0,
      group_id: 0,
      claim: "seeding",
      label_tag: Math.floor(Math.random() * 3),
      created_date: created_date,
      evidence: {
        create: {
          provider_id: Math.floor(Math.random() * 10),
          content: "",
          url: "",
          created_date: created_date,
        },
      },
      feedback: {
        create: {
          isNegative: isNegative,
          isIncorrectRating: isNegative
            ? Math.floor(Math.random() * 2)
              ? true
              : false
            : false,
          isIncorrectEvidence: isNegative
            ? Math.floor(Math.random() * 2)
              ? true
              : false
            : false,
          content: "",
          created_date: created_date,
        },
      },
    },
  });
}

async function main() {
  for (let i = 1; i < 5000; i++) {
    await generateRandomClaim();
  }
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
