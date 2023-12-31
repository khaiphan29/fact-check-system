'use client'
import React from 'react';
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  interaction: {
    mode: 'index' as const,
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: false,
      text: 'Times users check for fake news',
    },
  },
  scales: {
    y: {
      type: 'linear' as const,
      display: true,
      position: 'left' as const,
    },
    // y1: {
    //   type: 'linear' as const,
    //   display: true,
    //   position: 'right' as const,
    //   grid: {
    //     drawOnChartArea: false,
    //   },
    // },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Y tế',
      data: [20, 10, 30, 40, 70, 60, 50, 110, 90, 70, 80, 60],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      yAxisID: 'y',
    },
    {
      label: 'Thực phẩm',
      data: [50, 20, 40, 30, 10, 70, 60, 80, 100, 90, 85, 120],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
      yAxisID: 'y',
    },
    {
      label: 'Xã hội',
      data: [40, 70, 50, 60, 20, 10, 30, 90, 80, 100, 110, 111],
      borderColor: 'rgb(235, 162, 53)',
      backgroundColor: 'rgba(235, 162, 53, 0.5)',
      yAxisID: 'y',
    },
  ],
};

const MyLineChart = () => {
  return (
  <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7 pb-7 shadow sm:px-7.5 xl:col-span-6">
      <div className="flex w-full flex-col flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <p className="font-bold text-primary">Number Of Fact-checks By Months</p>
          <Line options={options} data={data} />
      </div>
    </div>);
}

export default MyLineChart;

