"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";
import BackgroundObject1 from "@/public/assets/images/homepage_object1.png";
import BackgroundObject2 from "@/public/assets/images/homepage_object2.png";
import SearchResult from "@/components/HomePage/SearchResult";
import SearchForm from "@/components/SearchForm";

const Home = () => {
  const [isAlert, setAlert] = useState(false);

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

      if (searchContainer.current) {
        window.scrollTo({
          top: Math.floor(searchContainer.current.offsetHeight / 2),
          behavior: "smooth",
        });
      }
    }
  }

  return (
    <div >
      <div ref={searchContainer} className="relative h-[650px] flex justify-end bg-beige overflow-hidden rounded-3xl py-4 px-3">
        <div className="absolute top-0 bottom-0 left-[35%] my-auto  mx-0 flex items-center text-white text-right tracking-[8px] text-[18rem] leading-[1] font-medium capitalize">
          <pre>{"Kiểm Tra\nMẫu Tin"}</pre>
        </div>
        <Image
          src={BackgroundObject1}
          alt="Background Object"
          className="absolute top-0 right-[30%] w-[300px] h-auto object-cover"
        ></Image>
        <Image
          src={BackgroundObject2}
          alt="Background Object"
          className="absolute top-[20%] -right-[5%] w-[800px] h-auto object-cover"
        ></Image>
        <div className="absolute bottom-[10%] left-[5%] w-[600px]">
          <h1 className="mb-8 font-medium text-8xl">
            <pre>{"Kiểm Tra Mẫu Tin\nNhanh Chóng"}</pre>
          </h1>
          <div className="text-lg leading-[1.5] mb-8">
            Gửi một mẫu tin ngắn tại để kiểm tra tính xác thực tại đây. Hệ thống
            hoạt động tốt với một mẫu tin và nội dung không mang tính cá nhân.
          </div>

          {/* ANCHOR Search Form */}
          <SearchForm
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            form={form}
            className="mt-3 mb-7"
            darkMode={true}
          />

          {isAlert && (
            <div className="text-red_alert">Nhận định không thể trống</div>
          )}
        </div>
      </div>

      {claim && <SearchResult claim={claim} setClaim={setClaim} />}
    </div>
  );
};

export default Home;
