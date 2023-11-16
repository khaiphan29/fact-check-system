"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import ChatSection from "@/components/FactCheckPage/ChatSection";
// import NavSection from "@/components/FactCheckPage/NavSection";
import styles from "@/styles/FactCheckPage/FactCheck.module.css";
import { useSession } from "next-auth/react";

import { TfiLayoutSidebarLeft, TfiPlus } from "react-icons/tfi";
import ResultGroup from "@/components/FactCheckPage/ResultGroupCard";
import BlankChatSection from "@/components/FactCheckPage/BlankChatSection";

import { getFactCheckGroup } from "@/utils/factCheck";
import { useRouter } from "next/navigation";
import CreateGroupForm from "@/components/FactCheckPage/CreateGroupForm";

const Page = ({
  params,
  email,
}: {
  params: { id?: string[] };
  email: string;
}) => {
  const [groups, setGroups] = React.useState<React.JSX.Element[]>([]);
  const [showCreateGroupForm, setShowCreateGroupForm] =
    useState<boolean>(false);
  // for redirect to new URL
  const { push } = useRouter();

  async function fetchGroupData() {
    try {
      const res: Response = await getFactCheckGroup({ email: email });

      if (res.ok) {
        const { groupList }: FactCheckGroupResponse = await res.json();
        setGroups(
          groupList.map((ele) => <ResultGroup id={ele.id} title={ele.name} />)
        );

        if (!params.id) {
          console.log("Check redirect");
          push(`/fact-check/${groupList[0].id}`);
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchGroupData();
  }, [params]);

  // console.log("Fact-Checking testing");
  // console.log(params);

  return (
    <main className={styles.inner_container}>
      {showCreateGroupForm && <CreateGroupForm email={email} setCloseFunction={setShowCreateGroupForm} />}
      {/* ANCHOR LEFT CONTAINER */}
      <div className={styles.left_container}>
        <div className={styles.upper_left_container}>
          <div
            className={styles.new_group_btn}
            onClick={() => {
              setShowCreateGroupForm(true);
            }}
          >
            <TfiPlus />
            <span>Thêm Nhóm Tin</span>
          </div>

          <div className={styles.hide_nav_btn}>
            <TfiLayoutSidebarLeft />
          </div>
        </div>

        <div className={styles.group_list_container}>{groups}</div>

        <div className={styles.bottom_left_container}></div>
      </div>

      {params.id ? (
        <ChatSection groupId={Number(params.id[0])} email={email} />
      ) : (
        <BlankChatSection email={email} setGroups={setGroups} groups={groups} />
      )}
    </main>
  );
};

export default Page;
