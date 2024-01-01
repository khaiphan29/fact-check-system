"use client";
import { BsFillPersonCheckFill } from "react-icons/bs";
import { CgEye } from "react-icons/cg";
import { CgCloseO } from "react-icons/cg";
import { FiAlertOctagon } from "react-icons/fi";
import { FiAward } from "react-icons/fi";
import React, { useRef, useState, useEffect } from "react";
// import Scatter from "../Chart/ScatterChart";
// import LineChart from "../Chart/LineChart";
// import NumberLineChart from "../Chart/NumberLineChart";
// import Card from "../Chart/Card";
import stylesChart from "../Chart/DashboardStyle/Chart.module.css";
import Select from "react-select";
import styles from "./DashboardStyle/Card.module.css";
import { getFactCheckStatistics, getUsageStatistics } from "../dashboardUtils";
import {
  FactCheckStatisticResponse,
  UsageStatisticResponse,
} from "@/types/global";

const Dashboard = () => {
  const [selectedYear, setSelectedYear] = useState({
    value: 2023,
    label: 2023,
  });
  const [selectedMonth, setSelectedMonth] = useState({
    value2: 13,
    label: "Toàn bộ",
  });

  const [factCheckData, setFactCheckStat] =
    useState<FactCheckStatisticResponse>();

  async function getInitialStat() {
    setFactCheckStat(await getFactCheckStatistics());
    // setUsageStat(await getUsageStatistics());
  }

  useEffect(() => {
    getInitialStat();
  }, []);

  const yearOptions = [
    // { value: 2019, label: 2019 },
    // { value: 2020, label: 2020 },
    // { value: 2021, label: 2021 },
    // { value: 2022, label: 2022 },
    { value: 2023, label: 2023 },
    // { value: 2024, label: 2024 },
    // { value: 2025, label: 2025 },
  ];
  const monthOptions = [
    { value: 13, value2: 13, label: "Toàn bộ" },
    { value: 1, value2: 1, label: "Tháng 1" },
    { value: 2, value2: 2, label: "Tháng 2" },
    { value: 3, value2: 3, label: "Tháng 3" },
    { value: 4, value2: 4, label: "Tháng 4" },
    { value: 5, value2: 5, label: "Tháng 5" },
    { value: 6, value2: 6, label: "Tháng 6" },
    { value: 7, value2: 7, label: "Tháng 7" },
    { value: 8, value2: 8, label: "Tháng 8" },
    { value: 9, value2: 9, label: "Tháng 9" },
    { value: 10, value2: 10, label: "Tháng 10" },
    { value: 11, value2: 11, label: "Tháng 11" },
    { value: 12, value2: 12, label: "Tháng 12" },
  ];

  const handleYearChange = (selectedOption: React.SetStateAction<{ value: number; label: number; }>) => {
    setSelectedYear(selectedOption);
  };
  const handleMonthChange = (selectedOption: React.SetStateAction<{ value2: number; label: string; }>) => {
    setSelectedMonth(selectedOption);
  };

  // Example usage:
  // const filledFactCheckData = fillMissingFactCheckData(factCheckData);
  console.log("factCheckData Page :", factCheckData);
  // console.log('Filled Fact Check Data Page :', filledFactCheckData);
  let Data;
  if (selectedMonth.value2 != 13) {
    var Info = selectedMonth.label + " Năm " + selectedYear.label;
    if (factCheckData && selectedYear.value == factCheckData?.year)
      Data = factCheckData?.by_month[selectedMonth.value2 - 1];
  } else {
    var Info = " Năm " + selectedYear.label;
    if (factCheckData && selectedYear.value == factCheckData?.year)
      Data = factCheckData;
  }
  // console.log("Data Data", Data)

  return (
    <div className="mt-10 mb-10">
      {/* <div className="items-center">
        <div className="relative left-0 items-center">
          <p className={stylesChart.search_title}>Bảng Thống Kê</p>
        </div>
        <div className="grid gap-4 md:flex md:gap-1 xl:flex 2xl:gap-7">
          <div className="flex gap-2 items-center">
            <h1>Năm:</h1>
            <Select
              value={selectedYear}
              onChange={handleYearChange}
              options={yearOptions}
              placeholder="Chọn năm"
            />
          </div>

          <div className="flex gap-2 items-center">
            <h1>Tháng:</h1>
            <Select
              value={selectedMonth}
              onChange={handleMonthChange}
              options={monthOptions}
              placeholder="Chọn tháng"
            />
          </div>
        </div>
      </div>
      <div className="mt-12 mb-8 grid-cols-12 grid gap-4 md:mt-6 md:gap-6 2xl:mt-7 2xl:gap-7">
        <Scatter selectedYear={selectedYear} selectedMonth={selectedMonth} />
        <LineChart selectedYear={selectedYear} selectedMonth={selectedMonth} />
      </div>
      <div className="mt-12 mb-8 grid-cols-6 grid gap-4 md:mt-6 md:gap-6 2xl:mt-7 2xl:gap-7">
        <NumberLineChart
          selectedYear={selectedYear}
          selectedMonth={selectedMonth}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-5 2xl:gap-7">
        <Card
          data={
            Data?.statistic.total_fact_check
              ? Data?.statistic.total_fact_check
              : 0
          }
          label={`Tổng Tin Được Kiểm Tra Trong ${Info}`}
          icon={<CgEye size={25} />}
        />

        <Card
          data={
            Data?.statistic.total_refuted ? Data?.statistic.total_refuted : 0
          }
          label={`Tổng Tin Giả Được Phát Hiện Trong ${Info}`}
          icon={<CgCloseO size={25} />}
        />

        <Card
          data={
            Data?.statistic.total_approved ? Data?.statistic.total_approved : 0
          }
          label={`Tổng Tin Được Xác Thực Trong ${Info}`} //Most Checked Topic This Month
          icon={<BsFillPersonCheckFill size={25} />}
        />

        <Card
          data={
            Data?.statistic.total_neutral ? Data?.statistic.total_neutral : 0
          }
          label={`Tổng Tin Không Xác Định Trong ${Info}`} //Most Faked Topic This Month
          icon={<FiAlertOctagon size={25} />}
        />

        <Card
          data={
            Data?.popular_source ? Data?.popular_source : "không có dữ liệu"
          }
          label={`Nguồn Được Trích Dẫn Nhiều Nhất Trong ${Info}`} //Most Increasingly Faked Topic This Month
          icon={<FiAward size={25} />}
        />
      </div> */}
    </div>
  );
};

export default Dashboard;
