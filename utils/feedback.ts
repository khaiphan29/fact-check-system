import { FeedBackListRequest, FeedBackRequest } from "@/types/global";

export const sendFeedback = async (
  request: FeedBackRequest
): Promise<Response> => {
  try {
    const res: Response = await fetch("/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...request,
      }),
    });

    return res;
  } catch (e) {
    console.log("Internal Fetch Error", e);
    throw new Error("Lỗi đánh giá");
  }
};

export const getFeedbackList = async (
  request: FeedBackListRequest
): Promise<Response> => {
  try {
    const res: Response = await fetch("/api/get-feedback-list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...request,
      }),
    });

    return res;
  } catch (e) {
    console.log("Internal Fetch Error", e);
    throw new Error("Lỗi đánh giá");
  }
};
