import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/FactCheckPage/ClaimResult.module.css";
import approved_tag from "@/public/assets/icons/tag_approved.svg";
import refuted_tag from "@/public/assets/icons/tag_refute.svg";
import neutral_tag from "@/public/assets/icons/tag_neutral.svg";
import { TfiInfoAlt, TfiWrite } from "react-icons/tfi";

interface Props {
  id: string;
  rating: number;
  claim: string;
  evidence: string;
  evidence_provider: string;
  url: string;
}

const Result = (props: Props) => {
  const bg =
    props.rating === 1
      ? "var(--bg-approved-1)"
      : props.rating === 2
      ? "var(--bg-refute-1)"
      : "var(--bg-neutral-1)";
  return (
    <div className={styles.container}>
      <div className={styles.content_container}>
        <div style={{ background: bg }} className={styles.main_content}>
          <Image
            src={
              props.rating === 1
                ? approved_tag
                : props.rating === 2
                ? refuted_tag
                : neutral_tag
            }
            height={20}
            width={20}
            alt="approved tag"
            className={styles.left_img}
          ></Image>
          {props.claim}
          <TfiWrite size={20} className={styles.right_img} />
        </div>
      </div>
      <div className={styles.content_container}>
        <div className={styles.main_content}>
          <TfiInfoAlt size={20} className={styles.left_img} />
          {props.rating === 0 ? "Không xác định" : props.evidence}
          {props.rating === 0 ? null : (
            <Link target="_blank" href={props.url} className={styles.right_url}>
              {props.evidence_provider}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Result;
