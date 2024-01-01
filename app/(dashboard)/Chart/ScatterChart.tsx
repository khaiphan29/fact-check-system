'use client'
import { TimeScale } from 'chart.js';
import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  CategoryScale,
} from 'chart.js';
import Chart from 'chart.js/auto';
import { Scatter } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import stylesChart from "./DashboardStyle/Card.module.css"
import { getFactCheckStatistics, getUsageStatistics } from '../dashboardUtils';
import { FactCheckStatisticResponse, UsageStatisticResponse } from "@/types/global";
Chart.register(TimeScale, CategoryScale);
ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

interface SelectedYear {
  value: number;
  label: string;
}

interface SelectedMonth {
  value2: number;
  label: string;
}

const MyScatterPlot = ({ selectedYear, selectedMonth }: { selectedYear: SelectedYear, selectedMonth: SelectedMonth }) => {
  const { value } = selectedYear;
  const { value2 } = selectedMonth;

  // const [factCheckData, setFactCheckStat] = useState<FactCheckStatisticResponse>();
  const [usageData, setUsageStat] = useState<UsageStatisticResponse>();

  async function getInitialStat() {
    // setFactCheckStat(await getFactCheckStatistics());
    setUsageStat(await getUsageStatistics());
  }

  useEffect(() => {
    getInitialStat();
  }, []);

  // console.log("UsageData: ", usageData)
  // console.log("UsageData month day hour: ", usageData?.by_month[0].by_day[0].by_hour[0].hour)

  // Function to fill missing data in the usageData

const fillMissingData = (usageData: UsageStatisticResponse | undefined) => {

  const filledData = usageData?.by_month ? [...usageData.by_month] : [];

  // Iterate over each month
  filledData.forEach((monthData) => {
    const { month, by_day } = monthData;
    let lastDay;
    if(usageData){
      lastDay = new Date(usageData.year, month, 0).getDate();
      // Fill missing days
      for (let day = 1; day <= lastDay; day++) {
        const existingDay = by_day.find((dayData) => dayData.day === day);

      if (!existingDay) {
        // Day is missing, add a new entry with empty by_hour array
        monthData.by_day.push({ day, by_hour: [] });
      }
    }
    }
      

    // Iterate over each day
    monthData.by_day.forEach((dayData) => {
      const { day, by_hour } = dayData;

      // Fill missing hours
      for (let hour = 0; hour < 24; hour++) {
        const existingHour = by_hour.find((hourData) => hourData.hour === hour);

        if (!existingHour) {
          // Hour is missing, add a new entry with count 0
          dayData.by_hour.push({ hour, count: 0 });
          monthData.by_hour.push({ hour, count: 0 });
        }
      }
    });
  });

  return { year: usageData?.year, by_month: filledData };
};

const filledUsageData = fillMissingData(usageData);
// console.log('Filled Usage Data:', filledUsageData);


  function GetDataByYear(year: number) {
    let filteredData = {
      datasets: [
        {
          label: '0',
          data: [],
          borderColor: 'rgb(100, 100, 100)',
          backgroundColor: 'rgba(100, 100, 100, 0.6)',
        },
        {
          label: '1-15',
          data: [],
          borderColor: 'rgb(255, 255, 100)',
          backgroundColor: 'rgba(255, 255, 100, 0.6)',
        },
        {
          label: '15-30',
          data: [],
          borderColor: 'rgb(244, 128, 0)',
          backgroundColor: 'rgba(244, 128, 0, 0.6)',
        },
        {
          label: '> 30',
          data: [],
          borderColor: 'rgb(255, 10, 10)',
          backgroundColor: 'rgba(255, 10, 10, 0.6)',
        },
      ],
    };
    if (!filledUsageData || !filledUsageData.by_month || filledUsageData.year != year) {
      return filteredData;
    }
    interface AggregatedData {
      [key: string]: number;
    }
    const aggregatedData : AggregatedData = {};

    for (let monthIndex = 0; monthIndex < filledUsageData.by_month.length; monthIndex++) {
      const monthData = filledUsageData.by_month[monthIndex];
      
      for (let hourIndex = 0; hourIndex < monthData.by_hour.length; hourIndex++) {
        const hourData = monthData.by_hour[hourIndex];
        const key = `${monthIndex + 1}-${hourData.hour}`;
        if (!aggregatedData[key]) {
          aggregatedData[key] = hourData.count;
        } else {
          aggregatedData[key] += hourData.count;
        }
        // console.log("Key: ", key, "count ", aggregatedData[key])
      }
    }
  
    for (const key in aggregatedData) {
      const [month, hour] = key.split('-');
      const dataPoint = { x: parseInt(month), y: parseInt(hour) };
      // console.log("Count ",month," month", hour, "Hour Count: ", aggregatedData[key] )
      
      if (aggregatedData[key] === 0) {
        (filteredData.datasets[0].data as any[]).push(dataPoint);
      } else if (aggregatedData[key] <= 15) {
        (filteredData.datasets[1].data as any[]).push(dataPoint);
      } else if (aggregatedData[key] <= 30) {
        (filteredData.datasets[2].data as any[]).push(dataPoint);
      } else {
        (filteredData.datasets[3].data as any[]).push(dataPoint);
      }
    }
  
    return filteredData;
  }

  function GetDataByMonth(year: number, month: number) {
    let filteredData = {
      datasets: [
        {
          label: '0',
          data: [],
          borderColor: 'rgb(100, 100, 100)',
          backgroundColor: 'rgba(100, 100, 100, 0.6)',
        },
        {
          label: '1-3',
          data: [],
          borderColor: 'rgb(255, 255, 100)',
          backgroundColor: 'rgba(255, 255, 100, 0.6)',
        },
        {
          label: '3-7',
          data: [],
          borderColor: 'rgb(244, 128, 0)',
          backgroundColor: 'rgba(244, 128, 0, 0.6)',
        },
        {
          label: '> 7',
          data: [],
          borderColor: 'rgb(255, 10, 10)',
          backgroundColor: 'rgba(255, 10, 10, 0.6)',
        },
      ],
    };

    if (!filledUsageData || !filledUsageData.by_month || filledUsageData.year != year || !filledUsageData.by_month[month - 1] || !filledUsageData.by_month[month - 1].by_day) {
      return filteredData;
    }

    interface AggregatedData {
      [key: string]: number;
    }
    const aggregatedData : AggregatedData = {};
    
      for (let dayIndex = 0; dayIndex < filledUsageData.by_month[month-1].by_day.length; dayIndex++) {
        const dayData = filledUsageData.by_month[month-1].by_day[dayIndex];
        
        for (let hourIndex = 0; hourIndex < dayData.by_hour.length; hourIndex++) {
          const hourData = dayData.by_hour[hourIndex];
          const key = `${dayData.day}-${hourData.hour}`;
          if (!aggregatedData[key]) {
            aggregatedData[key] = hourData.count;
          } else {
            aggregatedData[key] += hourData.count;
          }
          // console.log("Key: ", key, "count ", aggregatedData[key])
        }
      }
    
      for (const key in aggregatedData) {
        const [day, hour] = key.split('-');
        const dataPoint = { x: parseInt(day), y: parseInt(hour) };
        // console.log("Count ",month," month", hour, "Hour Count: ", aggregatedData[key] )
        if (aggregatedData[key] === 0) {
          (filteredData.datasets[0].data as any[]).push(dataPoint);
        } else if (aggregatedData[key] <= 3) {
          (filteredData.datasets[1].data as any[]).push(dataPoint);
        } else if (aggregatedData[key] <= 7) {
          (filteredData.datasets[2].data as any[]).push(dataPoint);
        } else {
          (filteredData.datasets[3].data as any[]).push(dataPoint);
        }
      }
  
    return filteredData;
  }
  
  let options;
  let fulldata; // = GetDataByMonth(value, value2);
  let title;

  if(value == filledUsageData?.year && value2 == 13){
    fulldata = GetDataByYear(value);

    title = "Lượng Kiểm Tin Mỗi Thời Điểm Mỗi Tháng"

    options = {
      responsive: true,
      plugins: {
        title: {
          display: false,
          text: 'Scatter Plot - Lượng người dùng kiểm tin giả mỗi giờ',
        },
      },
      scales: {
          y: {
            ticks: {
              callback: function(val: any, index: any) {
                if(val == 24)
                  return ''
                return '' + val + 'h';
              },
              maxTicksLimit: 24,
              },
              title: {
                color: 'red',
                display: true,
                text: 'Giờ'
              }
            },
        x: {
          ticks: {
            padding: 10,
            callback: function(val: any, index: any) {
                if(val == 0)
                  return ''
                return "Tháng " + val
            },
            maxTicksLimit: 13,
          },
          title: {
            color: 'red',
            display: true,
            text: 'Tháng'
          }
        },
      },
    };
  }
  else{
    
    fulldata = GetDataByMonth(value, value2);

    title = "Lượng Kiểm Tin Mỗi Thời Điểm Trong Ngày Mỗi Tháng"

    options = {
      responsive: true,
      plugins: {
        title: {
          display: false,
          text: 'Scatter Plot - Lượng người dùng kiểm tin giả mỗi giờ',
        },
      },
      scales: {
          y: {
            ticks: {
              callback: function(val: any, index: any) {
                if(val == 24)
                  return ''
                return '' + val + 'h';
              },
              maxTicksLimit: 24,
              },
              title: {
                color: 'red',
                display: true,
                text: 'Giờ'
              }
            },
        x: {
          beginAtZero: false,
          ticks: {
            padding: 10,
            callback: function(val: any, index: any) {
                if(val == 0)
                  return ''
                return val
            },
            maxTicksLimit: 24,
          },
          title: {
            color: 'red',
            display: true,
            text: 'Ngày'
          }
        },
      },
    };
  }

  return (
    <div className="col-span-12 rounded-sm bg-white sm:px-7.5 xl:col-span-6">
    <div className={stylesChart.containerChart}>
    <div className="flex w-full flex-col flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
      <p className="font-bold text-primary">{title}</p>
            <Scatter data={fulldata} options={options} />
    </div>
    </div>
  </div>);
}

export default MyScatterPlot;
