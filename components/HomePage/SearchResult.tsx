"use client";

import Link from "next/link";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

import { useSession } from "next-auth/react";
import { getSingleClaim, quickCheckClaim } from "@/utils/factCheck";
import useDeviceSize from "@/utils/myHook";

import Tag from "./Tag";
// import ReactLoading from "react-loading";
import ResultLoading from "./ResultLoading";
import PopUpMsg from "../PopUp/PopUpMsg";
import PopUpLogin from "../PopUp/PopUpLogin";
import PopUpFeedback from "../PopUp/PopUpFeedback";
import PopUpDeleteResult from "../PopUp/PopUpDeleteResult";
import { IoIosArrowForward, IoMdClose, IoMdTrash } from "react-icons/io";
import { IoThumbsUpSharp, IoThumbsDownSharp } from "react-icons/io5";
// import { useRouter } from "next/navigation";
import {
  ClaimResult,
  ErrorResponse,
  FactCheckRequest,
  FactCheckResponse,
  SearchResultCSS,
} from "@/types/global";

interface Props {
  email?: string,
  claim?: string;
  claimDisplay?: ClaimResult;
  setClaim?: React.Dispatch<React.SetStateAction<string>>;
}

const cssProps: SearchResultCSS[] = [
  {
    background_1: "bg-refuted_1",
    background_2: "bg-refuted_2",
  },
  {
    background_1: "bg-approved_1",
    background_2: "bg-approved_2",
  },
  {
    background_1: "bg-neutral_1",
    background_2: "bg-neutral_2",
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
    setIsNotLgin(true);
  }

  const [result, setResult] = React.useState({
    claim: "",
    claimId: -1,
    evidence: [""],
    provider: "",
    url: "",
    rating: 0,
    groupId: 0,
    css: cssProps[2],
    isLoading: true,
  });

  // By default, line-clamp is set to 5 line for claim, when clicked, the claim is expanded and vice-versa
  const [lineClamp, setLineClamp] = useState<boolean>(true);
  const [showExpandBtn, setShowExpandBtn] = useState<boolean>(false);
  const [windowWidth, windowHeight] = useDeviceSize();

  const [isNotLogin, setIsNotLgin] = useState<boolean>(false);
  const [isError, setIsError] = React.useState<boolean>(false);
  const [errorMsg, setErrorMsg] = React.useState<string>("Lỗi không xác định");
  const [showFeedBack, setShowFeedBack] = useState<boolean>(false);
  const [isNegativeFeedback, setIsNegativeFeedback] = useState<boolean>(false);
  const [isShowDeleteResult, setIsShowDeleteResult] = useState<boolean>(false);

  const claimParagraph = useRef<HTMLParagraphElement>(null);

  async function getClaim() {
    try {
      const response = await quickCheckClaim({
        claim: props.claim!,
        email: props.email ? props.email : session ? session.user!.email! : "guest",
        isQuick: true,
        groupId: -1,
      });

      if (response.status === 404) {
        setResult({ ...result, isLoading: false });
        const errMsg: ErrorResponse = await response.json();
        setErrorMsg(errMsg.msg);
        setIsError(true);
      }

      if (response.ok) {
        const responseData: FactCheckResponse = await response.json();

        console.log(responseData);

        setResult({
          claimId: responseData.claimId,
          claim: responseData.claim,
          evidence: responseData.evidence.split("\n"),
          provider: responseData.provider,
          url: responseData.url,
          rating: responseData.final_label,
          groupId: responseData.groupId,
          css: cssProps[responseData.final_label],
          isLoading: false,
        });
      }
    } catch (e) {
      console.log("Got error: ", e);
      setIsError(true);
      props.setClaim && props.setClaim("");
    }
  }

  function setClaimDisplay() {
    setResult({
      ...props.claimDisplay!,
      claimId: props.claimDisplay!.id,
      evidence: props.claimDisplay!.evidence.split("\n"),
      groupId: props.claimDisplay!.groupId,
      css: cssProps[props.claimDisplay!.rating],
      isLoading: false,
    });
  }

  useEffect(() => {
    props.claimDisplay ? setClaimDisplay() : getClaim();
  }, [props.claim]);

  useEffect(() => {
    // console.log(windowWidth);
    if (
      claimParagraph.current &&
      claimParagraph.current.clientHeight < claimParagraph.current.scrollHeight
    ) {
      setShowExpandBtn(true);
    } else {
      setShowExpandBtn(false);
    }
  }, [windowWidth]);

  useLayoutEffect(() => {
    if (
      claimParagraph.current &&
      claimParagraph.current.clientHeight < claimParagraph.current.scrollHeight
    ) {
      setShowExpandBtn(true);
    }
  }, [claimParagraph.current]);

  return (
    <div>
      {isError && <PopUpMsg msg={errorMsg} setCloseFunction={setIsError} />}

      {isNotLogin && <PopUpLogin setCloseFunction={setIsNotLgin} />}

      {showFeedBack && (
        <PopUpFeedback
          isNegative={isNegativeFeedback}
          email={session ? session.user!.email! : "guest"}
          claimId={result.claimId}
          setCloseFunction={setShowFeedBack}
        />
      )}

      {isShowDeleteResult && (
        <PopUpDeleteResult
          email={session ? session.user!.email! : "guest"}
          claimId={result.claimId}
          groupId={result.groupId}
          setCloseFunction={setIsShowDeleteResult}
        />
      )}

      {result.isLoading ? (
        <div className="flex justify-center">
          <ResultLoading />
        </div>
      ) : (
        <div className={"w-full my-10 rounded-3xl "}>
          {/* ANCHOR HEADING */}
          <div
            className={
              "relative p-10 rounded-3xl z-0 " + result.css.background_2
            }
          >
            {!props.claimDisplay && (
              <div className="py-3 mb-10 border border-solid border-black flex justify-between items-center rounded-2xl">
                <div
                  className={
                    "pl-8 w-40 cursor-pointer transition-all duration-200 hover:pl-2 hover:scale-150 hover:translate-x-10"
                  }
                  onClick={() => {
                    props.setClaim && props.setClaim("");
                  }}
                >
                  <IoMdClose size={20} className="scale-150"></IoMdClose>
                </div>

                <div className={""}>
                  <Tag rating={result.rating}></Tag>
                </div>

                <div
                  className={
                    "relative pr-8 w-40 cursor-pointer flex justify-end transition-all duration-200 hover:pr-2 hover:scale-y-150 group"
                  }
                  onClick={() => {
                    console.log(session?.user);
                    forwardToGroup(result.groupId);
                  }}
                >
                  {/* purple box */}
                  <span className="w-0 h-0 rounded bg-purple-600 absolute top-0 left-0 ease-out duration-500 transition-all group-hover:w-full group-hover:h-full -z-1"></span>
                  <IoIosArrowForward
                    size={20}
                    className="scale-150"
                  ></IoIosArrowForward>
                </div>
              </div>
            )}

            <p
              ref={claimParagraph}
              className={
                "text-4xl font-semibold leading-[1.2] " +
                (lineClamp && "line-clamp-3")
              }
            >
              {result.claim}
            </p>
            {showExpandBtn && (
              <div
                className="relative w-full items-end cursor-pointer"
                onClick={() => {
                  setLineClamp(!lineClamp);
                }}
              >
                <p className="absolute right-0">
                  {lineClamp ? "Xem đầy đủ" : "Rút gọn"}
                </p>
              </div>
            )}
          </div>

          <div
            className={
              "text-lg -mt-10 p-10 pt-20 rounded-3xl bg-opacity-60 " +
              result.css.background_1
            }
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-semibold">
                  {result.rating < 2 ? "Minh Chứng" : "Không xác định"}
                </h2>

                {result.rating < 2 && (
                  <div>
                    {"Nguồn: "}
                    <a
                      href={result.url}
                      target="_blank"
                      className="text-blue brightness-150"
                    >
                      {result.provider}
                    </a>
                  </div>
                )}
              </div>
              <div className="flex gap-5 items-center">
                <div
                  className="cursor-pointer hover:scale-125 hover:text-blue hover:brightness-150
                    transition-all duration-200"
                  onClick={() => {
                    setIsNegativeFeedback(false);
                    setShowFeedBack(true);
                    // setTimeout(() => {

                    // }, 1000);
                  }}
                >
                  <IoThumbsUpSharp size={20} />
                </div>

                <div
                  className="cursor-pointer hover:scale-125 hover:text-refuted_2
                    transition-all duration-200"
                  onClick={() => {
                    setIsNegativeFeedback(true);
                    setShowFeedBack(true);
                    // setTimeout(() => {

                    // }, 1000);
                  }}
                >
                  <IoThumbsDownSharp size={20} />
                </div>

                {session && (
                  <div
                    className="cursor-pointer hover:scale-125 hover:text-purple
                  transition-all duration-200"
                    onClick={() => {
                      setIsShowDeleteResult(true);
                    }}
                  >
                    <IoMdTrash size={25} />
                  </div>
                )}
              </div>
            </div>

            {result.rating < 2 && (
              <div className="mt-6 flex flex-col gap-3 ">
                {result.evidence.map(
                  (ele) =>
                    !ele.toLowerCase().includes("ảnh") && (
                      <p className="leading-7 first-letter:capitalize">{ele}</p>
                    )
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResult;
