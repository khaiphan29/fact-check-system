import Nav from "@/components/Nav";
// import Footer from "@/components/Footer";
import "@/styles/globals.css";
import React from "react";
import { Providers } from "../../providers";
import styles from "@/styles/FactCheckPage/FactCheckMgmt.module.css";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Kiểm Tin",
  description: "Check Fact for a piece of news",
  icons: {
    icon: '/icon.ico', // /public path
    },
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Providers>
          <div className={styles.outer_container}>
            
            <Nav />
            {children}
          </div>

          {/* <Footer /> */}
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
