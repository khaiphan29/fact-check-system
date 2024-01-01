import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "@/styles/globals.css";
import React from "react";
import { Providers } from "../providers";

export const metadata = {
  title: "Dashboard",
  description: "Display a dashboard in BK Fact Check system",
  icons: {
    icon: "/icon.ico", // /public path
  },
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <Nav></Nav>
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
