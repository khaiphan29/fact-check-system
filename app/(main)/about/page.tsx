import React from "react";
import Link from "next/link";
import {
  HiGlobeAlt,
  HiRectangleStack,
  HiMiniArrowLongDown,
  HiCubeTransparent,
  HiFunnel,
  HiCog,
} from "react-icons/hi2";

const About = () => {
  return (
    <div className="border-t border-solid border-opacity-20 my-12 text-lg font-light">
      <div className="mt-2 flex">
        <div className="w-[300px] font-bold">BK Fact Check</div>
        <div className="font-semibold w-[300px]">
          Phát Triển Ứng Dụng{" "}
          <span className="block font-light">Phan Tuấn Khải</span>{" "}
          <span className="block font-light">Bùi Hữu Tài</span>
        </div>
        <div className="font-semibold w-[300px]">
          Phát Triển Model Kiểm Tin{" "}
          <span className="block font-light">Trần Thắm</span>{" "}
        </div>
        <div className="font-semibold w-[300px]">
          Giảng Viên Hướng Dẫn{" "}
          <span className="block font-light">Phó Giáo Sư Quản Thành Thơ</span>{" "}
        </div>
      </div>

      <div className="ml-[300px] w-[700px] mt-20">
        BK Fact Check là dự án thuộc khoa Máy Tính trường đại học Bách Khoa. Hệ
        thống sử dụng AI để tự động hoá việc kiểm tra tính xác thực những mẫu
        tin nhằm đáp ứng nhu cầu kiểm tra tin giả của người Việt trong bối cảnh
        chưa có nhiều công cụ để kiểm tra mẫu tin, đặc biệt là công cụ hỗ trợ
        tiếng Việt.
        <div className="mt-6">
          Chúng tôi giới thiệu ứng dụng BK Fact Check để nhận đánh giá đóng góp
          từ người dùng và để đánh giá về điểm mạnh và yếu của ứng dụng cũng như
          model trong vận hành. Thử ngay tại{" "}
          <Link href={process.env.SERVERHOST!}></Link>{" "}
          <span className="cursor-pointer underline">
            {process.env.SERVERHOST!.split("/")[2]}
          </span>
        </div>
      </div>

      <div className="ml-[300px] w-fit mt-20">
        <h1 className="font-semibold text-2xl">Quy Trình Kiểm Tin Hoạt Động</h1>
        <div className="w-[700px] mt-6">
          Kiểm Tin hoạt động dựa trên 5 bước chính được mô tả như sau:
        </div>
        <div className="mt-6 flex flex-col items-center">
          <div className="p-3 w-64 rounded-xl text-center bg-neutral_1 bg-opacity-50">
            <HiGlobeAlt size={40} className="m-auto mb-2" />
            Khai thác URL từ kết quả của công cụ tìm kiếm
          </div>
          <div>
            <HiMiniArrowLongDown
              size={20}
              className="h-16 scale-y-[2] scale-x-[2] text-neutral_2"
            />
          </div>
          <div className="p-3 w-64 rounded-xl text-center bg-neutral_1 bg-opacity-50">
            <HiRectangleStack size={40} className="m-auto mb-2" />
            Đào dữ liệu từ các bài viết ở các URL được khai thác
          </div>
          <div>
            <HiMiniArrowLongDown
              size={20}
              className="h-16 scale-y-[2] scale-x-[2] text-neutral_2"
            />
          </div>
          <div className="p-3 w-64 rounded-xl text-center bg-neutral_1 bg-opacity-50">
            <HiFunnel size={40} className="m-auto mb-2" />
            Lọc ra 5 câu minh chứng có liên quan nhất đến nhận định
          </div>
          <div>
            <HiMiniArrowLongDown
              size={20}
              className="h-16 scale-y-[2] scale-x-[2] text-neutral_2"
            />
          </div>
          <div className="p-3 w-64 rounded-xl text-center bg-neutral_1 bg-opacity-50">
            <HiCubeTransparent size={40} className="m-auto mb-2" />
            Tiến hành kiểm tin dựa trên nhận định và các minh chứng đã được lọc
          </div>
          <div>
            <HiMiniArrowLongDown
              size={20}
              className="h-16 scale-y-[2] scale-x-[2] text-neutral_2"
            />
          </div>
          <div className="p-3 w-64 rounded-xl text-center bg-neutral_1 bg-opacity-50">
            <HiCog size={40} className="m-auto mb-2" />
            Trả về kết quả được xử lí thông qua giao diện lập trình ứng dụng
            (API)
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
