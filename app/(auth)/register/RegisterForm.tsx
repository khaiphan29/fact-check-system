"use client";

import React from "react";
import Link from "next/link";
import "@/styles/login-register.css";
import { signIn } from "next-auth/react";
import { useFormik } from "formik";
import { useSearchParams } from "next/navigation";
import styles from "@/styles/Auth.module.css";
import { fetchRegistry } from "@/utils/auth";

const RegisterForm = () => {
  const [registerError, setRegisterError] = React.useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
      cpassword: "",
    },
    onSubmit,
  });

  function handleChange(e: React.ChangeEvent) {
    setRegisterError("");
    formik.handleChange(e);
  }

  async function onSubmit(values: RegisterFormData) {
    console.log(values);
    if (values.password != values.cpassword) {
      setRegisterError("Mật khẩu không khớp.");
      return;
    }

    const res: Response = await fetchRegistry({
      email: values.email,
      username: values.username,
      password: values.password,
    });

    if (res.status == 409) {
      const {msg}: ErrorResponse = await res.json();
      setRegisterError(msg);
    }
    else if (res.ok) {
      const data: RegisterResponse = await res.json();
      signIn("credentials", {
        username: data.username,
        password: data.password,
      });
    } else {
      setRegisterError("Lỗi đăng ký không xác định");
    }
  }

  return (
    <div className={styles.wrapper}>
      <h1 className={`heading-small ${styles.title}`}>Đăng ký</h1>

      {registerError && <div className={styles.error}>{registerError}</div>}

      {/* Form */}
      <form
        className={styles.form}
        method="POST"
        onSubmit={formik.handleSubmit}
      >
        <label className={styles.form_label} htmlFor="registerForm_email">
          Email (*)
        </label>
        <input
          className={styles.form_input}
          type="email"
          id="registerForm_email"
          placeholder="Email"
          {...formik.getFieldProps("email")}
        />

        <label className={styles.form_label} htmlFor="registerForm_username">
          Tên Người Dùng (*)
        </label>
        <input
          className={styles.form_input}
          type="text"
          id="registerForm_username"
          placeholder="Tên Người Dùng"
          {...formik.getFieldProps("username")}
        />

        <label className={styles.form_label} htmlFor="registerForm_password">
          Mật khẩu (*)
        </label>
        <input
          className={styles.form_input}
          type="password"
          id="registerForm_password"
          placeholder="Mật Khẩu"
          {...formik.getFieldProps("password")}
          onChange={handleChange}
        />

        <label className={styles.form_label} htmlFor="registerForm_cpassword">
          Nhập Lại Mật khẩu (*)
        </label>
        <input
          className={styles.form_input}
          type="password"
          id="registerForm_cpassword"
          placeholder="Mật Khẩu"
          {...formik.getFieldProps("cpassword")}
          onChange={handleChange}
        />

        <button type="submit" className={styles.form_submit}>
          Đăng ký
        </button>
      </form>
      <p className={styles.text}>
        Bạn đã có tài khoản?{" "}
        <Link href="/login" className={styles.url}>
          Đăng nhập
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
