"use client";

import React from "react";
import Link from "next/link";
import "@/styles/login-register.css";
import { signIn } from "next-auth/react";
import { useFormik } from "formik";
// import { getSession, useSession, signOut } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import styles from "@/styles/Auth.module.css";

interface LoginData {
  username: string;
  password: string;
}

const LoginForm = () => {
  const searchParams = useSearchParams();
  const loginError = searchParams.get("error")
    ? "Sai thông tin người dùng, email hoặc password"
    : "";
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit,
  });

  async function onSubmit(values: LoginData) {
    signIn("credentials", {
      username: values.username,
      password: values.password,
    });
  }

  return (
    <div className={styles.wrapper}>
      <h1 className={`heading-small ${styles.title}`}>Đăng nhập</h1>

      {loginError && <div className={styles.error}>{loginError}</div>}

      {/* Form */}
      <form
        className={styles.form}
        method="POST"
        onSubmit={formik.handleSubmit}
      >
        <label className={styles.form_label} htmlFor="auth_form_username">
          Email hoặc Tên Người Dùng (*)
        </label>
        <input
          className={styles.form_input}
          type="text"
          id="auth_form_username"
          placeholder="Email hoặc Tên Người Dùng"
          {...formik.getFieldProps("username")}
        />

        <label className={styles.form_label} htmlFor="auth_form_password">
          Mật khẩu (*)
        </label>
        <input
          className={styles.form_input}
          type="password"
          id="auth_form_password"
          placeholder="Mật Khẩu"
          {...formik.getFieldProps("password")}
        />

        <button type="submit" className={styles.form_submit}>
          Đăng nhập
        </button>
      </form>
      <p className={styles.text}>
        Bạn đã chưa tài khoản?{" "}
        <Link href="/register" className={styles.url}>
          Đăng ký
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
