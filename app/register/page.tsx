import React from "react";
import Link from "next/link";
import Image from "next/image";
import "@/styles/login-register.css";
import logo from "@/public/assets/images/logo.png";

const Register = () => {
  return (
    <div className="auth-container">
      <div className="auth-container__left">
        <Image src={logo} className="auth-img" alt="logo"></Image>
      </div>

      <div className="auth-container__right">
        <div className="auth-container__inner">
          <h1 className="heading-small auth-title">Đăng ký</h1>
          <form className="auth-form" action="">
            <label className="auth-form__label" htmlFor="auth_form_email">
              Tên đăng nhập (*)
            </label>
            <input
              className="auth-form__input"
              name="email"
              type="text"
              id="auth_form_email"
              placeholder="Email"
              autoComplete="off"
            />

            <label className="auth-form__label" htmlFor="auth_form_username">
              Tên Người Dùng (*)
            </label>
            <input
              className="auth-form__input"
              name="password"
              type="text"
              id="auth_form_username"
              placeholder="Tên Người Dùng"
            />

            <label className="auth-form__label" htmlFor="auth_form_password">
              Mật khẩu (*)
            </label>
            <input
              className="auth-form__input"
              name="password"
              type="password"
              id="auth_form_password"
              placeholder="Mật Khẩu"
            />

            <label className="auth-form__label" htmlFor="auth_form_re-password">
              Nhập lại mật khẩu (*)
            </label>
            <input
              className="auth-form__input"
              name="password"
              type="password"
              id="auth_form_re-password"
              placeholder="Nhập Lại Mật Khẩu"
            />

            <button type="submit" className="auth-form__button">
              Đăng ký
            </button>
          </form>
          <p className="auth__text">
            Bạn đã có tài khoản?{" "}
            <Link href="/login" className="auth__url">
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
