"use client";

import React, { useEffect, useState } from "react";
import styles from "@/styles/FactCheckPage/ChatSection.module.css";
import ClaimResult from "./ClaimResult";
import SearchForm from "@/components/SearchForm";

import { getGroupResult } from "@/utils/factCheck";
import PopUpClaimResult from "../PopUpClaimResult";

const ChatSection = (props: { groupId: number; email: string }) => {
  const [claims, setClaims] = useState<React.JSX.Element[]>([]);
  const [popUpID, setPopUpID] = useState<number>(-1);

  async function fetchData() {
    try {
      const response = await getGroupResult(props);
      const data: GroupResultResponse = await response.json();

      setClaims(
        data.claimList.map((ele) => {
          return (
            <ClaimResult
              id={ele.id}
              claim={ele.claim}
              rating={ele.rating}
              setPopUpID={setPopUpID}
            />
          );
        })
      );
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

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const { name, value } = e.target;

    setAlert(false);

    setForm({
      claim: value,
    });
  }

  async function fetchClaimData(claim: String) {
    try {
      const res: Response = await fetch(
        "http://localhost:3000/api/fact-check",
        {
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
        }
      );
      if (res.ok) {
        fetchData();
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
  }

  return (
    <div className={styles.container}>
      {/* Pop-up Result */}
      {popUpID > 0 ? (
        <PopUpClaimResult
          claimId={popUpID}
          email={props.email}
          setPopUpID={setPopUpID}
        />
      ) : (
        <div></div>
      )}
      
      <div className="p-10 overflow-scroll grid grid-cols-2 gap-10">
        {claims}
        <div className="h-[100px]"></div>
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
