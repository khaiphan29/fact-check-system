import React from "react";

interface Props {
  innerComponent: React.JSX.Element;
  setCloseFunction: React.Dispatch<React.SetStateAction<boolean>>;
}

const PopUpContainer = (props: Props) => {
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
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-100 text-lg z-50"
        onClick={() => {}}
      >
        {props.innerComponent}
      </div>
    </div>
  );
};

export default PopUpContainer;
