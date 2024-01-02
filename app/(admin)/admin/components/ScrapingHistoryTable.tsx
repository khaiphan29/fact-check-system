import { useMemo, useState, useEffect } from "react";
import { ScrapingHistory, ScrapingHistoryResponse } from "@/types/global";
import { HiCheckBadge, HiMinusCircle } from "react-icons/hi2";

type Props = {
  name: string;
};

const ScrapingHistoryTable = (props: Props) => {
  const [history, setHistory] = useState<ScrapingHistory[]>();
  async function fetchHistory() {
    const res = await fetch("/api/get-scraping-history", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        source_name: props.name,
      }),
    });
    if (res.ok) {
      const data: ScrapingHistoryResponse = await res.json();
      setHistory(
        data.list.map((ele) => ({
          url: ele.url,
          status: ele.status,
          created_date: new Date(ele.created_date),
        }))
      );
    }
  }

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div>
      <table className="">
        <tr>
          <th className="text-left pl-4">Ngày kiểm tra</th>
          <th className="text-left">Link khai thác</th>
          <th className="pr-6 text-left whitespace-nowrap ">Trạng thái</th>
        </tr>
        {history && history!.map((ele) => (
          <tr className="h-20 even:bg-light_orange even:bg-opacity-20">
            <td className="px-4">{ele.created_date.toDateString()}</td>

            <td>
              <a href={ele.url} target="_blank" className="text-blue">
                {ele.url}
              </a>
            </td>

            <td align="center" className="pr-6">
              {ele.status ? (
                <HiCheckBadge
                  size={28}
                  className="align-middle text-approved_2"
                />
              ) : (
                <HiMinusCircle
                  size={28}
                  className="align-middle text-refuted_2"
                />
              )}
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default ScrapingHistoryTable;
