import { NextResponse } from "next/server";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// interface ResData {
//   id: string;
//   title: string;
// }

const randomTitle = [
  "Tin tuần",
  "Tin y tế",
  "Tin tháng 6",
  "Tin học đường",
  "Tin giả",
  "Tin ngày Tết",
  "Tin trong tuần 2 tháng 9",
  "Elon Musk sử dụng facebook",
  "Cách ăn cách bữa",
  "Một ngày có 24 giờ",
  "Chủ tịch nước thăm Tòa thánh Vatican, gặp Giáo hoàng Francis",
  "Ba con trai được ông Hun Sen coi là 'cố vấn chiến lược",
];

// export async function GET(request: Request) {
//   let cards: ResData[] = [];
//   for (let i = 0; i < 20; i++) {
//     cards.push({
//       id: i.toString(),
//       title: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe odio optio accusantium animi consequuntur totam dolor quae? Fugiat iste perspiciatis quam qui placeat, autem reiciendis sint ipsa voluptates nihil nam.`,
//     });
//   }
//   return new NextResponse(JSON.stringify({ data: cards }));
// }
// let cards: ResData[] = [];
// let counter = 1;
// for (let i = 1; i < 20; i++, counter++) {
//   const random = Math.floor(Math.random() * randomTitle.length);
//   cards.push({
//     id: i.toString(),
//     title: randomTitle[random],
//   });
// }
// cards.push({
//   id: counter.toString(),
//   title: "Kiểm Tin Nhanh",
// });
// counter++;

export async function POST(request: Request) {
  const data: { email: string } = await request.json();

  // console.log("email: ", data.email)
  if (!data.email) {
    return new NextResponse(JSON.stringify([]));
  }

  const user = await prisma.user.findFirst({
    where: {
      email: data.email,
    },
  });

  const groups = await prisma.claim_group.findMany({
    where: {
      owner_id: user?.id,
    },
    orderBy: {
      modified_date: "desc",
    },
  });

  //console.log(groups)

  return new NextResponse(JSON.stringify({ groups }));
}

export async function UPDATE(request: Request) {
  const data: { email: string; name: string } = await request.json();
  return new NextResponse(JSON.stringify({}));
}

