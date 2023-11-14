"use client";

import React, { useEffect, useState } from "react";
import styles from "@/styles/FactCheckPage/ChatSection.module.css";
import SearchForm from "@/components/SearchForm";
import { useRouter } from "next/navigation";
import { group } from "console";

const BlankChatSection = (props: {
  email: string;
  setGroups: React.Dispatch<
    React.SetStateAction<CreateClaimGroupResponse[]>
  >;
  groups: CreateClaimGroupResponse[]
}) => {
  const [isAlert, setAlert] = useState(false);
  const router = useRouter();

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

  async function fetchClaimData(name: String) {
    try {
      const res: Response = await fetch("/api/create-claim-group", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: props.email,
          name: name,
        }),
      });

      const data: CreateClaimGroupResponse = await res.json();

      props.setGroups([...props.groups, data])

      router.push(`/fact-check/${data.id}`);
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
      <div className={styles.blank_container}>Tạo Nhóm</div>

      <div className={styles.input_container}>
        <div className={styles.input_wrapper}>
          <SearchForm
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            form={form}
            className={styles.form_wrapper}
            placeholder="Nhập tên nhóm tin..."
          />
          <p className={styles.input_reminder}>
            Tạo nhóm tin giúp quản lý kết quả dễ dàng hơn.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlankChatSection;
