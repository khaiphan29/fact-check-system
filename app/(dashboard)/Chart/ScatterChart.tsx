'use client'
import { TimeScale } from 'chart.js';
import React from 'react';
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
ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

Chart.register(TimeScale, CategoryScale);

const MyScatterPlot = () => {

  function getSecond(x: Date){
    return x.getHours() * 3600 + x.getMinutes() * 60 + x.getSeconds()
  }
  function getDays(x: Date){
    var startOfYear = new Date(x.getFullYear(), 0, 0, 0);
    var diff = x - startOfYear;
    var oneDay = 1000 * 60 * 60 * 24;
    var day = Math.floor(diff / oneDay);
    return day;
  }
  function getXHours(x){
    return Math.floor(x/3600);
  }
  const data = {
    datasets: [
      {
        label: 'Y tế',
        data: [
          { x: getSecond(new Date('2023-01-01T01:00:00')), y: getDays(new Date('2023-01-01T01:00:00')) },
          { x: getSecond(new Date('2023-01-01T04:00:11')), y: getDays(new Date('2023-01-01T04:00:11')) },
          { x: getSecond(new Date('2023-02-01T07:00:12')), y: getDays(new Date('2023-02-01T07:00:12')) },
          { x: getSecond(new Date('2023-02-01T10:00:13')), y: getDays(new Date('2023-02-01T10:00:13')) },
          { x: getSecond(new Date('2023-03-01T13:00:14')), y: getDays(new Date('2023-03-01T13:00:14')) },
          { x: getSecond(new Date('2023-03-01T16:00:15')), y: getDays(new Date('2023-03-01T16:00:15')) },
          { x: getSecond(new Date('2023-04-01T19:00:16')), y: getDays(new Date('2023-04-01T19:00:16')) },
          { x: getSecond(new Date('2023-04-01T22:00:17')), y: getDays(new Date('2023-04-01T22:00:17')) },
          { x: getSecond(new Date('2023-05-02T00:00:00')), y: getDays(new Date('2023-05-02T00:00:00')) },
          { x: getSecond(new Date('2023-05-02T01:00:00')), y: getDays(new Date('2023-05-02T01:00:00')) },
          { x: getSecond(new Date('2023-06-02T04:00:11')), y: getDays(new Date('2023-06-02T04:00:11')) },
          { x: getSecond(new Date('2023-06-02T07:00:12')), y: getDays(new Date('2023-06-02T07:00:12')) },
          { x: getSecond(new Date('2023-07-02T10:00:13')), y: getDays(new Date('2023-07-02T10:00:13')) },
          { x: getSecond(new Date('2023-07-02T13:00:14')), y: getDays(new Date('2023-07-02T13:00:14')) },
          { x: getSecond(new Date('2023-08-02T16:00:15')), y: getDays(new Date('2023-08-02T16:00:15')) },
          { x: getSecond(new Date('2023-08-02T19:00:16')), y: getDays(new Date('2023-08-02T19:00:16')) },
          { x: getSecond(new Date('2023-09-02T22:00:17')), y: getDays(new Date('2023-09-02T22:00:17')) },
          { x: getSecond(new Date('2023-10-03T00:00:00')), y: getDays(new Date('2023-10-03T00:00:00')) },
          { x: getSecond(new Date('2023-11-02T22:00:17')), y: getDays(new Date('2023-11-02T22:00:17')) },
          { x: getSecond(new Date('2023-12-03T23:00:00')), y: getDays(new Date('2023-12-03T23:00:00')) },
          // more data...
        ],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
      {
        label: 'Thực phẩm',
        data: [
          { x: getSecond(new Date('2023-01-01T00:20:01')), y: getDays(new Date('2023-01-01T00:20:01')) },
          { x: getSecond(new Date('2023-02-15T02:20:02')), y: getDays(new Date('2023-02-15T02:20:02')) },
          { x: getSecond(new Date('2023-01-01T03:20:01')), y: getDays(new Date('2023-01-01T03:20:01')) },
          { x: getSecond(new Date('2023-04-15T08:20:02')), y: getDays(new Date('2023-04-15T08:20:02')) },
          { x: getSecond(new Date('2023-05-01T05:20:01')), y: getDays(new Date('2023-05-01T05:20:01')) },
          { x: getSecond(new Date('2023-07-15T04:20:02')), y: getDays(new Date('2023-07-15T04:20:02')) },
          { x: getSecond(new Date('2023-08-01T07:20:01')), y: getDays(new Date('2023-08-01T07:20:01')) },
          { x: getSecond(new Date('2023-08-15T10:20:02')), y: getDays(new Date('2023-08-15T10:20:02')) },
          { x: getSecond(new Date('2023-09-06T00:20:01')), y: getDays(new Date('2023-09-06T00:20:01')) },
          { x: getSecond(new Date('2023-09-13T07:20:02')), y: getDays(new Date('2023-09-13T07:20:02')) },
          { x: getSecond(new Date('2023-09-01T03:20:01')), y: getDays(new Date('2023-09-01T03:20:01')) },
          { x: getSecond(new Date('2023-09-15T08:20:02')), y: getDays(new Date('2023-09-15T08:20:02')) },
          { x: getSecond(new Date('2023-10-11T05:20:01')), y: getDays(new Date('2023-10-11T05:20:01')) },
          { x: getSecond(new Date('2023-11-23T04:20:02')), y: getDays(new Date('2023-11-23T04:20:02')) },
          { x: getSecond(new Date('2023-11-24T07:20:01')), y: getDays(new Date('2023-11-24T07:20:01')) },
          { x: getSecond(new Date('2023-12-15T10:20:02')), y: getDays(new Date('2023-12-15T10:20:02')) },
          // more data...
        ],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.6)',
      },
      {
        label: 'Xã hội',
        data: [
          { x: getSecond(new Date('2023-01-01T03:00:00')), y: getDays(new Date('2023-01-01T03:00:00')) },
          { x: getSecond(new Date('2023-01-04T05:00:11')), y: getDays(new Date('2023-01-04T05:00:11')) },
          { x: getSecond(new Date('2023-01-03T07:00:12')), y: getDays(new Date('2023-01-03T07:00:12')) },
          { x: getSecond(new Date('2023-01-04T10:00:13')), y: getDays(new Date('2023-01-04T10:00:13')) },
          { x: getSecond(new Date('2023-01-05T13:00:14')), y: getDays(new Date('2023-01-05T13:00:14')) },
          { x: getSecond(new Date('2023-01-06T16:00:15')), y: getDays(new Date('2023-01-06T16:00:15')) },
          { x: getSecond(new Date('2023-01-10T19:00:16')), y: getDays(new Date('2023-01-10T19:00:16')) },
          { x: getSecond(new Date('2023-04-01T22:00:17')), y: getDays(new Date('2023-04-01T22:00:17')) },
          { x: getSecond(new Date('2023-05-06T09:00:00')), y: getDays(new Date('2023-05-06T09:00:00')) },
          { x: getSecond(new Date('2023-05-06T09:00:00')), y: getDays(new Date('2023-05-06T09:00:00')) },
          { x: getSecond(new Date('2023-06-06T09:00:11')), y: getDays(new Date('2023-06-06T09:00:11')) },
          { x: getSecond(new Date('2023-06-02T09:00:12')), y: getDays(new Date('2023-06-02T09:00:12')) },
          { x: getSecond(new Date('2023-07-02T10:00:13')), y: getDays(new Date('2023-07-02T10:00:13')) },
          { x: getSecond(new Date('2023-07-02T13:00:14')), y: getDays(new Date('2023-07-02T13:00:14')) },
          { x: getSecond(new Date('2023-08-02T14:00:15')), y: getDays(new Date('2023-08-02T14:00:15')) },
          { x: getSecond(new Date('2023-08-02T14:00:16')), y: getDays(new Date('2023-08-02T14:00:16')) },
          { x: getSecond(new Date('2023-09-02T21:00:17')), y: getDays(new Date('2023-09-02T21:00:17')) },
          { x: getSecond(new Date('2023-11-03T07:00:00')), y: getDays(new Date('2023-11-03T07:00:00')) },
          { x: getSecond(new Date('2023-11-02T07:00:17')), y: getDays(new Date('2023-11-02T07:00:17')) },
          { x: getSecond(new Date('2023-12-03T07:00:00')), y: getDays(new Date('2023-12-03T07:00:00')) },
          // more data...
        ],
        borderColor: 'rgb(235, 162, 53)',
        backgroundColor: 'rgba(235, 162, 53, 0.6)',
      },
    ],
  };
  
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: false,
        text: 'Scatter Plot - Times users check for fake news',
      },
    },
    scales: {
        x: {
          max: 86400,
          min: 0,
          ticks: {
            callback: function(val, index) {
              return '' + getXHours(val) + 'h';
            },
            stepSize: 3600,
            maxTicksLimit: 25,
            },
            title: {
              color: 'red',
              display: true,
              text: 'Hour'
            }
          },
      y: {
        beginAtZero: true,
        ticks: {
          padding: 10,
          max: 365,
          min: 0,
          callback: function(val, index) {
            if (val >= 0 && val < 30 || val >= 360 && val < 365){
              return "January"
            }
            else if(val >= 30 && val < 59){
              return "February"
            }
            else if(val >= 59 && val < 90){
              return "March"
            }
            else if(val >= 90 && val < 120){
              return "April"
            }
            else if(val >= 120 && val < 150){
              return "May"
            }
            else if(val >= 150 && val < 180){
              return "June"
            }
            else if(val >= 180 && val < 210){
              return "July"
            }
            else if(val >= 210 && val < 240){
              return "August"
            }
            else if(val >= 240 && val < 270){
              return "September"
            }
            else if(val >= 270 && val < 300){
              return "October"
            }
            else if(val >= 300 && val < 330){
              return "November"
            }
            else if(val >= 330 && val < 360){
              return "December"
            }
            else 
              return ''
          },
          stepSize: 30,
          maxTicksLimit: 13,
        },
        title: {
          color: 'red',
          display: true,
          text: 'Month'
        }
      },
    },
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7 pb-7 shadow sm:px-7.5 xl:col-span-6">
    <div className="flex w-full flex-col flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
      <p className="font-bold text-primary">Times User Check For Fake News</p>
            <Scatter data={data} options={options} />
    </div>
  </div>);
}

export default MyScatterPlot;
