// import Nav from "@/components/Nav";
// import Footer from "@/components/Footer";
import "@/styles/globals.css";
import React from "react";
import { Providers } from "../providers";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

import { getRole } from "@/utils/auth";
import { GetRoleResponse } from "@/types/global";

import AdminNav from "./AdminNav";

export const metadata = {
  title: "Trang Admin",
  icons: {
    icon: '/icon.ico', // /public path
    },
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  } else {
    const response = await getRole({
      email: session!.user!.email!,
    });
    if (response.ok) {
      const data: GetRoleResponse = await response.json();
      if (data.role !== "admin") redirect("/fact-check");
    } else {
      redirect("/fact-check");
    }
  }

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Providers>
          <AdminNav />
          {children}
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
