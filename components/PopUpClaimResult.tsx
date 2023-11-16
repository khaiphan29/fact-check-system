import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

import Tag from "./HomePage/Tag";
import PopUp from "./PopUpNotification";
import ReactLoading from "react-loading";
import EvidenceItem from "./HomePage/EvidenceItem";
import { TfiAngleRight, TfiClose } from "react-icons/tfi";
import { getSingleClaim } from "@/utils/factCheck";

interface Props {
  claimId: number;
  email: string;
  setPopUpID: React.Dispatch<React.SetStateAction<number>>;
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
const PopUpClaimResult = (props: Props) => {
  const { data: session } = useSession();

  const [result, setResult] = React.useState({
    claimId: -1,
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
    const request: SingleClaimRequest = {
      claimId: props.claimId,
      email: props.email,
    };

    try {
      const response = await getSingleClaim(request);
      if (response.status === 404) {
        setResult({ ...result, isLoading: false });
        const errMsg: ErrorResponse = await response.json();
        setErrorMsg(errMsg.msg);
        setIsError(true);
      }

      if (response.ok) {
        const responseData: SingleClaimResponse = await response.json();

        setResult({
          claimId: responseData.claimId,
          claim: responseData.claim,
          provider: responseData.provider,
          url: responseData.url,
          rating: responseData.final_label,
          groupId: responseData.groupId,
          css: cssProps[responseData.final_label],
          isLoading: false,
        });

        console.log("Single Claim");
        console.log(responseData);

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
  }, []);

  return (
    <div className="">
      {isError && <PopUp msg={errorMsg} setCloseFunction={setIsError} />}

      {/* Background */}
      <div
        className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-md z-40 transition-all duration-200"
        onClick={() => {
          props.setPopUpID(-1);
        }}
      ></div>

      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-10 bg-white opacity-100 rounded-2xl text-lg z-50 max-h-[90vh] min-w-[90vw] overflow-x-hidden overflow-y-scroll"
        onClick={() => {}}
      >
        {result.isLoading ? (
          <div></div>
        ) : (
          <div className="mx-auto w-max z-50 bg-black rounded-3xl py-2 px-10 text-xl font-light text-white cursor-pointer">
            Đánh Giá
          </div>
        )}
        {result.isLoading ? (
          <div className="flex justify-center">
            <ReactLoading type={"bars"} color={"000"} />
          </div>
        ) : (
          <div className="w-full my-10">
            {/* Danh gia */}

            <div className="flex ">
              <div
                className={
                  "flex-1 w-3/4 flex flex-col items-center justify-center p-10 rounded-3xl border-8 border-white border-solid z-30 " +
                  result.css.background_1
                }
              >
                <Tag rating={result.rating}></Tag>
                <p className="text-lg">{result.claim}</p>
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
    </div>
  );
};

export default PopUpClaimResult;
