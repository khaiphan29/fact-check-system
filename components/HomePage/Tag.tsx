import React from "react";
import Image from "next/image";
import approved from "@/public/assets/icons/tag_approved.svg";
import refute from "@/public/assets/icons/tag_refute.svg";
import neutral from "@/public/assets/icons/tag_neutral.svg";
import styles from "@/styles/Tag.module.css";

const Tag = (props: { rating: number }) => {
  const image: any =
    props.rating === 1 ? approved : props.rating === 0 ? refute : neutral;

  const bg: string =
    props.rating === 1
      ? styles.bg_tag_approved
      : props.rating === 0
      ? styles.bg_tag_refute
      : styles.bg_tag_neutral;

  const cssProps: string[] = [
    "text-refuted_2",
    "text-approved_2",
    "text-neutral_2",
  ];

  return (
    <div className={`${styles.container} ${bg} gap-4`}>
      <Image src={image.src} alt="tag" width={25} height={25}></Image>
      <p
        className={
          "uppercase text-base font-semibold "
        }
      >
        {props.rating === 1
          ? "Tin xác thực"
          : props.rating === 0
          ? "Tin giả"
          : "Không xác định"}
      </p>
    </div>
  );
};

export default Tag;
