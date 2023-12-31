"use client";
import Link from "next/link";
import Image from "next/image";
import { FaUsers } from "react-icons/fa";
import { BiMoneyWithdraw } from "react-icons/bi";
import { BsFillPersonCheckFill } from "react-icons/bs";
import { CgEye } from "react-icons/cg";
import { CgCloseO } from "react-icons/cg";
import React, { useRef, useState, useEffect } from "react";
import Scatter from "../Chart/ScatterChart";
import LineChart from "../Chart/LineChart";
import Card from "../Chart/Card";

import stylesChart from "./Chart.module.css";
import {
  FactCheckStatisticResponse,
  UsageStatisticResponse,
} from "@/types/global";
import { getFactCheckStatistics, getUsageStatistics } from "../dashboardUtils";
const Dashboard = () => {
  const [factCheckStat, setFactCheckStat] =
    useState<FactCheckStatisticResponse>();

  const [usageStat, setUsageStat] = useState<UsageStatisticResponse>();

  async function getInitialStat() {
    setFactCheckStat(await getFactCheckStatistics());
    setUsageStat(await getUsageStatistics());
  }

  useEffect(() => {
    getInitialStat();
  }, []);

  return (
    <div className="mt-10 mb-10">
      {/* <div>{JSON.stringify(factCheckStat)}</div> */}
      <div className="relative left-0 items-center ">
        <p className={stylesChart.search_title}>Dashboard</p>
      </div>
      <div className="mt-44 mb-8 grid-cols-12 grid gap-4 md:mt-6 md:gap-6 2xl:mt-7 2xl:gap-7">
        <Scatter />
        <LineChart />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-6 2xl:gap-7">
        <Card
          data={454}
          label={"Total Visitors This Month"}
          icon={<FaUsers size={25} />}
        />

        <Card
          data={1246}
          label={"Total Claims Checked This Month"}
          icon={<CgEye size={25} />}
        />

        <Card
          data={345}
          label={"Total Fake Claims Detected This Month"}
          icon={<CgCloseO size={25} />}
        />

        <Card
          data={"Y tế"}
          label={"Most Checked Topic This Month"}
          icon={<BsFillPersonCheckFill size={25} />}
        />

        <Card
          data={"Xã hội"}
          label={"Most Faked Topic This Month"}
          icon={<BsFillPersonCheckFill size={25} />}
        />

        <Card
          data={"Thực phẩm"}
          label={"Most Increasingly Faked Topic This Month"}
          icon={<BsFillPersonCheckFill size={25} />}
        />
      </div>
    </div>
  );
};

export default Dashboard;
