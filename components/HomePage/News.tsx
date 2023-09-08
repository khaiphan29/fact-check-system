import React from "react";
import Link from "next/link";
import NewsCard from "./NewsCard";
import styles from "@/styles/News.module.css";
import { TfiAngleRight } from "react-icons/tfi";

const claimArr = [
  "Our simple model shows that modest efficacy of masks could avert substantial mortality in this scenario.",
  "Importantly, the effects on mortality became hyper-sensitive to mask-wearing as the effective R approaches 1, i.e. near the tipping point of when the infection trajectory is expected to revert to exponential growth, as would be expected after effective lockdown. Our model suggests that mask-wearing might exert maximal benefit as nations plan their post-lockdown strategies and suggests that mask-wearing should be included in further more sophisticated models of the current pandemic.",
  "Our simple model shows that modest efficacy of masks could avert substantial mortality in this scenario. Importantly, the effects on mortality became hyper-sensitive to mask-wearing as the effective R approaches 1, i.e post-lockdown strategies and suggests that mask-wearing should be included in further more sophisticated models of the current pandemic.",
  "Our simple model shows that modest efficacy of masks could avert substantial mortality in this scenario. Importantly, the effects on mortality became hyper-sensitive to mask-wearing as the effective R approaches 1, i.e post-lockdown strategies and suggests that mask-wearing should be included in further more sophisticated models of the current pandemic.",
];

const News = () => {
  let newsCard: React.ReactNode[] = claimArr.map<React.ReactNode>(
    (ele: string) => {
      return <NewsCard claim={ele} rating={1} />;
    }
  );
  return (
    <div className={styles.container}>
      <div className={styles.heading_section}>
        <h2 className={`heading-small ${styles.title}`}>Bài phân tích</h2>
        <Link href={"/post"} className={styles.more_btn}>
          Xem thêm
          <div className={styles.more_btn_arrow}>
            <TfiAngleRight />
          </div>
        </Link>
      </div>

      <div className={styles.card_container}>{newsCard}</div>
    </div>
  );
};

export default News;
