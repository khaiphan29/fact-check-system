import "@/styles/globals.css";
import React from "react";
// import { Providers } from "./providers";
// import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/Auth.module.css";
import LeftContainer from "./components/LeftContainer";
import { TfiHome } from "react-icons/tfi";

// export const metadata = {
//   title: "BK Fact Check",
//   description: "Check Fact for a piece of news",
// };

const LoginLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <div className={styles.container}>
          <Link href={"/"}>
            <div className={styles.home_btn}>
              <TfiHome />
            </div>
          </Link>

          <LeftContainer />
          {children}
        </div>
      </body>
    </html>
  );
};

export default LoginLayout;
