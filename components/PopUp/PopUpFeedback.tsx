import React, { useState } from "react";
import { useFormik } from "formik";
import PopUpContainer from "../PopUpContainer";
import { sendFeedback } from "@/utils/feedback";
import ReactLoading from "react-loading";

interface FeedBackData {
  isIncorrectEvidence: boolean;
  isIncorrectRating: boolean;
  description: string;
}

interface Props {
  isNegative: boolean;
  claimId: number;
  email: string;
  setCloseFunction: React.Dispatch<React.SetStateAction<boolean>>;
}

const PopUpFeedback = (props: Props) => {
  const formik = useFormik({
    initialValues: {
      isIncorrectRating: false,
      isIncorrectEvidence: false,
      description: "",
    },
    onSubmit,
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>("");

  async function onSubmit(values: FeedBackData) {
    console.log(values);
    setIsLoading(true);
    const res = await sendFeedback({
      email: props.email,
      claimId: props.claimId,
      isNegative: props.isNegative,
      feedBackCheck: {
        isIncorrectEvidence: values.isIncorrectEvidence,
        isIncorrectRating: values.isIncorrectRating,
      },
      description: values.description,
    });

    if (res.ok) {
      setMsg("Gửi thành công");
    }
  }

  const innerComponent = isLoading ? (
    msg === "" ? (
      <div>
        <ReactLoading type="bubbles" />
      </div>
    ) : (
      <div className="bg-white p-10 py-5 rounded-xl">{msg}</div>
    )
  ) : (
    <form
      className="flex flex-col bg-white w-[90vw] p-8 rounded-3xl "
      method="POST"
      onSubmit={formik.handleSubmit}
    >
      <div className="pb-8 border-b border-beige border-solid font-semibold text-xl">
        Đánh giá chi tiết
      </div>
      <input
        type="text"
        placeholder="Nhập mô tả đánh giá của bạn..."
        autoFocus
        autoComplete="off"
        className="w-full p-5 my-10 border-2 border-beige border-solid rounded-xl"
        {...formik.getFieldProps("description")}
      />

      {props.isNegative && (
        <div>
          <div className="flex items-center">
            <input
              className="ml-1 mr-3 w-4 h-4"
              type="checkbox"
              id="form_checkRating"
              {...formik.getFieldProps("isIncorrectRating")}
            />
            <label htmlFor="form_checkRating">
              Kết quả đánh giá không đúng
            </label>
          </div>

          <div className="flex items-center">
            <input
              className="ml-1 mr-3 w-4 h-4"
              type="checkbox"
              id="form_checkEvidence"
              {...formik.getFieldProps("isIncorrectEvidence")}
            />
            <label htmlFor="form_checkEvidence">
              Nhận định đưa ra không đúng
            </label>
          </div>
        </div>
      )}

      <button
        className=" bg-black text-white font-light p-3 align-bottom rounded-xl self-end hover:brightness-90"
        type="submit"
      >
        Gửi đánh giá
      </button>
    </form>
  );

  return (
    <div>
      <PopUpContainer
        innerComponent={innerComponent}
        setCloseFunction={props.setCloseFunction}
      />
    </div>
  );
};

export default PopUpFeedback;
