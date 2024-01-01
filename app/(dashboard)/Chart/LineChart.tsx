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
  label2: string;
}

const MyLineChart = ({ selectedYear, selectedMonth }: { selectedYear: SelectedYear, selectedMonth: SelectedMonth }) => {

  const { value } = selectedYear;
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
  const fillMissingFactCheckData = (factCheckData) => {
    const filledData = factCheckData?.by_month ? [...factCheckData.by_month] : [];

    // Iterate over each month
    filledData.forEach((monthData) => {
      const { by_day, month } = monthData;
      const lastDayOfMonth = new Date(factCheckData.year, month, 0).getDate();
      
      
      // Iterate over each month
      for (let month = 1; month <= 12; month++) {
        const existingMonthData = filledData.find((monthData) => monthData.month === month);

        // If the month data doesn't exist, add it with default statistics
        if (!existingMonthData) {
          filledData.push({
            month,
            statistic: {
              total_approved: 0,
              total_fact_check: 0,
              total_neutral: 0,
              total_refuted: 0,
            },
            popular_source: "",
            by_day: Array.from({ length: 31 }, (_, day) => ({
              day: day + 1,
              statistic: {
                total_approved: 0,
                total_fact_check: 0,
                total_neutral: 0,
                total_refuted: 0,
              },
            })),
          });
        }
      }

      // Iterate over missing days from day 7 to the last day of the month
      for (let day = 7; day <= lastDayOfMonth; day++) {
        const existingDayData = by_day.find((dayData) => dayData.day === day);
  
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
    let options;
    let labels;
    let title;

    if(value == filledFactCheckData?.year && value2 == 13){
      if(filledFactCheckData){
        labels = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
        ApprovedList = filledFactCheckData.by_month.map((monthData) => Math.floor(monthData.statistic.total_approved / (monthData.statistic.total_approved + monthData.statistic.total_refuted + monthData.statistic.total_neutral) * 100))
        RefusedList = filledFactCheckData.by_month.map((monthData) => Math.floor(monthData.statistic.total_refuted / (monthData.statistic.total_approved + monthData.statistic.total_refuted + monthData.statistic.total_neutral) * 100))
        NeutralList = filledFactCheckData.by_month.map((monthData) => Math.floor(monthData.statistic.total_neutral / (monthData.statistic.total_approved + monthData.statistic.total_refuted + monthData.statistic.total_neutral) * 100))
      }

      title = "Tỉ Lệ Kết Quả Đánh Giá Mỗi Tháng"

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
              text: 'Phần trăm'
            },
            ticks: {
              padding: 10,
              max: 101,
              min: 0,
              stepSize: 10,
              maxTicksLimit: 11,
              minTicksLimit: 11,
              callback: function(val, index) {
                  return val + '%'
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
        const sortedByDay = filledFactCheckData.by_month[value2 - 1].by_day.sort((a, b) => a.day - b.day);
        // Map the sorted by_day array to labels and lists
        labels = sortedByDay.map((dayData) => dayData.day);
        // labels = filledFactCheckData.by_month[value2-1].by_day.map((dayData) => dayData.day);
        ApprovedList = sortedByDay.map((dayData) => dayData.statistic.total_approved !== 0
        ? Math.floor((dayData.statistic.total_approved / (dayData.statistic.total_approved + dayData.statistic.total_refuted + dayData.statistic.total_neutral)) * 100)
        : 0)
        RefusedList = sortedByDay.map((dayData) => dayData.statistic.total_refuted !== 0
        ? Math.floor((dayData.statistic.total_refuted / (dayData.statistic.total_approved + dayData.statistic.total_refuted + dayData.statistic.total_neutral)) * 100)
        : 0)
        NeutralList = sortedByDay.map((dayData) => dayData.statistic.total_neutral !== 0
        ? Math.floor((dayData.statistic.total_neutral / (dayData.statistic.total_approved + dayData.statistic.total_refuted + dayData.statistic.total_neutral)) * 100)
        : 0)
      }

      title = "Tỉ Lệ Kết Quả Đánh Giá Mỗi Ngày Trong Tháng"

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
              text: 'Phần trăm'
            },
            ticks: {
              padding: 10,
              max: 100,
              min: 0,
              stepSize: 10,
              maxTicksLimit: 11,
              minTicksLimit: 11,
              callback: function(val, index) {
                  return val + '%'
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

export default MyLineChart;

