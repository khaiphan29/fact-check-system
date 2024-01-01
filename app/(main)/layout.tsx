import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "@/styles/globals.css";
import React from "react";
import { Providers } from "../providers";

export const metadata = {
  title: "BK Fact Check",
  description: "Check Fact for a piece of news",
  icons: {
    icon: '/icon.ico', // /public path
    },
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Nav />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
