import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "@/styles/globals.css";
import React from "react";
import { Providers } from "../providers";


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
