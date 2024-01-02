"use client";

import React, { FormEvent, useEffect, useState } from "react";
import "@/styles/login-register.css";
import styles from "@/styles/Auth.module.css";
import { getAccount, updateAccount } from "@/utils/auth";
import ReactLoading from "react-loading";
import { AccountFormData, ErrorResponse } from "@/types/global";
import { signOut } from "next-auth/react";

interface Props {
  email: string;
  isUser?: boolean;
}

const AccountModForm = (props: Props) => {
  const [registerError, setRegisterError] = React.useState("");
  const [loading, setLoading] = useState(false);

  const [accountData, setAccountData] = useState<AccountFormData>({
    name: "",
    email: "",
    username: "",
    password: "",
    role_id: "",
    phone: "",
  });

  async function getAccountInfo() {
    const res = await getAccount({
      email: props.email,
    });
    if (res.ok) {
      const data: AccountFormData = await res.json();
      setAccountData(data);
    }
  }

  async function deleteAccount() {
    const res = await fetch("/api/delete-account", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: props.email,
      }),
    });

    if (res.ok) {
      if (props.isUser) {
        signOut();
        window.location.reload();
      }
    }
  }

  useEffect(() => {
    getAccountInfo();
  }, []);

  function handleChange(e: React.ChangeEvent) {
    setRegisterError("");
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    setLoading(true);
    const res: Response = await updateAccount({
      ...accountData,
      old_email: props.email,
    });
    setLoading(false);

    if (res.status == 409) {
      const { msg }: ErrorResponse = await res.json();
      setRegisterError(msg);
    } else if (res.ok) {
      window.location.reload();
    } else {
      setRegisterError("Lỗi chỉnh sửa không xác định");
    }
  }

  return (
    <div
      className={`w-[50vw] bg-white p-10 rounded-3xl overflow-scroll ${
        !props.isUser && "max-h-[90vh]"
      }`}
    >
      <div className="flex justify-between items-center">
        <h1 className={`heading-small ${styles.title}`}>Chỉnh sửa tài khoản</h1>
        {!loading && (
          <div
            className="py-4 px-6 text-refuted_2 border border-refuted_2 rounded-2xl hover:bg-refuted_2 hover:text-white transition-all duration-200 cursor-pointer"
            onClick={() => {
              setLoading(true);
              deleteAccount();
            }}
          >
            {" "}
            Xoá Tài Khoản{" "}
          </div>
        )}
      </div>

      {registerError && <div className={styles.error}>{registerError}</div>}

      {/* Form */}
      <form className={styles.form} method="POST" onSubmit={handleSubmit}>
        <label className={styles.form_label} htmlFor="registerForm_name">
          Tên (*)
        </label>
        <input
          className={styles.form_input}
          type="text"
          id="registerForm_name"
          placeholder="Tên"
          onChange={(e) =>
            setAccountData({
              ...accountData,
              name: e.target.value,
            })
          }
          value={accountData.name}
        />

        <label className={styles.form_label} htmlFor="registerForm_email">
          Email (*)
        </label>
        <input
          className={styles.form_input}
          type="email"
          id="registerForm_email"
          placeholder="Email"
          onChange={(e) =>
            setAccountData({
              ...accountData,
              email: e.target.value,
            })
          }
          value={accountData.email}
        />

        <label className={styles.form_label} htmlFor="registerForm_username">
          Tên Người Dùng (*)
        </label>

        <input
          className={styles.form_input}
          type="text"
          id="registerForm_username"
          placeholder="Tên Người Dùng"
          onChange={(e) =>
            setAccountData({
              ...accountData,
              username: e.target.value,
            })
          }
          value={accountData.username}
        />

        {!props.isUser && (
          <div className="flex flex-col">
            <label className={styles.form_label} htmlFor="role_select">
              Vai Trò (*)
            </label>

            <select
              id="role_select"
              className={styles.form_input}
              onChange={(e) =>
                setAccountData({
                  ...accountData,
                  role_id: e.target.value,
                })
              }
              value={accountData.role_id}
            >
              <option value="1">Người dùng</option>
              <option value="2">Quản trị viên</option>
              <option value="3">Người làm khoa học dữ liệu</option>
              <option value="4">Nhân viên</option>
            </select>
          </div>
        )}

        <label className={styles.form_label} htmlFor="registerForm_password">
          Mật khẩu (*)
        </label>
        <input
          className={styles.form_input}
          type="text"
          id="registerForm_password"
          placeholder="Mật Khẩu"
          onChange={(e) => {
            setAccountData({
              ...accountData,
              password: e.target.value,
            });
            handleChange(e);
          }}
          value={accountData.password}
        />

        <label className={styles.form_label} htmlFor="registerForm_phone">
          Số Điện Thoại
        </label>
        <input
          className={styles.form_input}
          type="text"
          id="registerForm_phone"
          placeholder="Mật Khẩu"
          onChange={(e) => {
            setAccountData({
              ...accountData,
              phone: e.target.value,
            });
            handleChange(e);
          }}
          value={accountData.phone}
        />

        {loading ? (
          <div className="self-center">
            {" "}
            <ReactLoading color="black" />
          </div>
        ) : (
          <button
            type="submit"
            className="self-center w-fit py-4 px-10 mt-5 rounded-2xl bg-black text-white font-light hover:brightness-125 "
          >
            Chỉnh Sửa
          </button>
        )}
      </form>
    </div>
  );
};

export default AccountModForm;
