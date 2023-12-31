import React from "react";
import Link from "next/link";
import PopUpContainer from "@/components/PopUpContainer";

interface Props {
  setCloseFunction: React.Dispatch<React.SetStateAction<boolean>>;
}

const PopUpLogin = (props: Props) => {
  const customComponent = (
    <div className="bg-white p-10 rounded-3xl">
      {"Vui lòng "}
      <Link href="/login" className="text-blue brightness-125 saturate-150 font-medium">đăng nhập</Link>
      {" để xem lịch sử kiểm tin"}
    </div>
  );
  return (
    <div>
      <PopUpContainer
        innerComponent={customComponent}
        setCloseFunction={props.setCloseFunction}
      />
    </div>
  );
};

export default PopUpLogin;
