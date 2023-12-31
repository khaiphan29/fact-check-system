import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { parseArgs } from "node:util";

function generateRandomDate(from: Date, to: Date) {
  const randomDate = new Date(
    from.getTime() + Math.random() * (to.getTime() - from.getTime())
  );
  return new Date(
    randomDate.getFullYear(),
    randomDate.getMonth(),
    randomDate.getDay() + 1,
    Math.floor(Math.random() * 24)
  );
}

async function generateRandomClaim() {
  let created_date = generateRandomDate(new Date(2023, 0, 1), new Date());
  console.log(created_date.toString());
  let isNegative = Math.floor(Math.random() * 2) ? true : false;
  await prisma.claim.create({
    data: {
      owner_id: 0,
      group_id: 1,
      claim: "seeding",
      label_tag: Math.floor(Math.random() * 3),
      created_date: created_date,
      evidence: {
        create: {
          provider_id: Math.floor(Math.random() * 10) + 1,
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

async function initializedRecords() {
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
        name: "data scientist",
      },
      {
        id: 4,
        name: "system staff",
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
        name: "Sai minh chứng",
      },
    ],
  });

  await prisma.evidence_source.createMany({
    data: [
      {
        name: "thanhnien.vn",
        scraping_url:
          "https://thanhnien.vn/horea-kien-nghi-ngan-hang-lam-viec-2-ngay-cuoi-nam-185231229144442162.htm",
      },
      {
        name: "tuoitre.vn",
        scraping_url:
          "https://tuoitre.vn/gia-vang-tang-giam-dien-cuong-lai-lo-3-trieu-dong-luong-chi-trong-tich-tac-20231229100525539.htm",
      },
      {
        name: "vietnamnet.vn",
        scraping_url:
          "https://vietnamnet.vn/nhung-dau-an-noi-bat-cua-nganh-tt-tt-trong-nam-2023-2232698.html",
      },
      {
        name: "vnexpress.net",
        scraping_url:
          "https://vnexpress.net/40-cong-trinh-giao-thong-o-tp-hcm-se-hoan-thanh-nam-2024-4694940.html",
      },
      {
        name: "www.24h.com.vn",
        scraping_url:
          "https://www.24h.com.vn/tin-tuc-quoc-te/cac-nuoc-dong-nam-a-ap-dung-bien-phap-phong-dich-nhu-the-nao-c415a1268086.html",
      },
      {
        name: "vov.vn",
        scraping_url:
          "https://vov.vn/du-lich/nhu-cau-du-lich-nuoc-ngoai-tang-vot-khi-trung-quoc-buoc-vao-cac-ky-nghi-lon-post1068601.vov",
      },
      {
        name: "vtv.vn",
        scraping_url:
          "https://vtv.vn/kinh-te/giam-thue-2-thue-vat-den-thang-6-2024-20231229152639738.htm",
      },
      {
        name: "vi.wikipedia.org",
        scraping_url: "https://vi.wikipedia.org/wiki/Vi%E1%BB%87t_Nam",
      },
      {
        name: "www.vinmec.com",
        scraping_url:
          "https://www.vinmec.com/vi/tin-tuc/thong-tin-suc-khoe/sot-loi-hay-hai-co-nhat-thiet-phai-ha-sot-khong/",
      },
      {
        name: "vietstock.vn",
        scraping_url:
          "https://vietstock.vn/2023/12/nam-2023-vn-index-tang-hon-12-von-hoa-thi-truong-tang-gan-30-ty-usd-830-1138117.htm",
      },
      {
        name: "vneconomy.vn",
        scraping_url:
          "https://vneconomy.vn/vcb-dot-ngot-bi-ep-manh-vn-index-that-bai-tai-moc-1-130-diem.htm",
      },
      {
        name: "dantri.com.vn",
        scraping_url:
          "https://dantri.com.vn/kinh-doanh/nong-novaland-duoc-gia-han-2-lo-trai-phieu-dau-tien-tong-1750-ty-dong-20230324150955842.htm",
      },
    ],
  });
}

const options = {
  seed_option: {
    type: "string",
    short: "o",
  },
} as const;

async function main() {
  const {
    values: { seed_option },
  } = parseArgs({ options });

  switch (seed_option) {
    case "gen-record":
      for (let i = 1; i < 5000; i++) {
        await generateRandomClaim();
      }
      break;

    default:
      await initializedRecords();
      break;
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
