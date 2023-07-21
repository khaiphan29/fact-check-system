"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { RiAtFill } from "react-icons/ri";
import { signOut } from "next-auth/react";

interface Props {
  name: string;
  href: string;
  className: string[];
}

const NavLink = (props: Props) => {
  const activeClass = "nav__link-active";
  const pathName = usePathname();

  if (props.name === "user") {
    return (
      <Link
        href={props.href}
        // className={`${props.className.reduce((acc, cur) => acc + cur)}`}
      >
        <RiAtFill size={20} />
      </Link>
    );
  } else if (props.name === "Đăng xuất") {
    return (
      <div
        className={`${props.className.reduce((acc, cur) => acc + cur)} ${
          pathName === props.href ? activeClass : ''
        }`}
        onClick={() => signOut()}
      >
        {props.name}
      </div>
    );
  }

  return (
    <Link
      href={props.href}
      className={`${props.className.reduce((acc, cur) => acc + cur)} ${
        pathName === props.href ? activeClass : ''
      }`}
    >
      {props.name}
    </Link>
  );
};

export default NavLink;
