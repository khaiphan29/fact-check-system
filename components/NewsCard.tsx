import React from "react";
import Link from "next/link";
import Image from "next/image";
import Tag from "./Tag";
import arrow from "@/public/assets/icons/left-arrow.svg";

interface Props {
  claim: string;
  rating: number;
}

// https://i.imgflip.com/30b1gx.jpg
// https://assets.awwwards.com/awards/media/cache/academy_thumb/course/614db3dc3df5c206676448.jpg

const NewsCard = (props: Props) => {
  return (
    <div className="news-card">
      <img
        data-controller="lazyload-image"
        className="news-card__img"
        src={"https://cdn-i.vtcnews.vn/resize/th/upload/2023/07/11/xu-chuyen-bay-giai-cuu-14223671.jpeg"}
        alt="Advanced Motion Techniques Mixing  2D &amp; 3D"
      ></img>

      <div className="news-card__body">
        <div className="news-card__title-container">
          <h4 className="news-card__title">
            <Link href={"/"}> 
            {/* Never grow longer than 20 words */}
            Xử vụ chuyến bay giải cứu: Đối chất hơn 400 cuộc gọi giữa cựu Thiếu tướng và cựu điều tra viên
            </Link>
          </h4>
        </div>
        <h2 className="heading-small news-card__heading">Nhận định</h2>
        <p className="p-preview news-card__content">{props.claim}</p>

        <div className="news-card__bottom">
          <Tag rating={1} />
          <Image src={arrow.src} alt="Read News" width="40" height="40"></Image>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
