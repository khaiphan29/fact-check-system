"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "@/styles/FactCheckPage/FactCheck.module.css";
import { TfiLayoutSidebarLeft, TfiPlus } from "react-icons/tfi";
import ResultGroup from "@/components/FactCheckPage/ResultGroupCard";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

const NavSection = (props: {
  groups: {
    id: number;
    name: string;
  }[];
}) => {
  const groups = props.groups
    ? props.groups.map((e) => (
        <ResultGroup id={e.id.toString()} title={e.name} />
      ))
    : [];

  return (
    <div className={styles.left_container}>
      <div className={styles.upper_left_container}>
        <Link href={"/fact-check"} className={styles.new_group_btn}>
          <TfiPlus />
          <span>Thêm Nhóm Tin</span>
        </Link>

        <div className={styles.hide_nav_btn}>
          <TfiLayoutSidebarLeft />
        </div>
      </div>

      <div className={styles.group_list_container}>{groups}</div>

      <div className={styles.bottom_left_container}></div>
    </div>
  );
};

export default NavSection;
