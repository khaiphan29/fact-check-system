"use client";

import {
  EvidenceSource,
  EvidenceSourcesResponse,
  ScrapingStatusResponse,
} from "@/types/global";
import { getEvidenceSources } from "@/utils/factCheck";
import { useState, useEffect } from "react";
import ReactLoading from "react-loading";

import { HiCheckBadge, HiMinusCircle } from "react-icons/hi2";
import PopUpSourceMod from "./components/PopUpSourceMod";

interface Props {
  email: string;
}

const ScrapingTool = (props: Props) => {
  const [sources, setSources] = useState<EvidenceSource[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [initialLoading, setInitialLoading] = useState<boolean>(true);

  const [isModifying, setIsModifying] = useState(false);
  const [formData, setFormData] = useState({
    id: -1,
    name: "",
    url: "",
  });

  // useEffect(() => {
  //   setIsModifying(true);
  // }, [formData]);

  async function getSources() {
    const res: Response = await getEvidenceSources({
      email: props.email,
    });
    if (res.ok) {
      const data: EvidenceSourcesResponse = await res.json();
      setInitialLoading(false);
      setSources(data.sources);
    }
  }

  async function updateStatus() {
    const res = await fetch("/api/scraping-check", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });
    if (res.ok) {
      const data: ScrapingStatusResponse = await res.json();
      setSources(data.list);
      setLoading(false);
    }
  }

  useEffect(() => {
    getSources();
  }, []);

  return (
    <div className="flex-grow flex flex-col">
      {isModifying && (
        <PopUpSourceMod setCloseFunction={setIsModifying} {...formData} />
      )}

      {initialLoading ? (
        <ReactLoading color="black" className="m-auto" />
      ) : (
        <div className="flex-grow flex flex-col">
          <div
            className="ml-auto mr-3 px-6 py-2 border rounded-3xl max-w-max hover:bg-black hover:text-white transition-all duration-200 cursor-pointer"
            onClick={() => {
              setLoading(true);
              updateStatus();
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
              <tr
                className="h-20 even:bg-light_orange even:bg-opacity-20 cursor-pointer"
                onDoubleClick={() => {
                  setFormData({
                    id: ele.id,
                    name: ele.name,
                    url: ele.scraping_url,
                  });
                  setIsModifying(true);
                }}
              >
                <td className="px-4">{ele.name}</td>
                <td>
                  <a
                    href={ele.scraping_url}
                    target="_blank"
                    className="text-blue"
                  >
                    {ele.scraping_url}
                  </a>
                </td>
                <td align="center" className="pr-6">
                  {!loading ? (
                    ele.status ? (
                      <HiCheckBadge
                        size={28}
                        className="align-middle text-approved_2"
                      />
                    ) : (
                      <HiMinusCircle
                        size={28}
                        className="align-middle text-refuted_2"
                      />
                    )
                  ) : (
                    <ReactLoading color="black" />
                  )}
                </td>
              </tr>
            ))}
          </table>
        </div>
      )}
    </div>
  );
};

export default ScrapingTool;
