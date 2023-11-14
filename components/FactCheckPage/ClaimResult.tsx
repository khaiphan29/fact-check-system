import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/FactCheckPage/ClaimResult.module.css";
import Tag from "../HomePage/Tag";
import { TfiInfoAlt, TfiWrite } from "react-icons/tfi";

const Result = (props: ClaimResult) => {
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

  const border =
    props.rating === 0
      ? "border-refuted_1"
      : props.rating === 1
      ? "border-approved_1"
      : "border-neutral_1";

  return (
    <div className="rounded-3xl transition-all duration-200 hover:scale-105">
      <div className={"py-4 rounded-3xl " + bg_2}>
        <div className="w-max mx-auto">
          <Tag rating={props.rating}></Tag>
        </div>
      </div>

      <div>
        <p
          className={"text-justify text-base border-2 border-t-0 border-solid rounded-b-3xl p-4 " + border}
        >
          {props.claim}
        </p>
      </div>
    </div>
  );
};

export default Result;
