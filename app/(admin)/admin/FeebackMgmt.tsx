import { useState, useEffect } from "react";
import FeedbackTable from "./components/FeedbackTable";

import { AccountListResponse, FeedBackListResponse } from "@/types/global";
import { getAccountList } from "@/utils/auth";
import { getFeedbackList } from "@/utils/feedback";

type Feedback = {
  id: number;
  isPositive: string;
  feedBackCheck: {
    isIncorrectEvidence: string;
    isIncorrectRating: string;
  };
  description: string;
};

interface Props {
  email: string;
}

const FeedbackMgmt = (props: Props) => {
  const [feedbackList, setFeedbackList] = useState<Feedback[]>([]);

  const [statistic, setStatistic] = useState<{
    positive_count: number;
    negative_count: number;
    wrong_evidence_count: number;
    wrong_rating_count: number;
  }>();

  async function fetchFeedbackData() {
    const res: Response = await getFeedbackList({
      email: props.email,
    });
    if (res.ok) {
      const data: FeedBackListResponse = await res.json();
      // console.log(data.list);
      setFeedbackList(data.list);
      setStatistic(data.summary);
    }
  }

  useEffect(() => {
    fetchFeedbackData();
  }, []);

  return (
    <div className="">
      <div className="p-2 flex gap-2">
        <div className="p-4 bg-approved_1 rounded-3xl font-medium flex items-center">
          {statistic?.positive_count} Đánh Giá Tốt
        </div>
        <div className="p-4 bg-refuted_1 rounded-3xl">
          <div className="font-medium">{statistic?.negative_count} Đánh Giá Tiêu Cực</div>
          <div className="">
            {statistic?.wrong_evidence_count} Nhận Xét Sai Minh Chứng
          </div>
          <div className="">
            {statistic?.wrong_rating_count} Nhận Xét Sai Kết Quả
          </div>
        </div>
      </div>

      <FeedbackTable feedbacks={feedbackList} />
    </div>
  );
};

export default FeedbackMgmt;
