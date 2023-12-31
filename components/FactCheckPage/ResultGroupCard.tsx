import React from "react";
// import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/FactCheckPage/FactCheckMgmt.module.css";
import { usePathname, useRouter } from "next/navigation";
import { TfiCommentAlt, TfiPencilAlt, TfiClose } from "react-icons/tfi";

interface Props {
  id: number;
  title: string;
}

const ResultGroup = (props: Props) => {
  const path = usePathname().split("/");
  const router = useRouter();
  let isActive = false;

  isActive = path[path.length - 1] === props.id.toString();

  async function fetchDelete() {
    const res: Response = await fetch("/api/delete-fact-check-group", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: props.id,
        name: props.title,
      }),
    });

    if (res.ok) {
      router.push("/fact-check");
    }
  }

  function handleDelete() {
    fetchDelete();
  }

  return (
    <Link href={`/fact-check/${props.id}`}>
      <div
        className={`${styles.card_container} ${
          isActive ? styles.card_active : ""
        }`}
      >
        <div className={styles.card_left}>
          {/* <div className={styles.card_img}>
            <TfiCommentAlt size={20} />
          </div> */}
          <p className={styles.card_title}>{props.title}</p>
        </div>

        {isActive && props.title != "Kiểm Tin Nhanh" && (
          <div className={styles.card_right}>
            <div className={styles.card_btn}>
              <TfiPencilAlt />
            </div>

            <div className={styles.card_btn} onClick={handleDelete}>
              <TfiClose />
            </div>
          </div>
        )}
      </div>
    </Link>
  );
};

export default ResultGroup;
