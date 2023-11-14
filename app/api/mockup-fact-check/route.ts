import { NextResponse } from "next/server";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getResult(claim: string) {
  const res: Response = await fetch(process.env.AI_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      claim: claim,
    }),
  });

  const data: AIResponse = await res.json();
  return data;
}

export async function POST(request: Request) {
  console.log("Mockup Request Handling...");
  return new NextResponse(
    JSON.stringify({
        "claim": "Vé máy bay dịp Tết vẫn tăng phi mã, khiến giá khứ hồi bằng cả một tour trọn gói đi nước ngoài, đặt ra bài toán khó với ngành du lịch trong nước.",
        "final_label": 1,
        "evidences": [
          {
            "claim": "Vé máy bay dịp Tết vẫn tăng phi mã, khiến giá khứ hồi bằng cả một tour trọn gói đi nước ngoài, đặt ra bài toán khó với ngành du lịch trong nước.",
            "evidence": "Vì người dân chưa mặn mà mua vé máy bay đi lại trong dịp Tết Nguyên đán nên các đại lý vé máy bay lớn cũng chưa dám gom vé Tết như mọi năm."
          },
          {
            "claim": "Vé máy bay dịp Tết vẫn tăng phi mã, khiến giá khứ hồi bằng cả một tour trọn gói đi nước ngoài, đặt ra bài toán khó với ngành du lịch trong nước.",
            "evidence": "Những năm trước, năm nào gần Tết gia đình anh cũng đặt vé máy bay khứ hồi cho 4 người gồm 2 vợ chồng và 2 con để về quê vừa đón Tết, vừa thăm gia đình, đồng thời cũng là thời gian nghỉ dưỡng, tham quan một số địa điểm du lịch tại Quảng Ninh, Phú Thọ, Hà Nam, Ninh Bình…Chỉ tính riêng tiền vé may bay khứ hồi dành cho 4 người lớn cũng lên đến hơn 20 triệu đồng."
          },
          {
            "claim": "Vé máy bay dịp Tết vẫn tăng phi mã, khiến giá khứ hồi bằng cả một tour trọn gói đi nước ngoài, đặt ra bài toán khó với ngành du lịch trong nước.",
            "evidence": "Ví dụ, hành trình khứ hồi TP.HCM - Hà Nội của Vietjet Air giá rẻ nhất đang ở mức 3,7 triệu đồng (đã bao gồm thuế phí)."
          },
          {
            "claim": "Vé máy bay dịp Tết vẫn tăng phi mã, khiến giá khứ hồi bằng cả một tour trọn gói đi nước ngoài, đặt ra bài toán khó với ngành du lịch trong nước.",
            "evidence": "Tuy vậy, tránh tình trạng mua vé rồi lại hủy để mua vé rẻ hơn gần 50% như những năm trước, dẫn đến mất chi phí hủy chuyến lên đến 600.000 đồng."
          },
          {
            "claim": "Vé máy bay dịp Tết vẫn tăng phi mã, khiến giá khứ hồi bằng cả một tour trọn gói đi nước ngoài, đặt ra bài toán khó với ngành du lịch trong nước.",
            "evidence": "Hành khách cũng đã quen với tâm lý mua vé máy bay Tết sát ngày, vì rút kinh nghiệm năm 2021, nhiều người hớ do đặt sớm vé máy bay Tết 2021."
          },
          {
            "claim": "Vé máy bay dịp Tết vẫn tăng phi mã, khiến giá khứ hồi bằng cả một tour trọn gói đi nước ngoài, đặt ra bài toán khó với ngành du lịch trong nước.",
            "evidence": "Hành khách không nên đặt mua vé sớm, khi nào đi thì mua để có thể được hưởng chính sách ưu đãi, giảm giá."
          },
          {
            "claim": "Vé máy bay dịp Tết vẫn tăng phi mã, khiến giá khứ hồi bằng cả một tour trọn gói đi nước ngoài, đặt ra bài toán khó với ngành du lịch trong nước.",
            "evidence": "Đây là một trong những nguyên nhân dẫn đến lượng vé bán ra của các đại lý, các hãng bay chưa được nhiều."
          },
          {
            "claim": "Vé máy bay dịp Tết vẫn tăng phi mã, khiến giá khứ hồi bằng cả một tour trọn gói đi nước ngoài, đặt ra bài toán khó với ngành du lịch trong nước.",
            "evidence": "Nhân viên của nhiều đại lý cho biết, tuy đã mở bán vé Tết phục vụ hành khách từ hơn 1 tháng nay nhưng số lượng vé bán ra rất thấp, chỉ đạt khoảng 30-35% so với cùng thời điểm những năm trước."
          }
        ],
        "url": "https://hcmut.edu.vn/",
        "provider": "HCMUT",
        "groupId": 0
      })
  );
}
