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

export const metadata = {
  title: "Đăng nhập",
  description: "Login to BK Fact Check system",
};

const Login = async () => {
  const session = await getServerSession(authOptions);
  console.log(session);
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

      <LoginForm />
    </main>
  );
};

export default Login;
// export async function getServerSideProps({ req }: GetSessionParams){
//   const session = await getSession({ req })

//   if(session){
//     return {
//       redirect : {
//         destination: '/',
//         permanent: false
//       }
//     }
//   }

//   return {
//     props: { session }
//   }
// }
