import React from "react";
import Link from "next/link";
import Image from "next/image";
import Tag from "./Tag";
import approved from "@/public/assets/icons/tag_approved.svg";
import refute from "@/public/assets/icons/tag_refute.svg";
import neutral from "@/public/assets/icons/tag_neutral.svg";
import styles from "@/styles/News.module.css";

interface Props {
  claim: string;
  rating: number;
}

// https://i.imgflip.com/30b1gx.jpg
// https://assets.awwwards.com/awards/media/cache/academy_thumb/course/614db3dc3df5c206676448.jpg

const NewsCard = (props: Props) => {
  const random = Math.floor(Math.random() + 0.5);
  const imgSrc = random
    ? "https://images.unsplash.com/photo-1609057339730-79faac0a5e3c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=989&q=80"
    : "https://images.unsplash.com/photo-1603145733316-7462e5ecd80d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80";
  return (
    <div className={styles.card}>
      <Link href={"/"}>
        <div className={styles.card_img_container}>
          <Image
            className={styles.card_img}
            src={imgSrc}
            alt={`Advanced Motion Techniques Mixing  2D &amp; 3D`}
            width={500}
            height={500}
          ></Image>
          <div className={styles.card_tag}>
            <Image
              src={
                props.rating === 1
                  ? approved
                  : props.rating === 2
                  ? refute
                  : neutral
              }
              width={20}
              height={20}
              alt="tag"
            />
          </div>
          <div className={styles.card_category}>
            <p>Bài Phân Tích</p>
          </div>
        </div>
      </Link>

      <div className={styles.card_body}>
        <h4 className={styles.card_title}>
          <Link href={"/"}>
            {/* Never grow longer than 20 words */}
            Xử vụ chuyến bay giải cứu: Đối chất hơn 400 cuộc gọi giữa cựu Thiếu
            tướng và cựu điều tra viên
          </Link>
        </h4>

        <p className={`p-preview ${styles.card_claim}`}>{props.claim}</p>

        {/* <div className="news-card__bottom">
          <Image src={arrow.src} alt="Read News" width="40" height="40"></Image>
        </div> */}
      </div>
    </div>
  );
};

export default NewsCard;
