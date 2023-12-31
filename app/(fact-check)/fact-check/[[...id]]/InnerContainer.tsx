"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import ChatSection from "@/components/FactCheckPage/ChatSection";
// import NavSection from "@/components/FactCheckPage/NavSection";
import styles from "@/styles/FactCheckPage/FactCheckMgmt.module.css";
import { useSession } from "next-auth/react";

import { HiChevronLeft, HiChevronRight, HiDotsVertical } from "react-icons/hi";
import { BsBookmarkPlusFill } from "react-icons/bs";
import ResultGroup from "@/components/FactCheckPage/ResultGroupCard";
// import BlankChatSection from "@/components/FactCheckPage/BlankChatSection";

import { getFactCheckGroup } from "@/utils/factCheck";
import { notFound, useRouter } from "next/navigation";
import CreateGroupForm from "@/components/FactCheckPage/CreateGroupForm";
import { FactCheckGroupResponse } from "@/types/global";

const Page = ({
  params,
  email,
}: {
  params: { id?: string[] };
  email: string;
}) => {
  const [componentStates, setComponentStates] = useState({
    showNavigation: true,
  });
  const [todayGroups, setTodayGroups] = React.useState<React.JSX.Element[]>([]);
  const [otherDayGroups, setOtherDayGroups] = React.useState<
    React.JSX.Element[]
  >([]);
  const [showCreateGroupForm, setShowCreateGroupForm] =
    useState<boolean>(false);
  // for redirect to new URL
  const { push } = useRouter();

  async function fetchGroupData() {
    try {
      const res: Response = await getFactCheckGroup({ email: email });

      if (res.ok) {
        const { groupList }: FactCheckGroupResponse = await res.json();
        // let idFound: boolean = false;
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        setTodayGroups(
          groupList
            .filter((ele) => {
              const objectDate = new Date(ele.modified_date);
              return objectDate >= today;
            })
            .map((ele) => <ResultGroup id={ele.id} title={ele.name} />)
        );

        setOtherDayGroups(
          groupList
            .filter((ele) => {
              const objectDate = new Date(ele.modified_date);
              return objectDate < today;
            })
            .map((ele) => <ResultGroup id={ele.id} title={ele.name} />)
        );

        if (!params.id) {
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
    <main className="flex-auto -mx-10 border border-dashed border-[#e7decd] flex overflow-hidden">
      {showCreateGroupForm && (
        <CreateGroupForm
          email={email}
          setCloseFunction={setShowCreateGroupForm}
        />
      )}
      {/* ANCHOR LEFT CONTAINER */}
      <div className="relative border-r border-dashed border-[#e7decd] flex flex-col flex-shrink-0 z-30">
        {/* Right part */}
        <div
          className={`absolute top-0 bottom-0 -right-8 flex items-center justify-center opacity-50 transition-all duration-200 ${styles.arrow_nav}`}
        >
          {componentStates.showNavigation ? (
            <HiChevronLeft
              size={30}
              className="scale-y-150"
              onClick={() => {
                setComponentStates({
                  ...componentStates,
                  showNavigation: false,
                });
              }}
            />
          ) : (
            <HiChevronRight
              size={30}
              className="scale-y-150"
              onClick={() => {
                setComponentStates({
                  ...componentStates,
                  showNavigation: true,
                });
              }}
            />
          )}
        </div>

        {/* Group List */}
        {componentStates.showNavigation && (
          <div className={styles.group_list}>
            <div
              className="flex-1 px-3 m-2 mb-0 rounded-xl flex gap-3 items-center justify-between text-lg font-semibold cursor-pointer transition-all duration-200 hover:text-white hover:bg-black"
              onClick={() => {
                setShowCreateGroupForm(true);
              }}
            >
              <span>Thêm Nhóm Tin</span>
              <BsBookmarkPlusFill />
            </div>

            <div className="flex-[14] p-2 flex flex-col overflow-scroll">
              {todayGroups.length > 0 && (
                <div>
                  <div className="pl-3 mt-8 mb-3 text-xs font-medium opacity-80">
                    Hôm Nay
                  </div>
                  <div>{todayGroups}</div>
                </div>
              )}

              {otherDayGroups.length > 0 && (
                <div className="">
                  <div className="pl-3 mt-8 mb-3 text-xs font-medium opacity-80">
                    30 Ngày Trước
                  </div>
                  <div>{otherDayGroups}</div>
                </div>
              )}
            </div>

            <div className="mt-5"></div>
          </div>
        )}
      </div>

      {params.id && (
        <ChatSection groupId={Number(params.id[0])} email={email} />
      )}
    </main>
  );
};

export default Page;
