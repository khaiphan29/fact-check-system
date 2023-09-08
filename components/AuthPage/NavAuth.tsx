import React from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/assets/images/logo.png";
import styles from "@/styles/Auth.module.css";

const NavAuth = () => {
  return (
    <div className={styles.nav}>
      <div className={styles.navlink_container}>
        <Link href={"/fact-check"}>
          <div className={styles.nav_link}>Kiểm Tin</div>
        </Link>
        <Link href={"/fact-check"}>
          <div className={styles.nav_link}>Bài Phân Tích</div>
        </Link>
      </div>
    </div>
  );
};

export default NavAuth;
