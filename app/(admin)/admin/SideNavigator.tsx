"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import AccountMgmt from "./AccountMgmt";
import FeedbackMgmt from "./FeebackMgmt";
import Link from "next/link";
import ScrapingTool from "./ScrapingTool";

const active =
  "block py-4 px-5 bg-light_orange text-white cursor-pointer rounded-s-full";

const inActive =
  "block py-4 px-5 cursor-pointer rounded-s-full hover:bg-light_orange hover:text-white transition-all duration-200";

interface Props {
  email: string;
}

const SideNavigator = (props: Props) => {
  const searchParams = useSearchParams();
  let option = searchParams.get("option");
  if (!option) option = "1";
  // const [option, setOption] = useState<number>(1);
  return (
    <div className="flex min-h-max -mx-10 mt-5">
      <div className="min-h-screen border-r-2 border-light_orange ml-5 border-opacity-30">
        <Link
          className={option === "1" ? active : inActive}
          href={"/admin?option=1"}
        >
          Quản lý Tài Khoản
        </Link>
        <Link
          className={option === "2" ? active : inActive}
          href={"/admin?option=2"}
        >
          Quản lý Đánh Giá
        </Link>
        <Link
          className={option === "3" ? active : inActive}
          href={"/admin?option=3"}
        >
          Hệ Thống Khai Thác Dữ Liệu Web
        </Link>
      </div>
      <div className="flex-grow">
        {option === "1" ? (
          <AccountMgmt email={props.email} />
        ) : option === "2" ? (
          <FeedbackMgmt email={props.email} />
        ) : (
          <ScrapingTool email={props.email} />
        )}
      </div>
    </div>
  );
};

export default SideNavigator;
