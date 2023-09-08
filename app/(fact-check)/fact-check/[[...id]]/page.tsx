// "use client";

import React, { useEffect, useState } from "react";
import ChatSection from "@/components/FactCheckPage/ChatSection";
import NavSection from "@/components/FactCheckPage/NavSection";
import styles from "@/styles/FactCheckPage/FactCheck.module.css";
import { useSession } from "next-auth/react";
import BlankChatSection from "@/components/FactCheckPage/BlankChatSection";
import InnerContainer from "./InnerContainer";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const Page = async ({ params }: { params: { id?: string[] } }) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  

  return (
    <InnerContainer params={params} email={session.user?.email!}/>
  );
};

export default Page;
