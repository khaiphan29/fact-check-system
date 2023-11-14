"use client";

import React, { useEffect, useState } from "react";
import ChatSection from "@/components/FactCheckPage/ChatSection";
import NavSection from "@/components/FactCheckPage/NavSection";
import styles from "@/styles/FactCheckPage/FactCheck.module.css";
import { useSession } from "next-auth/react";
import BlankChatSection from "@/components/FactCheckPage/BlankChatSection";

const Page = ({
  params,
  email,
}: {
  params: { id?: string[] };
  email: string;
}) => {
  const [groups, setGroups] = React.useState<CreateClaimGroupResponse[]>([]);

  async function fetchGroupData() {
    try {
      const res: Response = await fetch("/api/fact-check-group", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      });
      const data: {
        groups: {
          id: number;
          name: string;
        }[];
      } = await res.json();

      // let groups = data.groups;
      //console.log("set groups", data);
      setGroups(data.groups);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchGroupData();
    //console.log("Fetching in useEffect", params)
  }, [params]);

  // console.log("Fact-Checking testing");
  // console.log(params);

  return (
    <main className={styles.inner_container}>
      <NavSection groups={groups} />
      {params.id ? (
        <ChatSection id={Number(params.id[0])} email={email} />
      ) : (
        <BlankChatSection email={email} setGroups={setGroups} groups={groups} />
      )}
    </main>
  );
};

export default Page;
