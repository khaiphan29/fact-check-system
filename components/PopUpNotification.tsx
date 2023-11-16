import React from "react";
import { TfiClose } from "react-icons/tfi";

interface Props {
  msg: string;
  setCloseFunction: React.Dispatch<React.SetStateAction<boolean>>;
}

const Error = (props: Props) => {
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
        <TfiClose
          size={15}
          className="absolute top-4 right-4"
          onClick={() => {
            props.setCloseFunction(false);
          }}
        />
        {props.msg}
      </div>
    </div>
  );
};

export default Error;
