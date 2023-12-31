"use client";

import React, { useState } from "react";
import PopUpContainer from "../PopUpContainer";
import ReactLoading from "react-loading";
import { DeleteResultRequest } from "@/types/global";
import { useRouter } from "next/navigation";

interface Props {
  claimId: number;
  groupId: number;
  email: string;
  setCloseFunction: React.Dispatch<React.SetStateAction<boolean>>;
}

const PopUpDeleteResult = (props: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>("");
  const { push } = useRouter();

  // console.log(props.groupId)

  async function deleteClaim() {
    const request: DeleteResultRequest = {
      claimId: props.claimId,
      email: props.email,
    };

    setIsLoading(true);

    const res = await fetch("/api/delete-result", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...request,
      }),
    });

    if (res.ok) {
      const link: string = `/fact-check/${props.groupId}`;
      window.location.reload();
    } else {
      console.log("delete fail");
    }
  }

  const innerComponent = isLoading ? (
    msg === "" ? (
      <div>
        <ReactLoading type="bubbles" />
      </div>
    ) : (
      <div className="bg-white p-10 py-5 rounded-xl">{msg}</div>
    )
  ) : (
    <div className="bg-white p-10 rounded-xl">
      <p className="mb-4">Bạn có muốn xoá kết quả này?</p>
      <div className="flex justify-center items-center gap-10">
        <div
          className="bg-refuted_2 px-6 p-2 rounded-xl cursor-pointer hover:brightness-125 transition-all duration-200"
          onClick={() => {
            deleteClaim();
          }}
        >
          Có
        </div>
        <div
          className="px-6 p-2 border border-solid rounded-xl cursor-pointer hover:bg-black hover:text-white transition-all duration-200"
          onClick={() => {
            props.setCloseFunction(false);
          }}
        >
          Không
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <PopUpContainer
        innerComponent={innerComponent}
        setCloseFunction={props.setCloseFunction}
      />
    </div>
  );
};

export default PopUpDeleteResult;
