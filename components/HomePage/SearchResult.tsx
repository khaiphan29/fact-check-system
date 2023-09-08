import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Tag from "./Tag";
import styles from "@/styles/SearchResult.module.css";
import { TfiAngleRight, TfiClose } from "react-icons/tfi";
import { useSession } from "next-auth/react";
// import CSS from "csstype";

interface Props {
  claim: string;
}

interface DynamicBackground {
  bg_1: string;
  bg_2: string;
}

const dynamicBackground: DynamicBackground[] = [
  {
    bg_1: "var(--bg-neutral-1)",
    bg_2: "var(--bg-neutral-2)",
  },
  {
    bg_1: "var(--bg-approved-1)",
    bg_2: "var(--bg-approved-2)",
  },
  {
    bg_1: "var(--bg-refute-1)",
    bg_2: "var(--bg-refute-2)",
  },
];

const dynamicButton = [
  styles.btn_neutral,
  styles.btn_approved,
  styles.btn_refute,
];

// Send data to API route
const SearchResult = (props: Props) => {
  const { data: session } = useSession();

  const [result, setResult] = React.useState({
    claim: "",
    evidence: "",
    provider: "",
    url: "",
    rating: 0,
    groupId: 0,
    bg: dynamicBackground[0],
    btn: dynamicButton[0],
    isExist: false,
  });

  const scrollSection = useRef<HTMLDivElement>(null);

  async function fetchData() {
    try {
      const res: Response = await fetch(
        "http://localhost:3000/api/fact-check",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            claim: props.claim,
            email: session ? session.user?.email : "Guest",
            isQuick: true,
            groupId: -1
          }),
        }
      );

      const data: {
        rating: number;
        fact: string;
        claim: string;
        url: string;
        provider: string;
        groupId: number
      } = await res.json();
      // console.log(data);

      const rating = (data.rating < 3 && data.rating > 0) ? data.rating : 0;

      console.log(data);
      // console.log("Rating: ", data.rating);

      setResult({
        claim: data.claim,
        evidence: data.fact,
        provider: data.provider,
        url: data.url,
        rating: rating,
        groupId: data.groupId,
        bg: dynamicBackground[rating],
        btn: dynamicButton[rating],
        isExist: true,
      });
    } catch (e) {
      console.log("Claim submission error: ", e);
    }
  }

  useEffect(() => {
    fetchData();
  }, [props.claim]);

  const res = result.isExist ? (
    <div className={styles.container}>
      <div
        // style={{ background: myBackground.bg_2 }}
        className={`${styles.close_button} ${result.btn}`}
        onClick={() => setResult({ ...result, isExist: false })}
      >
        <TfiClose />
      </div>

      <div
        style={{ background: result.bg.bg_1 }}
        className={`${styles.result_container}`}
      >
        <div className={styles.claim_container}>
          <h2 className="heading-small">Nhận Định</h2>
          <p>{result.claim}</p>
        </div>

        <div className={styles.evidence_container}>
          <div className={styles.evidence_header}>
            <h2 className="heading-small">Minh Chứng</h2>
            <div>
              <a
                target="_blank"
                href={result.url}
                className={styles.evidence_url}
              >
                {result.provider}
              </a>
            </div>
          </div>
          <p>{result.evidence}</p>
        </div>
      </div>

      <div style={{ background: result.bg.bg_2 }} className={styles.nav}>
        <div ref={scrollSection} className={styles.nav_wrapper}>
          <Tag rating={result.rating} />
          <div>
            <ul>
              <li>
                <Link href={"/"}>
                  <div className={`${styles.nav_link}`}> Đánh Giá</div>
                </Link>
              </li>
              <li>
                <div className={`${styles.nav_link} ${styles.nav_link_more}`}>
                  <Link href={"/"}>Xem Them</Link>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Link
        href={`/fact-check/${result.groupId}`}
        // style={{ background: myBackground.bg_2 }}
        className={`${styles.forward_button} ${result.btn}`}
      >
        <TfiAngleRight />
      </Link>
    </div>
  ) : (
    <div></div>
  );

  return <div>{res}</div>;
};

export default SearchResult;
