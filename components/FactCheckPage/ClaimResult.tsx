import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/FactCheckPage/ClaimResult.module.css";
import Tag from "../HomePage/Tag";
import { TfiInfoAlt, TfiWrite } from "react-icons/tfi";
import { ClaimResult } from "@/types/global";

interface Props extends ClaimResult {
  setPopUpID: React.Dispatch<React.SetStateAction<number>>;
}

const Result = (props: Props) => {
  const bg_1 =
    props.rating === 0
      ? "bg-refuted_1"
      : props.rating === 1
      ? "bg-approved_1"
      : "bg-neutral_1";

  const bg_2 =
    props.rating === 0
      ? "bg-refuted_2"
      : props.rating === 1
      ? "bg-approved_2"
      : "bg-neutral_2";

  return (
    <div
      className={"p-5 mb-5 bg-opacity-50 cursor-pointer rounded-3xl transition-all duration-200 ease-in-out hover:scale-105  " + bg_1}
      onClick={() => {
        props.setPopUpID(props.id);
      }}
    >
      <p className="font-semibold text-xl line-clamp-5">{props.claim}</p>
      <p>{props.evidence}</p>
    </div>
  );
};

export default Result;
