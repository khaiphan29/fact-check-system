import Link from "next/link";
import Image from "next/image";
import logo from "@/public/assets/images/logo-inverted.png";
import styles from "@/styles/Footer.module.css"

const Footer = () => {
  return (
    <div className={styles.container}>
      {/* ANCHOR Upper Area */}
      <div className="flex mb-12">
        <div className="flex flex-col w-1/3 gap-8">
          <h4 className="text-sm font-bold">Về BK FACT CHECK</h4>
          <p className="text-base font-light">
            BK Fact Check là dự án thuộc khoa Máy Tính trường đại học Bách Khoa.
            Hệ thống sử dụng AI để tự động hoá việc kiểm tra tính xác thực những
            mẫu tin nhằm đáp ứng nhu cầu kiểm tra tin giả của người Việt trong
            bối cảnh chưa có nhiều công cụ để kiểm tra mẫu tin, đặc biệt là công
            cụ hỗ trợ tiếng Việt.
          </p>
          <Link href={"/about"} className={styles.about_btn}>
            Tìm Hiểu Thêm
          </Link>
        </div>

        <div className="ml-auto flex flex-col gap-8 items-end">
          <h4 className="text-sm font-bold">Thông Tin Liên Lạc</h4>
          <div className="flex flex-col items-end gap-3">
            <Link
              href="https://www.facebook.com/bkquocte"
              target="blank"
              className={styles.link}
              passHref
            >
              Facebook
            </Link>
            <Link
              href="https://hcmut.edu.vn/"
              target="blank"
              className={styles.link}
              passHref
            >
              Website Trường
            </Link>
            <Link
              href="https://cse.hcmut.edu.vn/"
              target="blank"
              className={styles.link}
              passHref
            >
              Website Khoa
            </Link>
          </div>
        </div>
      </div>

      <p className="ml-auto text-sm font-light">
        Bản quyền thuộc Trường Đại học Bách Khoa - ĐHQG-HCM
      </p>
    </div>
  );
};

export default Footer;
