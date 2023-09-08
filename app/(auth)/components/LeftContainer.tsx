import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/Auth.module.css";
import news_1 from "@/public/assets/images/news-1.png";
import news_2 from "@/public/assets/images/news-2.png";

const LeftContainer = () => {
  return (
    <div className={styles.left_container}>
      {/* ANCHOR OBJECTS */}
      <Image
        className={`${styles.news_obj} ${styles.news_obj1}`}
        src={news_1}
        height={900}
        width={900}
        alt="newspaper"
      ></Image>
      <Image
        className={`${styles.news_obj} ${styles.news_obj2}`}
        src={news_1}
        height={900}
        width={900}
        alt="newspaper"
      ></Image>
      <Image
        className={`${styles.news_obj} ${styles.news_obj3}`}
        src={news_2}
        height={900}
        width={900}
        alt="newspaper"
      ></Image>
      {/* NAVIVATION */}
      <div className={styles.left_bottom}>
        <h1 className={styles.left_title}>BK Fact Check</h1>
        <p className={styles.left_subtitle}>
          BK Fact Check sử dụng AI để tự động hoá việc kiểm tra tính xác thực
          những mẫu tin nhằm đáp ứng nhu cầu kiểm tra tin giả của người Việt.
          Đăng nhập sẽ giúp người dùng lưu lại lịch sử kiểm tin và xem thống kê.
        </p>
        <div className={styles.left_nav}>
          <Link href={"/fact-check"}>
            <div className={styles.nav_link}>Kiểm Tin</div>
          </Link>
          <Link href={"/fact-check"}>
            <div className={styles.nav_link}>Bài Phân Tích</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LeftContainer;
