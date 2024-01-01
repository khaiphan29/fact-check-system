import Nav from "@/components/Nav";
// import Footer from "@/components/Footer";
import "@/styles/globals.css";
import React from "react";
import { Providers } from "../../providers";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Kiểm Tin",
  description: "Check Fact for a piece of news",
  icons: {
    icon: "/icon.ico", // /public path
  },
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  // if (!session) {
  //   redirect("/login");
  // }

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Providers>
          <div>{children}</div>

          {/* <Footer /> */}
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
