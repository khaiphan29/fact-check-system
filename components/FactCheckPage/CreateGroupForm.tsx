"use client";

import React, { InputHTMLAttributes, useState } from "react";
import { TfiClose } from "react-icons/tfi";
import { useRouter } from "next/navigation";
import { CreateClaimGroupRequest } from "@/types/global";

interface Props {
  email: string;
  setCloseFunction: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateGroupForm = (props: Props) => {
  const [groupName, setGroupName] = useState<string>("");
  const { push } = useRouter();

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setGroupName(e.currentTarget.value);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (groupName === "") {
      return;
    }

    const request: CreateClaimGroupRequest = {
      groupName: groupName,
      email: props.email,
    };

    // valid req
    // console.log(groupName);
    const res = await fetch("/api/create-claim-group", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...request,
      }),
    });

    if (res.ok) {
      push("/fact-check");
    }
  }

  return (
    <div className="transition-all duration-200">
      {/* Background */}
      <div
        className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-md z-40 transition-all duration-200"
        onClick={() => {
          props.setCloseFunction(false);
        }}
      ></div>

      {/* Pop-up Noti */}
      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-10 bg-white opacity-100 rounded-2xl text-lg z-50"
        onClick={() => {}}
      >
        <form onSubmit={handleSubmit} className="gap-10">
          <label htmlFor="createGroupInput" className="mr-5">
            Tạo Nhóm Tin
          </label>
          <input
            type="text"
            id="createGroupInput"
            placeholder="Tên Nhóm Tin..."
            onChange={handleChange}
            className="focus:outline-none"
            autoComplete="off"
          />
        </form>
      </div>
    </div>
  );
};

export default CreateGroupForm;
