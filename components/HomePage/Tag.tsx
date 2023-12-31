import React from "react";
import Image from "next/image";
// import approved from "@/public/assets/icons/tag_approved.svg";
// import refute from "@/public/assets/icons/tag_refute.svg";
// import neutral from "@/public/assets/icons/tag_neutral.svg";
import {
  IoCheckmarkCircle,
  IoCloseCircleSharp,
  IoEllipsisVerticalCircleSharp,
} from "react-icons/io5";

const Tag = (props: { rating: number }) => {
  // const image: any =
  //   props.rating === 1 ? approved : props.rating === 0 ? refute : neutral;

  const bg: string =
    props.rating === 1
      ? "bg-approved_1"
      : props.rating === 0
      ? "bg-refuted_1"
      : "bg-neutral_1";

  return (
    <div
      className={`py-3 px-5 rounded-xl flex justify-center items-center ${bg} gap-4`}
    >
      {/* <Image src={image.src} alt="tag" width={25} height={25}></Image> */}
      <div className="">
        {props.rating === 1 ? (
          <IoCheckmarkCircle size={30} />
        ) : props.rating === 0 ? (
          <IoCloseCircleSharp size={30} />
        ) : (
          <IoEllipsisVerticalCircleSharp size={30} className="rotate-90" />
        )}
      </div>

      <p className={"uppercase text-base font-semibold "}>
        {props.rating === 1
          ? "Tin xác thực"
          : props.rating === 0
          ? "Tin giả"
          : "Không xác định"}
      </p>
    </div>
  );
};

export default Tag;
