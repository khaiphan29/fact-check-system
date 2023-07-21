"use client";

import React from "react";
import Link from "next/link";
import "@/styles/login-register.css";
import { signIn } from "next-auth/react";
import { useFormik } from "formik";
// import { getSession, useSession, signOut } from "next-auth/react";
import { useSearchParams } from "next/navigation";

interface LoginData {
  username: string;
  password: string;
}

const LoginForm = () => {
  const searchParams = useSearchParams()
  const loginError = searchParams.get('error') ? "Sai thông tin người dùng, email hoặc password" : ""
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit,
  });

  async function onSubmit(values: LoginData) {
    console.log(values);
    signIn("credentials", {
      username: values.username,
      password: values.password,
    });
  }

  return (
    <div className="auth-container__right">
      <div className="auth-container__inner">
        <h1 className="heading-small auth-title">Đăng nhập</h1>

        {loginError && <div className="auth-error">{loginError}</div>}

        {/* Form */}
        <form
          className="auth-form"
          method="POST"
          onSubmit={formik.handleSubmit}
        >
          <label className="auth-form__label" htmlFor="auth_form_username">
            Email hoặc Tên Người Dùng (*)
          </label>
          <input
            className="auth-form__input"
            type="text"
            id="auth_form_username"
            placeholder="Email hoặc Tên Người Dùng"
            {...formik.getFieldProps("username")}
          />

          <label className="auth-form__label" htmlFor="auth_form_password">
            Mật khẩu (*)
          </label>
          <input
            className="auth-form__input"
            type="password"
            id="auth_form_password"
            placeholder="Mật Khẩu"
            {...formik.getFieldProps("password")}
          />

          <button type="submit" className="auth-form__button">
            <span className="auth-form__button-content">Đăng nhập</span>
          </button>
        </form>
        <p className="auth__text">
          Bạn đã chưa tài khoản?{" "}
          <Link href="/register" className="auth__url">
            Đăng ký
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
