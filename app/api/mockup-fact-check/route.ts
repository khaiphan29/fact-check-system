import { NextResponse } from "next/server";
import { AIResponse } from "@/types/global";

// const prisma = new PrismaClient();

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
  const final_label = Math.floor(Math.random() * 3);
  return new NextResponse(
    JSON.stringify(
      {
        "claim": "Tổng hợp tiền chất carbon và nitrogen nhằm tạo ra carbon nitride, hợp chất cứng hơn cubic boron nitride, hiện nay là vật liệu cứng thứ hai trên thế giới chỉ sau kim cương.",
        "final_label": 1,
        "evidence": "Ảnh: PA\nMột nhóm nhà khoa học quốc tế đứng đầu là các nhà nghiên cứu ở Trung tâm khoa học điều kiện cực hạn tại Đại học Edinburgh tạo ra đột phá mới khi tổng hợp tiền chất carbon và nitrogen nhằm tạo ra carbon nitride, hợp chất cứng hơn cubic boron nitride, hiện nay là vật liệu cứng thứ hai trên thế giới chỉ sau kim cương.\nKết quả phân tích hé lộ ba hợp chất carbon nitride tổng hợp có cấu trúc cần thiết đối với vật liệu siêu cứng.\nNgoài độ cứng, những hợp chất carbon nitride gần như không thể phá hủy này cũng có khả năng phát quang, áp điện và mật độ năng lượng cao, có thể lưu trữ lượng lớn năng lượng trong khối lượng nhỏ.\nDù giới khoa học nhận thấy tiềm năng của carbon nitride từ thập niên 1980, bao gồm khả năng chịu nhiệt cao, việc tạo ra chúng là một câu chuyện khác.\nNhóm nghiên cứu bao gồm nhiều chuyên gia vật liệu từ Đại học Bayreuth, Đức, và Đại học Linköping, Thụy Điển, đạt được thành tựu khi để các dạng khác nhau của tiền chất carbon nitrogen chịu áp suất 70 - 135 gigapascal (gấp khoảng một triệu lần áp suất khí quyển), đồng thời nung nóng chúng tới hơn 1.500 độ C. Sau đó, họ kiểm tra sắp xếp nguyên tử thông qua chùm tia X ở Cơ sở nghiên cứu Synchrotron châu Âu tại Pháp, Deutsches Elektronen - Synchrotron tại Đức và Advanced Photon Source tại Mỹ.",
        "provider": "vnexpress.net",
        "url": "https://vnexpress.net/vat-lieu-co-the-soan-ngoi-kim-cuong-ve-do-cung-4688566.html",
        "groupId": 1
      })
  );
}
