import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "@/public/assets/images/logo.png";
import NavLink from "./NavLink";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const Nav = async () => {
  const session = await getServerSession(authOptions);

  console.log(session)

  return (
    <nav className="nav">
      <div className="nav__left">
        <Link href={"/"} style={{ height: "auto", alignItems: "center" }}>
          <Image
            src={logo.src}
            alt="logo"
            width={153}
            height={41}
            className="nav__logo"
          />
        </Link>
      </div>

      <ul className="nav__middle">
        <li>
          <NavLink name="Kiểm Tin" href="/fact-check" className={["nav__link"]} />
        </li>
        <li>
          <NavLink
            name="Bài Phân Tích"
            href="/post"
            className={["nav__link"]}
          />
        </li>
        <li>
          <NavLink
            name="Thống Kê"
            href="/statistic"
            className={["nav__link"]}
          />
        </li>
        <li>
          <NavLink
            name="Về Chúng Tôi"
            href="/about"
            className={["nav__link"]}
          />
        </li>
      </ul>

      <div className="nav__right">
        <ul>
          <li>
            {!session ? (
              <NavLink
                name="Đăng nhập"
                href="/login"
                className={["nav__link"]}
              />
            ) : (
              <NavLink name="Đăng xuất" href="" className={["nav__link"]} />
            )}
          </li>
          <li>
            {!session ? (
              <NavLink
                name="Đăng ký"
                href="/register"
                className={["nav__link"]}
              />
            ) : (
              <NavLink name="user" href="/profile" className={["nav__link"]} />
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
