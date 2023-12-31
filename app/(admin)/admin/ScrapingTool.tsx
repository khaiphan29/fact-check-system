"use client";

import { EvidenceSource, EvidenceSourcesResponse } from "@/types/global";
import { getEvidenceSources } from "@/utils/factCheck";
import { useMemo, useState, useEffect } from "react";
import ReactLoading from "react-loading";

import { HiCheckBadge } from "react-icons/hi2";

interface Props {
  email: string;
}

const ScrapingTool = (props: Props) => {
  const [sources, setSources] = useState<EvidenceSource[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  async function getSources() {
    const res: Response = await getEvidenceSources({
      email: props.email,
    });
    if (res.ok) {
      const data: EvidenceSourcesResponse = await res.json();
      setSources(data.sources);
    }
  }

  useEffect(() => {
    getSources();
  }, []);

  return (
    <div>
      <div
        className="ml-auto mr-3 px-6 py-2 border rounded-3xl max-w-max hover:bg-black hover:text-white transition-all duration-200 cursor-pointer"
        onClick={() => {
          setLoading(!loading);
        }}
      >
        Kiểm Thử
      </div>

      <table className="">
        <tr>
          <th className="text-left pl-4">Tên</th>
          <th className="text-left">Link khai thác</th>
          <th className="pr-6 text-left whitespace-nowrap ">Trạng thái</th>
        </tr>
        {sources.map((ele) => (
          <tr className="h-20 even:bg-light_orange even:bg-opacity-20">
            <td className="px-4">{ele.name}</td>
            <td>
              <a href={ele.scraping_url} target="_blank" className="text-blue">
                {ele.scraping_url}
              </a>
            </td>
            <td align="center" className="pr-6">
              {!loading ? (
                <HiCheckBadge size={28} className="align-middle" />
              ) : (
                <ReactLoading color="black" />
              )}
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default ScrapingTool;
