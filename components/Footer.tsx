import Link from "next/link";
import Image from "next/image";
import logo from "@/public/assets/images/logo-inverted.png";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__top">
        <div className="footer__left">
          <h4 className="footer__heading">Về BK FACT CHECK</h4>
          <p className="footer__description">
            BK Fact Check là dự án thuộc khoa Máy Tính trường đại học Bách Khoa.
            Hệ thống sử dụng AI để tự động hoá việc kiểm tra tính xác thực những
            mẫu tin nhằm đáp ứng nhu cầu kiểm tra tin giả của người Việt trong
            bối cảnh chưa có nhiều công cụ để kiểm tra mẫu tin, đặc biệt là công
            cụ hỗ trợ tiếng Việt.
          </p>
          <Link href={"/about"} className="footer__about-button">
            Tìm Hiểu Thêm
          </Link>
        </div>

        <div className="footer__right">
          <h4 className="footer__heading">Thông Tin Liên Lạc</h4>
          <div className="footer__right-link-div">
            <Link
              href="https://www.facebook.com/bkquocte"
              target="blank"
              className="footer__link"
              passHref
            >
              Facebook
            </Link>
            <Link
              href="https://hcmut.edu.vn/"
              target="blank"
              className="footer__link"
              passHref
            >
              Website Trường
            </Link>
            <Link
              href="https://cse.hcmut.edu.vn/"
              target="blank"
              className="footer__link"
              passHref
            >
              Website Khoa
            </Link>
          </div>
        </div>
      </div>

      <p className="footer__bottom">
        Bản quyền thuộc Trường Đại học Bách Khoa - ĐHQG-HCM
      </p>
    </div>
  );
};

export default Footer;
