import React from "react";
import NewsCard from "./NewsCard";

const claimArr = [
  "Our simple model shows that modest efficacy of masks could avert substantial mortality in this scenario. Importantly, the effects on mortality became hyper-sensitive to mask-wearing as the effective R approaches 1, i.e. near the tipping point of when the infection trajectory is expected to revert to exponential growth, as would be expected after effective lockdown. Our model suggests that mask-wearing might exert maximal benefit as nations plan their post-lockdown strategies and suggests that mask-wearing should be included in further more sophisticated models of the current pandemic.",
  "Our simple model shows that modest efficacy of masks could avert substantial mortality in this scenario. Importantly, the effects on mortality became hyper-sensitive to mask-wearing as the effective R approaches 1, i.e. near the tipping point of when the infection trajectory is expected to revert to exponential growth, as would be expected after effective lockdown. Our model suggests that mask-wearing might exert maximal benefit as nations plan their post-lockdown strategies and suggests that mask-wearing should be included in further more sophisticated models of the current pandemic.",
  "Our simple model shows that modest efficacy of masks could avert substantial mortality in this scenario. Importantly, the effects on mortality became hyper-sensitive to mask-wearing as the effective R approaches 1, i.e. near the tipping point of when the infection trajectory is expected to revert to exponential growth, as would be expected after effective lockdown. Our model suggests that mask-wearing might exert maximal benefit as nations plan their post-lockdown strategies and suggests that mask-wearing should be included in further more sophisticated models of the current pandemic.",
];

const News = () => {
  let newsCard: React.ReactNode[] = claimArr.map<React.ReactNode>(
    (ele: string) => {
      return <NewsCard claim={ele} rating={1} />;
    }
  );
  return (
    <div className="news">
      <h2 className="heading-small news__title">Bài viết</h2>
      <h3 className="news__subtitle">
        Phân tích chuyên sâu
        <br />
        về những nhận định
      </h3>
      <div className="news__grid">{newsCard}</div>
    </div>
  );
};

export default News;
