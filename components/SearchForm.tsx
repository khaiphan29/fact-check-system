"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import styles from "@/styles/SearchForm.module.css";
import SearchButton from "@/public/assets/icons/search.svg";
import { BsSearch } from "react-icons/bs";

interface Props {
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  form: { claim: string };
  className?: string;
  bg?: string;
  darkMode?: boolean;
  placeholder?: string;
}

const SearchForm = (props: Props) => {
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
      if (scrollHeight > Math.floor(viewHeight * 0.1)) {
        scrollHeight = Math.floor(viewHeight * 0.1);
      }
      // console.log(scrollHeight, viewHeight);
      textAreaRef.current.style.height = scrollHeight + "px";
    }
  }, [textAreaRef, props.form]);
  return (
    <div className={props.className}>
      <form
        style={{ background: props.bg }}
        onSubmit={props.handleSubmit}
        className={`${styles.form} ${props.darkMode ? styles.dark_form : ""}`}
      >
        <div className={styles.search_box}>
          <textarea
            name="claim"
            onChange={props.handleChange}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                props.handleSubmit(event);
              }
            }}
            value={props.form.claim}
            autoComplete="off"
            placeholder={props.placeholder ? props.placeholder : "Nhập thông tin cần kiểm tra..."}
            className={`${styles.search_input} ${
              props.darkMode ? styles.dark_search_input : ""
            }`}
            rows={1}
            ref={textAreaRef}
          />

          <button type="submit" className={styles.search_img_container}>
            <BsSearch
              size={20}
              className={
                props.darkMode ? styles.dark_search_img : styles.search_img
              }
            />
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
