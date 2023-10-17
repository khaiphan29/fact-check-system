import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Tag from "./Tag";
import styles from "@/styles/SearchResult.module.css";
import { TfiAngleRight, TfiClose } from "react-icons/tfi";
import { useSession } from "next-auth/react";
import EvidenceItem from "./EvidenceItem";
import { checkClaim } from "@/utils/factCheck";
import { request } from "http";
// import CSS from "csstype";

interface Props {
  claim: string;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const cssProps: SearchResultCSS[] = [
  {
    background_1: "bg-refuted_1",
    background_2: "bg-refuted_2",
    border: "border-refuted_2",
  },
  {
    background_1: "bg-approved_1",
    background_2: "bg-approved_2",
    border: "border-approved_2",
  },
  {
    background_1: "bg-neutral_1",
    background_2: "bg-neutral_2",
    border: "border-neutral_2",
  },
];

const dynamicButton = [
  styles.btn_refute,
  styles.btn_approved,
  styles.btn_neutral,
];

// Send data to API route
const SearchResult = (props: Props) => {
  const { data: session } = useSession();

  const [result, setResult] = React.useState({
    claim: "",
    provider: "",
    url: "",
    rating: 0,
    groupId: 0,
    css: cssProps[2],
    btn: dynamicButton[0],
    isExist: true,
  });

  const [evidenceList, setEvidenceList] = useState<React.JSX.Element[]>([]);

  // const scrollSection = useRef<HTMLDivElement>(null);

  async function getClaim() {
    const request: FactCheckRequest = {
      claim: props.claim,
      email: session ? session.user!.email! : "Guest",
      isQuick: true,
      groupId: -1,
    };

    try {
      const response = await checkClaim(request);

      console.log("Set Result with", response.claim);

      setResult({
        claim: response.claim,
        provider: response.provider,
        url: response.url,
        rating: response.final_label,
        groupId: response.groupId,
        css: cssProps[response.final_label],
        btn: dynamicButton[response.final_label],
        isExist: true,
      });

      setEvidenceList(
        response.evidences.map((ele) => {
          return (
            <div className={"border-t border-solid " + result.css.border}>
              <EvidenceItem claim={ele.claim} evidence={ele.evidence} />
            </div>
          );
        })
      );

      console.log(result);
    } catch (e) {
      console.log("Got error: ", e);
    }
  }

  useEffect(() => {
    getClaim();
  }, [props.claim]);

  const res = result.isExist ? (
    <div className="w-full my-10">
      <div className="flex ">
        <div
          className={
            "-mr-10 pr-10 w-44 flex items-center justify-center rounded-l-3xl transition-all duration-200 " + `hover:${result.css.background_1} `  +
            result.css.background_2
          }
        >
          <TfiClose size={20}></TfiClose>
        </div>

        <div
          className={
            "flex-1 w-3/4 flex flex-col items-center justify-center p-10 rounded-3xl border-8 border-white border-solid z-50 " +
            result.css.background_1
          }
        >
          <Tag rating={result.rating}></Tag>
          <p className="text-lg">{result.claim}</p>
        </div>

        <div
          className={
            "-ml-10 pl-10 w-44 flex items-center justify-center rounded-r-3xl " + `hover:${result.css.background_1} `  +
            result.css.background_2
          }
        >
          <TfiAngleRight size={20}></TfiAngleRight>
        </div>
      </div>

      <div
        className={
          "mx-auto w-11/12 max-h-max overflow-scroll border-8 border-t-0 border-solid rounded-b-3xl " +
          result.css.border
        }
      >
        {evidenceList}
      </div>
    </div>
  ) : (
    <div></div>
  );

  return <div>{res}</div>;
};

export default SearchResult;
