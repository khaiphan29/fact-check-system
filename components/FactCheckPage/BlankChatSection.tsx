"use client";

import React, { useEffect, useState } from "react";
import styles from "@/styles/FactCheckPage/ChatSection.module.css";
import ClaimResult from "./ClaimResult";
import SearchForm from "@/components/SearchForm";
import { useRouter } from "next/navigation";

const BlankChatSection = (props: { email: string }) => {
  useEffect(() => {
    // fetchData();
  }, []);

  const [isAlert, setAlert] = useState(false);
  const router = useRouter()

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
            groupId: -1,
          }),
        }
      );
      console.log("Complete fetch");

      const data: { groupId: string } = await res.json();

      router.push(`/fact-check/${data.groupId}`);
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
      <div className={styles.blank_container}>Kiểm Tin</div>

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

export default BlankChatSection;
