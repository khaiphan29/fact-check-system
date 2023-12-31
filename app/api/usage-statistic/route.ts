import { NextResponse } from "next/server";
import prisma from "@/utils/prismaClient";
import {
  UsageStatisticResponse,
} from "@/types/global";
import { notFoundResponse } from "@/utils/routeHandler";

export async function POST(request: Request) {
  const month_hour = await prisma.$queryRaw<
    {
      created_month: string;
      created_hour: string;
      count: number;
    }[]
  >`
  SELECT 
  EXTRACT ("MONTH" from created_date) as created_month,
  EXTRACT ("HOUR" from created_date) as created_hour,
  COUNT (id) as count
  
  FROM public.claim
  
  where EXTRACT ("YEAR" from created_date)=2023
  
  GROUP BY EXTRACT ("MONTH" from created_date),
  EXTRACT ("DAY" from created_date),
  EXTRACT ("HOUR" from created_date)
  
  order by EXTRACT ("MONTH" from created_date),
  EXTRACT ("DAY" from created_date),
  EXTRACT ("HOUR" from created_date);
  `;

  let by_month: {
    month: number;
    by_hour: {
      hour: number;
      count: number;
    }[];
    by_day: {
      day: number;
      by_hour: {
        hour: number;
        count: number;
      }[];
    }[];
  }[] = [];

  let idx = 0;
  by_month.push({
    month: Number(month_hour[0].created_month),
    by_hour: [
      {
        hour: Number(month_hour[0].created_hour),
        count: Number(month_hour[0].count),
      },
    ],
    by_day: [],
  });

  for (let i = 1; i < month_hour.length; i++) {
    if (
      by_month[idx].month.toString() !== month_hour[i].created_month.toString()
    ) {
      idx++;
      by_month.push({
        month: Number(month_hour[i].created_month),
        by_hour: [],
        by_day: [],
      });
    }

    by_month[idx].by_hour.push({
      hour: Number(month_hour[i].created_hour),
      count: Number(month_hour[i].count),
    });
  }

  for (let i = 0; i < by_month.length; i++) {
    const day_hour = await prisma.$queryRaw<
      {
        created_day: string;
        created_hour: string;
        count: number;
      }[]
    >`
    SELECT 
    EXTRACT ("DAY" from created_date) as created_day,
    EXTRACT ("HOUR" from created_date) as created_hour,
    COUNT (id) as count

    FROM public.claim
    where EXTRACT ("YEAR" from created_date)=2023 AND
    EXTRACT ("MONTH" from created_date)=${by_month[i].month}

    GROUP BY EXTRACT ("MONTH" from created_date),
    EXTRACT ("DAY" from created_date),
    EXTRACT ("HOUR" from created_date)

    order by EXTRACT ("MONTH" from created_date) ,
    EXTRACT ("DAY" from created_date),
    EXTRACT ("HOUR" from created_date)

    `;
    let temp_idx = 0;
    by_month[i].by_day.push({
      day: Number(day_hour[0].created_day),
      by_hour: [
        {
          hour: Number(day_hour[0].created_hour),
          count: Number(day_hour[0].count),
        },
      ],
    });

    for (let hour_idx = 1; hour_idx < day_hour.length; hour_idx++) {
      if (
        by_month[i].by_day[temp_idx].day.toString() !==
        day_hour[hour_idx].created_day.toString()
      ) {
        temp_idx++;
        by_month[i].by_day.push({
          day: Number(day_hour[hour_idx].created_day),
          by_hour: [],
        });
      }
      

      by_month[i].by_day[temp_idx].by_hour.push({
        hour: Number(day_hour[hour_idx].created_hour),
        count: Number(day_hour[hour_idx].count),
      });
    }
  }

  const response: UsageStatisticResponse = {
    year: 2023,
    by_month: by_month,
  };

  prisma.$disconnect;
  return new NextResponse(JSON.stringify(response));
}
