import React from "react";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import styles from "@/styles/Auth.module.css";
import logo from "@/public/assets/images/logo.png";
import RegisterForm from "./RegisterForm";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";

export const metadata = {
  title: "Register",
  description: "Create a new account in BK Fact Check system",
};

const Register = async () => {
  const session = await getServerSession(authOptions);
  // console.log(session);
  if (session) {
    redirect("/profile");
  }

  return (
    <main className={styles.right_container}>
      <div className={styles.right_nav}>
        <Link href={"/"}>
          <Image src={logo} className={styles.nav_img} alt="logo"></Image>
        </Link>
      </div>

      <RegisterForm />
    </main>
  );
};

export default Register;
