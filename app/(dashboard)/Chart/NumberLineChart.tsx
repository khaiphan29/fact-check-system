'use client'
import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { getFactCheckStatistics, getUsageStatistics } from '../dashboardUtils';
import { FactCheckStatisticResponse, UsageStatisticResponse } from "@/types/global";
import stylesChart from "./DashboardStyle/Card.module.css"
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface SelectedYear {
  value: number;
  label: string;
}

interface SelectedMonth {
  value2: number;
  label: string;
}

const NumberLineChart = ({ selectedYear, selectedMonth }: { selectedYear: SelectedYear, selectedMonth: SelectedMonth }) => {
  const { value } = selectedYear;
  // console.log("NumberLinechart " + value)
  const { value2 } = selectedMonth;
  const [factCheckData, setFactCheckStat] = useState<FactCheckStatisticResponse>();
  // const [usageData, setUsageStat] = useState<UsageStatisticResponse>();

  async function getInitialStat() {
    setFactCheckStat(await getFactCheckStatistics());
    // setUsageStat(await getUsageStatistics());
  }

  useEffect(() => {
    getInitialStat();
  }, []);

  // console.log("factCheckData: ", factCheckData)
  // Function to fill missing data in the factCheckData
  const fillMissingFactCheckData = (factCheckData: any) => {
    const filledData = factCheckData?.by_month ? [...factCheckData.by_month] : [];

    // Iterate over each month
    filledData.forEach((monthData) => {
      const { by_day, month } = monthData;
      const lastDayOfMonth = new Date(factCheckData.year, month, 0).getDate();
  
      // Iterate over missing days from day 7 to the last day of the month
      for (let day = 7; day <= lastDayOfMonth; day++) {
        const existingDayData = by_day.find((dayData: any) => dayData.day === day);
  
        // If the day data doesn't exist, add it with default statistics
        if (!existingDayData) {
          by_day.push({
            day,
            statistic: {
              total_approved: 0,
              total_fact_check: 0,
              total_neutral: 0,
              total_refuted: 0,
            },
          });
        }
      }
    });

    return { year: factCheckData?.year, popular_source: factCheckData?.popular_source, by_month: filledData };
  };

  // Example usage:
  const filledFactCheckData = fillMissingFactCheckData(factCheckData);
  // console.log('Filled Fact Check Data:', filledFactCheckData);

  let ApprovedList;
  let RefusedList;
  let NeutralList;
  let TotalList;
  let AvarageList;
  let options;
  let labels;
  let title;


  if(value == filledFactCheckData?.year && value2 == 13){
    if(filledFactCheckData){
      labels = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
      ApprovedList = filledFactCheckData.by_month.map((monthData) => monthData.statistic.total_approved)
      RefusedList = filledFactCheckData.by_month.map((monthData) => monthData.statistic.total_refuted)
      NeutralList = filledFactCheckData.by_month.map((monthData) => monthData.statistic.total_neutral)
      TotalList = filledFactCheckData.by_month.map((monthData) => monthData.statistic.total_fact_check)
      AvarageList = filledFactCheckData.by_month.map((monthData) => Math.floor(monthData.statistic.total_fact_check/3))
    }

    title = "Lượng Kiểm Tin Mỗi Tháng"

    options = {
      responsive: true,
      interaction: {
        mode: 'index' as const,
        intersect: false,
      },
      
      scales: {
        y: {
          type: 'linear' as const,
          display: true,
          position: 'left' as const,
          beginAtZero: true,
          title: {
            color: 'red',
            display: true,
            text: 'Số lượng'
          },
          ticks: {
            padding: 10,
            callback: function(val: any, index: any) {
                return val
            },
            
          },
        },
        x: {
          title: {
            color: 'red',
            display: true,
            text: 'Tháng'
          }
        }
      },
    };
  }
  else if(value == filledFactCheckData?.year && value2 != 13){
    if(filledFactCheckData){
      const sortedByDay = filledFactCheckData.by_month[value2 - 1].by_day.sort((a: any, b: any) => a.day - b.day);
      labels = sortedByDay.map((dayData: any) => dayData.day);
      ApprovedList = sortedByDay.map((dayData: any) => dayData.statistic.total_approved)
      RefusedList = sortedByDay.map((dayData: any) => dayData.statistic.total_refuted)
      NeutralList = sortedByDay.map((dayData: any) => dayData.statistic.total_neutral)
      TotalList = sortedByDay.map((dayData: any) => dayData.statistic.total_fact_check)
      AvarageList = sortedByDay.map((dayData: any) => Math.floor(dayData.statistic.total_fact_check/3))
    }

    title = "Lượng Kiểm Tin Mỗi Ngày Trong Tháng"

    options = {
      responsive: true,
      interaction: {
        mode: 'index' as const,
        intersect: false,
      },
      
      scales: {
        y: {
          type: 'linear' as const,
          display: true,
          position: 'left' as const,
          beginAtZero: true,
          title: {
            color: 'red',
            display: true,
            text: 'Số lượng'
          },
          ticks: {
            padding: 10,
            callback: function(val: any, index: any) {
                return val
            },
            
          },
        },
        x: {
          title: {
            color: 'red',
            display: true,
            text: 'Ngày'
          }
        }
      },
    };
  }

  const data = {
    labels,
    datasets: [
      {
        label: 'Trung bình',
        data: AvarageList,
        borderColor: 'rgb(200, 200, 255)',
        backgroundColor: 'rgba(200, 200, 255, 0.4)',
        borderWidth: 0,
        fill: true,
        radius: 0,
      },
      {
        label: 'Tin Xác Thực',
        data: ApprovedList,
        borderColor: 'rgb(30, 191, 19)',
        backgroundColor: 'rgba(30, 191, 19, 0.5)',
      },
      {
        label: 'Tin Giả',
        data: RefusedList,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Không Xác Định',
        data: NeutralList,
        borderColor: 'rgb(100, 110, 110)',
        backgroundColor: 'rgba(100, 100, 100, 0.4)',
      },
      {
        label: 'Tổng Lượng Tin',
        data: TotalList,
        borderColor: 'rgb(51, 51, 255)',
        backgroundColor: 'rgba(51, 51, 255, 0.4)',
     },
    ],
  };

  return (
  <div className="col-span-12 bg-white sm:px-7.5 xl:col-span-6">   
    <div className={stylesChart.containerChart}>
      <div className="flex w-full flex-col flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <p className="font-bold text-primary">{title}</p>
            <Line options={options} data={data} />
      </div>
      </div>
    </div>);
}

export default NumberLineChart;

