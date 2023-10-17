"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";
import ReactLoading from "react-loading";
import BackgroundObject1 from "@/public/assets/images/homepage_object1.png";
import BackgroundObject2 from "@/public/assets/images/homepage_object2.png";
import SearchResult from "./SearchResult";
import SearchForm from "../SearchForm";
import styles from "@/styles/Home.module.css";
import { useSession } from "next-auth/react";

const Search = () => {
  const [isAlert, setAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = React.useState({
    claim: "",
  });

  const [claim, setClaim] = React.useState("");
  const searchContainer = useRef<HTMLDivElement>(null);

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const { name, value } = e.target;

    setAlert(false);

    setForm({
      claim: value,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const formClaim = form.claim;

    if (formClaim === "") {
      setAlert(true);
      return;
    }

    // valid req
    if (claim != formClaim) {
      setForm({
        claim: "",
      });

      setClaim("");
      setTimeout(setClaim, 100, formClaim);

      setIsLoading(true);

      if (searchContainer.current) {
        window.scrollTo({
          top: Math.floor(searchContainer.current.offsetHeight / 2),
          behavior: "smooth",
        });
      }
    }
  }

  return (
    <div className={styles.search_section}>
      <div ref={searchContainer} className={styles.search_container}>
        <div className={styles.search_bg_text}>
          <pre>{"Kiểm Tra\nMẫu Tin"}</pre>
        </div>
        <Image
          src={BackgroundObject1}
          alt="Background Object"
          className={styles.search_bg_object1}
        ></Image>
        <Image
          src={BackgroundObject2}
          alt="Background Object"
          className={styles.search_bg_object2}
        ></Image>
        <div className={styles.search_inner_section}>
          <h1 className={styles.search_title}>
            <pre>{"Kiểm Tra Mẫu Tin\nNhanh Chóng"}</pre>
          </h1>
          <div className={styles.search_desc}>
            Gửi một mẫu tin ngắn tại để kiểm tra tính xác thực tại đây. Hệ thống
            hoạt động tốt với một mẫu tin và nội dung không mang tính cá nhân.
          </div>

          {/* ANCHOR Search Form */}
          <SearchForm
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            form={form}
            className={styles.search_wrapper}
            darkMode={true}
          />

          {isAlert && (
            <div className={styles.alert}>Nhận định không thể trống</div>
          )}
        </div>
      </div>

      {isLoading && (
        <div className={styles.loading_div}>
          <ReactLoading type={"bars"} color={"000"} />
        </div>
      )}

      {claim && <SearchResult claim={claim} setIsLoading={setIsLoading} />}

      <SearchResult claim={claim} setIsLoading={setIsLoading} />
    </div>
  );
};

export default Search;
