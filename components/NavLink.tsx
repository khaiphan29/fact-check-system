"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { RiAtFill } from "react-icons/ri";
import { signOut } from "next-auth/react";
import styles from "@/styles/NavLink.module.css"

interface Props {
  name: string;
  href: string;
}

const NavLink = (props: Props) => {
  const pathName = usePathname();

  if (props.name === "User") {
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
        className={`${styles.container} ${
          pathName.includes(props.href) ? styles.active : ''
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
      className={`${styles.container} ${
        pathName.includes(props.href) ? styles.active : ''
      }`}
    >
      {props.name}
    </Link>
  );
};

export default NavLink;
