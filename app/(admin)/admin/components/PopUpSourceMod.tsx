"use client";

import React, { FormEvent, useState } from "react";
import Link from "next/link";
import "@/styles/login-register.css";
import PopUpContainer from "@/components/PopUpContainer";
import ReactLoading from "react-loading";
import ScrapingHistoryTable from "./ScrapingHistoryTable";

interface Props {
  id: number;
  name: string;
  url: string;
  setCloseFunction: React.Dispatch<React.SetStateAction<boolean>>;
}

const PopUpSourceMod = (props: Props) => {
  const [formData, setFormData] = useState({
    url: props.url,
  });

  const [showHistory, setShowHistory] = useState<boolean>(false);

  // function handleChange(e: React.ChangeEvent) {
  // }
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    setLoading(true);
    const res = await fetch("/api/update-source-url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: props.id,
        source: props.name,
        url: formData.url,
      }),
    });

    if (res.ok) {
      window.location.reload();
    } else if (res.status === 404) {
      setLoading(false);
      setErrorMsg(`URL Không thuộc ${props.name}`);
    }
  }

  const form = (
    <form
      className="w-[70vw] flex flex-col gap-5 rounded-xl"
      onSubmit={handleSubmit}
    >
      <div>
        Sửa URL khai thác cho{" "}
        <span className="font-bold text-2xl">{props.name}</span>
      </div>

      {errorMsg && <div className="text-red_alert mt-5">{errorMsg}</div>}
      <div className="flex gap-5">
        <input
          className="p-5 flex-grow border border-solid border-black border-opacity-30 rounded-2xl"
          type="url"
          id="registerForm_name"
          placeholder="Tên"
          autoFocus={true}
          onChange={(e) => {
            setFormData({
              url: e.target.value,
            });
            setErrorMsg("");
          }}
          value={formData.url}
        />
        <button
          type="submit"
          className="bg-black text-white p-5 px-10 w-fit rounded-2xl"
        >
          Thay đổi
        </button>
      </div>
    </form>
  );

  const loadingComp = <ReactLoading type={"cylon"} color={"black"} />;

  const historyListComp = <ScrapingHistoryTable name={props.name} />;

  const finalComp = (
    <div className=" max-h-[80vh] bg-white p-5 py-10 rounded-2xl">
      {loading ? loadingComp : form}
      <div className="mt-5 w-full cursor-pointer ">
        <p
          className="m-auto w-fit hover:text-blue"
          onClick={() => setShowHistory(!showHistory)}
        >
          {!showHistory ? "Xem" : "Ẩn"} lịch sử kiểm tra
        </p>
      </div>
      {showHistory && historyListComp}
    </div>
  );
  return (
    <div>
      <PopUpContainer
        innerComponent={finalComp}
        setCloseFunction={props.setCloseFunction}
      />
    </div>
  );
};

export default PopUpSourceMod;
