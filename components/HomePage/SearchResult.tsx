"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

import { useSession } from "next-auth/react";
import { quickCheckClaim } from "@/utils/factCheck";

import Tag from "./Tag";
import ReactLoading from "react-loading";
import EvidenceItem from "./EvidenceItem";
import PopUp from "../PopUpNotification";
import { TfiAngleRight, TfiClose } from "react-icons/tfi";
import { useRouter } from "next/navigation";

interface Props {
  claim: string;
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

// Send data to API route
const SearchResult = (props: Props) => {
  const { data: session } = useSession();

  function forwardToGroup(groupId: number) {
    if (session) {
      window.open(`/fact-check/${groupId}`, "_blank");
      // push(`/fact-check/${groupId}`);
      return;
    }
    setErrorMsg("Vui lòng đăng nhập để lưu lịch sử kiểm tin");
    setIsError(true);
  }

  const [result, setResult] = React.useState({
    claim: "",
    provider: "",
    url: "",
    rating: 0,
    groupId: 0,
    css: cssProps[2],
    isLoading: true,
  });

  const [isError, setIsError] = React.useState<boolean>(false);
  const [errorMsg, setErrorMsg] = React.useState<string>("Lỗi không xác định");

  const [evidenceList, setEvidenceList] = useState<React.JSX.Element[]>([]);

  async function getClaim() {
    const request: FactCheckRequest = {
      claim: props.claim,
      email: session ? session.user!.email! : "guest",
      isQuick: true,
      groupId: -1,
    };

    try {
      const response = await quickCheckClaim(request);
      if (response.status === 404) {
        setResult({ ...result, isLoading: false });
        const errMsg: ErrorResponse = await response.json();
        setErrorMsg(errMsg.msg);
        setIsError(true);
      }

      if (response.ok) {
        const responseData: FactCheckResponse = await response.json();

        setResult({
          claim: responseData.claim,
          provider: responseData.provider,
          url: responseData.url,
          rating: responseData.final_label,
          groupId: responseData.groupId,
          css: cssProps[responseData.final_label],
          isLoading: false,
        });

        setEvidenceList(
          responseData.evidences.map((ele) => {
            return (
              <div className={"border-t border-solid " + result.css.border}>
                <EvidenceItem claim={ele.claim} evidence={ele.evidence} />
              </div>
            );
          })
        );
      }
    } catch (e) {
      console.log("Got error: ", e);
    }
  }

  useEffect(() => {
    getClaim();
  }, [props.claim]);

  return (
    <div>
      {isError && <PopUp msg={errorMsg} setCloseFunction={setIsError} />}

      {result.isLoading ? (
        <div className="flex justify-center">
          <ReactLoading type={"bars"} color={"000"} />
        </div>
      ) : (
        <div className="w-full my-10">
          <div className="flex ">
            <div
              className={
                "-mr-10 pr-10 w-44 flex items-center justify-center rounded-l-3xl transition-all duration-200 hover:brightness-125 " +
                result.css.background_2
              }
            >
              <TfiClose size={20}></TfiClose>
            </div>

            <div
              className={
                "flex-1 w-3/4 flex flex-col items-center justify-center p-10 rounded-3xl border-8 border-white border-solid z-30 " +
                result.css.background_1
              }
            >
              <Tag rating={result.rating}></Tag>
              <p className="text-lg">{result.claim}</p>
            </div>

            <div
              className={
                "-ml-10 pl-10 w-44 flex items-center justify-center rounded-r-3xl transition-all duration-200 hover:brightness-125 " +
                result.css.background_2
              }
              onClick={() => {
                forwardToGroup(result.groupId);
              }}
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
      )}
    </div>
  );
};

export default SearchResult;
