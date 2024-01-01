import "@/styles/globals.css";
import React from "react";
// import { Providers } from "./providers";
// import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/Auth.module.css";
import LeftContainer from "./components/LeftContainer";
import { TfiHome } from "react-icons/tfi";

export const metadata = {
  icons: {
    icon: "/icon.ico", // /public path
  },
};

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
