import Link from "next/link";
import Image from "next/image";
import Tag from "./Tag";

interface Props {
  claim: string;
  evidence: string;
  url: string;
  evidenceSource: string;
  rating: number;
}

const SearchResult = (props: Props) => {
  return (
    <div className="search-result">
      <div className="search-result__header">
        <Tag rating={props.rating} />
        <ul>
          <li>
            <Link href={"/"} className="search-result__header-link">
              Đánh Giá
            </Link>
          </li>
          <li>
            <Link href={"/"} className="search-result__header-link">
              Xem Đầy Đủ
            </Link>
          </li>
        </ul>
      </div>

      <div className="search-result__body">
        <div className="search-result__section search-result__section-top">
          <h2 className="heading-small">Nhận Định</h2>
          <pre>{props.claim}</pre>
        </div>
        <div className="search-result__section">
          <div className="search-result__evidence">
            <h2 className="heading-small">Minh Chứng</h2>
            {/* <a target="_blank" href={props.url} className="search-result__url">
              {props.evidenceSource}
            </a> */}
          </div>
          <p>{props.evidence}</p>
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
