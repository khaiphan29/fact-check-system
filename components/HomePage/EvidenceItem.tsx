import React from "react";
import styles from "@/styles/SearchResult.module.css";
const EvidenceItem = (props: EvidenceResult) => {
  return (
    <div>
      <div className="my-5 mx-12 items-center">
        <div className="mb-2">
          <h2 className="heading-small text-justify">Nhận Định</h2>
          <p className="text-lg text-justify">{props.claim}</p>
        </div>

        <div className="">
          <h2 className="heading-small text-justify">Minh Chứng</h2>
        </div>
        <p className="text-lg text-justify">{props.evidence}</p>
      </div>
    </div>
  );
};

export default EvidenceItem;
