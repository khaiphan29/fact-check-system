import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "@/public/assets/images/logo.png";
import NavLink from "./NavLink";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const Nav = async () => {
  const session = await getServerSession(authOptions);

  console.log(session);

  return (
    <nav className="flex-shrink-0 sticky top-0 -mx-10 py-6 px-10 flex justify-center items-center bg-white z-50 overflow-hidden">
      <div className="absolute left-0 ml-20 items-center">
        <Link href={"/"} style={{ height: "auto", alignItems: "center" }}>
          <Image
            src={logo.src}
            alt="logo"
            width={153}
            height={41}
            className="h-7 w-auto"
          />
        </Link>
      </div>

      {/* ANCHOR Middle Area */}
      <ul className="flex justify-center items-center gap-7">
        <li>
          <NavLink name="Kiểm Tin" href="/fact-check" />
        </li>
        <li>
          <NavLink name="Bài Phân Tích" href="/post" />
        </li>
        {/* <li>
          <NavLink
            name="Thống Kê"
            href="/statistic"
          />
        </li> */}
        <li>
          <NavLink name="Về Chúng Tôi" href="/about" />
        </li>
      </ul>

      {/* ANCHOR Right Area */}
      <div className="absolute right-0 mr-20">
        <ul className="flex items-center gap-7">
          <li>
            {!session ? (
              <NavLink name="Đăng nhập" href="/login" />
            ) : (
              <NavLink name="Đăng xuất" href="" />
            )}
          </li>
          <li>
            {!session ? (
              <NavLink name="Đăng ký" href="/register" />
            ) : (
              <NavLink name="User" href="/profile" />
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
