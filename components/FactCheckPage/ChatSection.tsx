"use client";

import React, { useEffect, useState } from "react";
import styles from "@/styles/FactCheckPage/ChatSection.module.css";
import ClaimResult from "./ClaimResult";
import SearchForm from "@/components/SearchForm";
import { useSession } from "next-auth/react";

const ChatSection = (props: { id: string; email: string }) => {
  const [result, setResult] = useState<React.JSX.Element[]>([]);

  async function fetchData() {
    try {
      const res = await fetch("/api/group-result", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: props.email,
          groupId: Number(props.id),
        }),
      });

      const data: {
        claims: {
          id: string;
          rating: number;
          claim: string;
          evidence: string;
          evidence_provider: string;
          url: string;
        }[];
      } = await res.json();

      console.log(data);

      const retData = data.claims;
      const tempList: React.JSX.Element[] = [];
      for (let i = 0; i < retData.length; i++) {
        tempList.push(<ClaimResult {...retData[i]} />);
      }

      setResult(tempList);
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

  const [claim, setClaim] = React.useState("");

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
            groupId: Number(props.id),
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
      <div className={styles.result_container}>
        {result}
        <div style={{ height: 150 }}></div>
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
