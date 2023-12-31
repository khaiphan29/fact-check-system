"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/assets/images/logo.png";

import { HiMiniPower } from "react-icons/hi2";
import { signOut } from "next-auth/react";

const AdminNav = () => {
  return (
    <nav className="h-14 flex justify-between items-center">
      <Image
        src={logo.src}
        alt="logo"
        width={153}
        height={41}
        className="h-7 w-auto"
      />

      <div className="flex justify-center items-center gap-10">
        <div className="font-semibold text-xl ">Trang Quản Lý</div>
        <Link href="/dashboard" className="cursor-pointer">
          Bảng Thống Kê
        </Link>
        <div className="cursor-pointer" onClick={() => signOut()}>
          <HiMiniPower size={30} />
        </div>
      </div>
    </nav>
  );
};

export default AdminNav;
