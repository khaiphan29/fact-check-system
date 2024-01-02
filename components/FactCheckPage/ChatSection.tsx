"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "@/styles/FactCheckPage/ChatSection.module.css";
import SearchResult from "../HomePage/SearchResult";
import SearchForm from "@/components/SearchForm";

import { getGroupResult } from "@/utils/factCheck";
import { notFound } from "next/navigation";
import { FactCheckResponse, GroupResultResponse } from "@/types/global";
import ResultLoading from "../HomePage/ResultLoading";

const ChatSection = (props: { groupId: number; email: string }) => {
  const [claimComponents, setClaimComponents] = useState<React.JSX.Element[]>(
    []
  );
  const bottomDiv = useRef<HTMLDivElement>(null);
  const loadingDiv = useRef<HTMLDivElement>(null);
  const [firstScroll, setFirstScroll] = useState<boolean>(false);

  async function fetchData() {
    try {
      const response = await getGroupResult(props);
      if (response.status === 401) {
        return notFound();
      }

      const data: GroupResultResponse = await response.json();

      const tempClaimComponents: React.JSX.Element[] = [];
      for (let i = 0; i < data.claimList.length; i++) {
        const component =
          i != data.claimList.length - 1 ? (
            <SearchResult claimDisplay={data.claimList[i]} />
          ) : (
            <div>
              <SearchResult claimDisplay={data.claimList[i]} />
            </div>
          );
        tempClaimComponents.push(component);
      }

      setClaimComponents(tempClaimComponents);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const [isAlert, setAlert] = useState(false);
  const [form, setForm] = React.useState({
    claim: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const { name, value } = e.target;

    setAlert(false);

    setForm({
      claim: value,
    });
  }

  async function fetchClaimData(claim: String) {
    try {
      const res: Response = await fetch("/api/fact-check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          claim: claim,
          email: props.email,
          isQuick: false,
          groupId: Number(props.groupId),
        }),
      });
      if (res.ok) {
        const responseData: FactCheckResponse = await res.json();
        setIsLoading(false);
        setClaimComponents([
          ...claimComponents,
          <SearchResult
            claimDisplay={{
              ...responseData,
              rating: responseData.final_label,
              id: responseData.claimId,
            }}
          />,
        ]);
      }
    } catch (e) {
      console.log("Claim submission error: ", e);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const formClaim = form.claim;

    if (formClaim === "") {
      setAlert(true);
      return;
    }

    setForm({
      claim: "",
    });

    fetchClaimData(form.claim);
    setIsLoading(true);
    setTimeout(() => {
      loadingDiv.current?.scrollIntoView({
        behavior: "smooth",
      });
    });
  }

  useEffect(() => {
    setTimeout(() => {
      console.log("scroll bot layout");
      bottomDiv.current?.scrollIntoView({
        behavior: "smooth",
      });
    }, 500);
  }, [claimComponents.length]);

  // useLayoutEffect(() => {
  //   setTimeout(() => {
  //     console.log("scroll bot layout");
  //     bottomDiv.current?.scrollIntoView({
  //       // behavior: "smooth",
  //     });
  //   }, 1000);
  // }, []);

  return (
    <div className={styles.container}>
      {/* ANCHOR CLAIM COMPONENTS */}
      <div className="p-10 px-28 overflow-scroll gap-10">
        {claimComponents}
        {isLoading && (
          <div ref={loadingDiv} className="mb-5">
            <ResultLoading />
          </div>
        )}
        <div ref={bottomDiv} className="h-[100px]"></div>
      </div>
      <div className={styles.input_container}>
        <div className={styles.input_wrapper}>
          <SearchForm
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            form={form}
            className={styles.form_wrapper}
          />
          <p className={styles.input_reminder}>
            Gửi một mẫu tin ngắn tại để kiểm tra tính xác thực tại đây. Hệ thống
            hoạt động tốt với một mẫu tin và nội dung không mang tính cá nhân.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatSection;
