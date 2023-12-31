import React from "react";
import Link from "next/link";
import Image from "next/image";
import "@/styles/login-register.css";
import logo from "@/public/assets/images/logo.png";
import { getServerSession } from "next-auth";
import LoginForm from "./LoginForm";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import styles from "@/styles/Auth.module.css";

import { getRole } from "@/utils/auth";
import { GetRoleResponse } from "@/types/global";

export const metadata = {
  title: "Đăng nhập",
  description: "Login to BK Fact Check system",
};

const Login = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    const response = await getRole({
      email: session!.user!.email!,
    });
    if (response.ok) {
      const data: GetRoleResponse = await response.json();
      if (data.role !== "user") redirect("/admin");
    }
    redirect("/profile");
  }
 
  return (
    <main className={styles.right_container}>
      <div className={styles.right_nav}>
        <Link href={"/"}>
          <Image src={logo} className={styles.nav_img} alt="logo"></Image>
        </Link>
      </div>

      <LoginForm />
    </main>
  );
};

export default Login;
