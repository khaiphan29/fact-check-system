"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";
import SearchButton from "@/public/assets/icons/search.svg";
import SearchResult from "./SearchResult";

const Search = () => {
  const [alert, setAlert] = useState({
    isBlank: false
  })

  const [form, setForm] = React.useState({
    claim: "",
  });

  const [result, setResult] = React.useState({
    claim: "",
    evidence: "",
    provider: "",
    url: "",
    rating: 3,
    isExist: false,
  });

  const [textAreaRow, setTextAreaRow] = useState(1);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  //for dynamic width of textArea
  useEffect(() => {
    if (textAreaRef.current) {
      // We need to reset the height momentarily to get the correct scrollHeight for the textarea
      textAreaRef.current.style.height = "0px";
      let scrollHeight = textAreaRef.current.scrollHeight;

      // We then set the height directly, outside of the render loop
      // Trying to set this with state or a ref will product an incorrect value.
      const { innerHeight: viewHeight } = window;
      if (scrollHeight > Math.floor(viewHeight * 0.3)) {
        scrollHeight = Math.floor(viewHeight * 0.3);
      }
      // console.log(scrollHeight, viewHeight);
      textAreaRef.current.style.height = scrollHeight + "px";
    }
  }, [textAreaRef, form]);

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setAlert({
      isBlank: false
    })
    setForm({
      ...result,
      [name]: value,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const claim = form.claim;

    if (claim === "") {
      setAlert({
        isBlank: true
      })
      return
    }

    // Send data to API route
    try {
      const res: Response = await fetch("http://localhost:3000/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          claim,
        }),
      });

      const data: {
        rating: number;
        fact: string;
        claim: string;
        url: string;
        provider: string;
      } = await res.json();
      // console.log(data);

      setForm({
        claim: "",
      });

      setResult({
        claim: data.claim,
        evidence: data.fact,
        provider: data.provider,
        url: data.url,
        rating: data.rating,
        isExist: true,
      });
    } catch (e) {
      console.log("Claim submission error: ", e);
    }
  }

  return (
    <div className="search__container">
      <h1 className="search__title">Kiểm Tra Mẫu Tin</h1>
      <div className="search__reminder">
        Hệ thống hoạt động tốt nhất kiểm tra một mẫu tin và không mang tính cá
        nhân
      </div>
      <form onSubmit={handleSubmit} className="search__form">
        <div className="search__box">
          <textarea
            name="claim"
            onChange={handleChange}
            value={form.claim}
            autoComplete="off"
            placeholder="Nhập thông tin cần kiểm tra..."
            className="search__input"
            rows={1}
            ref={textAreaRef}
          />

          <button type="submit" className="search__img">
            <Image
              src={SearchButton}
              alt="Search Button"
              width={25}
              height={25}
              className="nav__logo"
            />
          </button>
        </div>

        <button type="submit" className="search__submit-button">
          Kiểm Tin
        </button>
      </form>

      {alert.isBlank && <div className="search-alert">Nhận định không thể trống</div>}

      {result.isExist && (
        <SearchResult
          claim={result.claim}
          evidence={result.evidence}
          evidenceSource={result.provider}
          url={result.url}
          rating={result.rating}
        />
      )}
    </div>
  );
};

export default Search;
