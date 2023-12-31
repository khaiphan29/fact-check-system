import { NextResponse } from "next/server";
import prisma from "@/utils/prismaClient";
import { FactCheckStatistic, FactCheckStatisticResponse } from "@/types/global";
import { notFoundResponse } from "@/utils/routeHandler";

async function getPopularSource(month?: number) {
  const popular_source = month
    ? await prisma.$queryRaw<
        {
          name: string;
          count: number;
        }[]
      >`
  select 
  es.name,
  count (e.id) as count
  from 
  evidence e ,
  evidence_source es
  where e.provider_id = es.id 
  and EXTRACT ("Month" from e.created_date) = ${month}
  group by
  es.name
  order by count (e.id) desc
  limit 1
  `
    : await prisma.$queryRaw<
        {
          name: string;
          count: number;
        }[]
      >`
  select 
  es.name,
  count (e.id) as count
  from 
  evidence e ,
  evidence_source es
  where e.provider_id = es.id
  group by
  es.name
  order by count (e.id) desc
  limit 1
`;
  return popular_source[0].name;
}

export async function POST(request: Request) {
  const total_2023_fact_check = await prisma.claim.aggregate({
    where: {
      created_date: {
        gte: new Date(2023, 0, 1),
        lt: new Date(),
      },
    },
    _count: {
      id: true,
    },
  });

  const total_2023_fact_check_rating = await prisma.claim.groupBy({
    by: ["label_tag"],
    where: {
      created_date: {
        gte: new Date(2023, 0, 1),
        lt: new Date(),
      },
    },
    _count: {
      id: true,
    },
  });

  const monthly_statistic = await prisma.$queryRaw<
    {
      created_month: string;
      created_day: string;
      rating: number;
      count: number;
    }[]
  >`
  SELECT 
  EXTRACT ("MONTH" from created_date) as created_month,
  EXTRACT ("DAY" from created_date) as created_day,
  label_tag as rating,
  COUNT (id) as count
  FROM public.claim
  where EXTRACT ("YEAR" from created_date)=2023
  GROUP BY EXTRACT ("MONTH" from created_date),
  EXTRACT ("DAY" from created_date),
  label_tag
  order by EXTRACT ("MONTH" from created_date) ,
  EXTRACT ("DAY" from created_date),
  label_tag
  `;

  let by_month: {
    month: number;
    statistic: FactCheckStatistic;
    popular_source: string;
    by_day: {
      day: number;
      statistic: FactCheckStatistic;
    }[];
  }[] = [];

  const init_statistic: FactCheckStatistic = {
    total_fact_check: 0,
    total_refuted: 0,
    total_approved: 0,
    total_neutral: 0,
  };

  //   for (let i: number = 0; i < 12; i++) {
  //     by_month.push({
  //       month: i + 1,
  //       general: init_statistic,
  //       by_day: [],
  //     });
  //   }

  let idx = 0;
  let init_count = Number(monthly_statistic[0].count);
  const init_popular_source = await getPopularSource(
    Number(monthly_statistic[0].created_month)
  );

  by_month.push({
    month: Number(monthly_statistic[0].created_month),
    popular_source: init_popular_source,
    statistic: {
      total_fact_check: init_count,
      total_refuted: monthly_statistic[0].rating === 0 ? init_count : 0,
      total_approved: monthly_statistic[0].rating === 1 ? init_count : 0,
      total_neutral: monthly_statistic[0].rating === 2 ? init_count : 0,
    },
    by_day: [
      {
        day: Number(monthly_statistic[0].created_day),
        statistic: {
          total_fact_check: init_count,
          total_refuted: monthly_statistic[0].rating === 0 ? init_count : 0,
          total_approved: monthly_statistic[0].rating === 1 ? init_count : 0,
          total_neutral: monthly_statistic[0].rating === 2 ? init_count : 0,
        },
      },
    ],
  });

  for (let i = 1; i < monthly_statistic.length; i++) {
    const day_count = Number(monthly_statistic[i].count);
    if (
      monthly_statistic[i].created_month.toString() !==
      by_month[idx].month.toString()
    ) {
      //   console.log(monthly_statistic[i].created_month.toString());
      //   console.log(by_month[idx].month);
      //   console.log(monthly_statistic[i].created_month !== by_month[idx].month);

      idx++;
      by_month.push({
        month: Number(monthly_statistic[i].created_month),
        popular_source: await getPopularSource(
          Number(monthly_statistic[i].created_month)
        ),
        statistic: {
          total_fact_check: day_count,
          total_refuted: monthly_statistic[i].rating === 0 ? day_count : 0,
          total_approved: monthly_statistic[i].rating === 1 ? day_count : 0,
          total_neutral: monthly_statistic[i].rating === 2 ? day_count : 0,
        },
        by_day: [
          {
            day: Number(monthly_statistic[i].created_day),
            statistic: {
              total_fact_check: day_count,
              total_refuted: monthly_statistic[i].rating === 0 ? day_count : 0,
              total_approved: monthly_statistic[i].rating === 1 ? day_count : 0,
              total_neutral: monthly_statistic[i].rating === 2 ? day_count : 0,
            },
          },
        ],
      });
    } else {
      by_month[idx].statistic.total_fact_check += day_count;
      if (monthly_statistic[i].rating === 0) {
        by_month[idx].statistic.total_refuted += day_count;
      } else if (monthly_statistic[i].rating === 1) {
        by_month[idx].statistic.total_approved += day_count;
      } else {
        by_month[idx].statistic.total_neutral += day_count;
      }

      let found: boolean = false;
      for (let day_idx = 0; day_idx < by_month[idx].by_day.length; day_idx++) {
        if (
          monthly_statistic[i].created_day.toString() ===
          by_month[idx].by_day[day_idx].day.toString()
        ) {
          found = true;
          by_month[idx].by_day[day_idx].statistic.total_fact_check += day_count;

          if (monthly_statistic[i].rating === 0) {
            by_month[idx].by_day[day_idx].statistic.total_approved += day_count;
          } else if (monthly_statistic[i].rating === 1) {
            by_month[idx].by_day[day_idx].statistic.total_approved += day_count;
          } else {
            by_month[idx].by_day[day_idx].statistic.total_neutral += day_count;
          }
        }
      }

      if (!found) {
        by_month[idx].by_day.push({
          day: Number(monthly_statistic[i].created_day),
          statistic: {
            total_fact_check: day_count,
            total_refuted: monthly_statistic[i].rating === 0 ? day_count : 0,
            total_approved: monthly_statistic[i].rating === 1 ? day_count : 0,
            total_neutral: monthly_statistic[i].rating === 2 ? day_count : 0,
          },
        });
      }
    }
  }

  const total_2023_popular_source = await getPopularSource();

  const response: FactCheckStatisticResponse = {
    year: 2023,
    popular_source: total_2023_popular_source,
    statistic: {
      total_fact_check: total_2023_fact_check._count.id,
      total_approved: total_2023_fact_check_rating[1]._count.id,
      total_refuted: total_2023_fact_check_rating[0]._count.id,
      total_neutral: total_2023_fact_check_rating[2]._count.id,
    },
    by_month: by_month,
  };

  prisma.$disconnect;
  return new NextResponse(JSON.stringify(response));
}
