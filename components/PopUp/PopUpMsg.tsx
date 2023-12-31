import React from "react";
import Link from "next/link";
import PopUpContainer from "@/components/PopUpContainer";

interface Props {
  msg: string;
  setCloseFunction: React.Dispatch<React.SetStateAction<boolean>>;
}

const PopUpMsg = (props: Props) => {
  const customComponent = <div className="bg-white p-10">{props.msg}</div>;
  return (
    <div>
      <PopUpContainer
        innerComponent={customComponent}
        setCloseFunction={props.setCloseFunction}
      />
    </div>
  );
};

export default PopUpMsg;
