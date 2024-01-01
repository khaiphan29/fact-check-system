"use client";

import React from "react";
import Link from "next/link";
import "@/styles/login-register.css";
import { signIn } from "next-auth/react";
import { useFormik } from "formik";
import styles from "@/styles/Auth.module.css";
import { fetchRegistry } from "@/utils/auth";
import {
  ErrorResponse,
  RegisterFormData,
  RegisterResponse,
} from "@/types/global";
import PopUpContainer from "@/components/PopUpContainer";
import { useRouter } from "next/navigation";

interface Props {
  setCloseFunction: React.Dispatch<React.SetStateAction<boolean>>;
}

const PopUpRegister = (props: Props) => {
  const [registerError, setRegisterError] = React.useState("");
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
      cpassword: "",
      role_id: "",
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
      role_id: values.role_id,
    });

    if (res.status == 409) {
      const { msg }: ErrorResponse = await res.json();
      setRegisterError(msg);
    } else if (res.ok) {
      window.location.reload();
    } else {
      setRegisterError("Lỗi đăng ký không xác định");
    }
  }

  const innerComp = (
    <div className="w-[70vw] bg-white p-10 rounded-3xl">
      <h1 className={`heading-small ${styles.title}`}>Tạo người dùng</h1>

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

        <label className={styles.form_label} htmlFor="role_select">
          Vai Trò (*)
        </label>

        <select
          id="role_select"
          className={styles.form_input}
          {...formik.getFieldProps("role_id")}
        >
          <option value="1">Người dùng</option>
          <option value="2">Quản trị</option>
          <option value="3">Người làm khoa học dữ liệu</option>
          <option value="4">Nhân viên</option>
        </select>

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
    </div>
  );

  return (
    <div>
      <PopUpContainer
        innerComponent={innerComp}
        setCloseFunction={props.setCloseFunction}
      />
    </div>
  );
};

export default PopUpRegister;
