"use client";

import React, { useState } from "react";
import Link from "next/link";
import "@/styles/login-register.css";
import PopUpContainer from "@/components/PopUpContainer";
import AccountModForm from "@/components/AccountModForm";

interface Props {
  email: string;
  setCloseFunction: React.Dispatch<React.SetStateAction<boolean>>;
}

const PopUpAccountMod = (props: Props) => {
  const innerContainer = <AccountModForm email={props.email} />;
  return (
    <div>
      <PopUpContainer
        innerComponent={innerContainer}
        setCloseFunction={props.setCloseFunction}
      />
    </div>
  );
};

export default PopUpAccountMod;
