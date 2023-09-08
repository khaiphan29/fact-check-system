import { NextResponse } from "next/server";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
interface ResData {
  id: string;
  rating: number;
  claim: string;
  evidence: string;
  evidence_provider: string;
  url: string;
}

const randomResult = [
  {
    rating: 1,
    claim: "Chủ tịch nước thăm Tòa thánh Vatican, gặp Giáo hoàng Francis",
    evidence: `Tại các cuộc hội kiến giữa Chủ tịch nước Võ Văn Thưởng với Giáo hoàng Francis và Thủ tướng Tòa thánh, Hồng y Pietro Parolin ngày 27/7, hai bên đánh giá cao tiến triển trong quan hệ Việt Nam - Tòa thánh và hoạt động của cộng đồng Công giáo Việt Nam. Việt Nam và Tòa thánh Vatican thông qua Thỏa thuận Quy chế hoạt động của Đại diện thường trú và Văn phòng Đại diện thường trú Tòa thánh tại Việt Nam, theo thông cáo hôm nay của Bộ Ngoại giao.`,
    evidence_provider: "VnExpress",
    url: "https://vnexpress.net/ba-con-trai-duoc-ong-hun-sen-coi-la-co-van-chien-luoc-4634486.html",
  },
  {
    rating: 0,
    claim: "Chủ tịch nước thăm Tòa thánh Vatican rồi uống nước mía",
    evidence: "",
    evidence_provider: "",
    url: "",
  },
  {
    rating: 1,
    claim: "Ba con trai được ông Hun Sen coi là 'cố vấn chiến lược",
    evidence: `Thủ tướng Campuchia Hun Sen đặt niềm tin tuyệt đối vào ba người con trai, trong đó con trai cả Hun Manet được ông chọn để kế nhiệm.

    "Tôi có 10 cố vấn quanh mình, nhưng ba con trai tôi là những cố vấn chiến lược thân cận nhất. Chúng tôi thường xuyên trao đổi quan điểm và cùng nhau phân tích mọi thứ", Thủ tướng Campuchia Hun Sen tiết lộ trong một sự kiện hồi năm 2021, đề cập đến ba "quý tử" là Hun Manet, Hun Manith và Hun Many.`,
    evidence_provider: "VnExpress",
    url: "https://vnexpress.net/ba-con-trai-duoc-ong-hun-sen-coi-la-co-van-chien-luoc-4634486.html",
  },
  {
    rating: 2,
    claim: "Không nên hạn chế đồ uống lạnh trong bữa ăn",
    evidence: `Việc hạn chế uống chất lỏng trong bữa ăn sẽ giúp ngừng pha loãng các enzym tiêu hóa, vốn rất quan trọng để tiêu hóa hợp lý. Trà xanh hoặc các loại trà nóng khác uống trước bữa ăn sẽ hỗ trợ hoạt động của enzym và giúp tăng cường khả năng tiêu hóa. Tốt nhất nên bổ sung chất lỏng trước hoặc sau bữa ăn 30 phút, không nên uống trong khi ăn.`,
    evidence_provider: "VnExpress",
    url: "https://vnexpress.net/6-cach-an-cua-nguoi-chau-a-giup-voc-dang-thon-tha-4632609.html",
  },
  {
    rating: 2,
    claim: "Ăn theo tỷ lệ 1:3 rau so với thịt",
    evidence: `Lượng rau nên gấp ba lần lượng thịt. Các loại rau củ có vị đắng như củ cải, mướp đắng được khuyên dùng.`,
    evidence_provider: "VnExpress",
    url: "https://vnexpress.net/6-cach-an-cua-nguoi-chau-a-giup-voc-dang-thon-tha-4632609.html",
  },
  {
    rating: 1,
    claim: "Nên kết hợp ăn nhiều loại gạo",
    evidence: `Thói quen của người châu Á là trong bữa ăn phải có cơm chế biến từ gạo, gồm gạo trắng, nâu, đen, đỏ hoặc thậm chí màu tím. Để giảm cân và tránh ảnh hưởng đến chỉ số đường huyết, hàm lượng tinh bột từ gạo nạp vào cơ thể cần hạn chế hơn mức bình thường. Ngoài ra, loại gạo tốt nhất nên sử dụng là loại chưa đánh bóng hoặc ít chế biến để có hàm lượng vitamin B cao.`,
    evidence_provider: "VnExpress",
    url: "https://vnexpress.net/6-cach-an-cua-nguoi-chau-a-giup-voc-dang-thon-tha-4632609.html",
  },
  {
    rating: 2,
    claim: "Chỉ nên ăn gạo trắng",
    evidence: `Thói quen của người châu Á là trong bữa ăn phải có cơm chế biến từ gạo, gồm gạo trắng, nâu, đen, đỏ hoặc thậm chí màu tím. Để giảm cân và tránh ảnh hưởng đến chỉ số đường huyết, hàm lượng tinh bột từ gạo nạp vào cơ thể cần hạn chế hơn mức bình thường. Ngoài ra, loại gạo tốt nhất nên sử dụng là loại chưa đánh bóng hoặc ít chế biến để có hàm lượng vitamin B cao.`,
    evidence_provider: "VnExpress",
    url: "https://vnexpress.net/6-cach-an-cua-nguoi-chau-a-giup-voc-dang-thon-tha-4632609.html",
  },
  {
    rating: 0,
    claim: "Ăn gạo giúp con người tỉnh táo làm việc",
    evidence: "",
    evidence_provider: "",
    url: "",
  },
  {
    rating: 1,
    claim: "Việc làm chín giá đỗ trước khi ăn sẽ giúp tăng khả năng tiêu hóa",
    evidence: `Ngoài ra, việc làm chín giá đỗ trước khi ăn sẽ giúp tăng khả năng tiêu hóa. Đặc biệt, với người có đường ruột yếu, nhạy cảm, ăn giá sống có thể gây đầy bụng, tiêu chảy.

    "Làm chín giá sẽ giúp phòng ngừa ngộ độc thực phẩm và cải thiện khả năng tiêu hóa. Tuy nhiên, việc tiếp xúc với nhiệt cũng sẽ làm mất một số chất dinh dưỡng như vitamin C", bác sĩ Canday thông tin.`,
    evidence_provider: "VnExpress",
    url: "https://vnexpress.net/nen-an-gia-do-song-hay-chan-qua-nuoc-soi-4630495.html",
  },
  {
    rating: 2,
    claim:
      "Khuyến khích phụ nữ mang thai, trẻ em và người già nên ăn giá sống.",
    evidence: `Bà Canday cũng khuyến cáo phụ nữ mang thai, trẻ em và người già nên cẩn thận hơn với việc ăn giá sống. Nguyên nhân là các triệu chứng ngộ độc thực phẩm, nôn mửa và tiêu chảy do giá sống có thể dẫn đến nhiều vấn đề sức khỏe đối với nhóm này.`,
    evidence_provider: "VnExpress",
    url: "https://vnexpress.net/nen-an-gia-do-song-hay-chan-qua-nuoc-soi-4630495.html",
  },
  {
    rating: 0,
    claim: "Người già dùng ChatGPT giúp minh mẫn đầu óc",
    evidence: ``,
    evidence_provider: "",
    url: "",
  },
  {
    rating: 0,
    claim: "Người già dùng ChatGPT để sống lâu",
    evidence: ``,
    evidence_provider: "",
    url: "",
  },
  {
    rating: 1,
    claim: "Lợi nhuận chủ hãng bia Sài Gòn giảm mạnh",
    evidence: `Chủ hãng bia Sài Gòn - Sabeco - lãi hơn 1.200 tỷ đồng trong quý II, nhỉnh hơn quý đầu năm nhưng giảm 32% so với cùng kỳ năm ngoái - giai đoạn công ty lập kỷ lục lợi nhuận.`,
    evidence_provider: "VnExpress",
    url: "https://vnexpress.net/loi-nhuan-chu-hang-bia-sai-gon-giam-manh-4634409.html",
  },
];

export async function POST(request: Request) {
  const data: { groupId: number; email: string } = await request.json();

  //console.log(data)

  if (!data.groupId || !data.email) {
    return new NextResponse(JSON.stringify({ claims: [] }));
  }

  const claims = await prisma.claim.findMany({
    where: {
      AND: [
        {
          user: {
            email: data.email,
          },
        },
        {
          claim_group: {
            id: data.groupId,
          },
        },
      ],
    },
  });

  // console.log(data, claims);

  let ret = [];
  for (let i = 0; i < claims.length; i++) {
    const evidence = await prisma.evidence.findFirst({
      where: {
        id: claims[i].evidence_id!,
      },
    });

    const evidence_provider = await prisma.user.findFirst({
      where: {
        id: evidence?.owner_id!,
      },
    });

    ret.push({
      ...claims[i],
      rating: claims[i].result_tag!,
      evidence_provider: evidence_provider?.name!,
      evidence: evidence?.evidence!,
      url: evidence?.url!,
    });
  }

  // console.log(JSON.stringify({ claims: ret }))

  return new NextResponse(JSON.stringify({ claims: ret }));
}
