import React from "react";
import Link from "next/link";
import Image from "next/image";
import "@/styles/login-register.css";
import logo from "@/public/assets/images/logo.png";
import { getServerSession } from "next-auth";
import LoginForm from "./LoginForm";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const Login = async () => {
  const session = await getServerSession(authOptions);
  console.log(session);
  if (session) {
    redirect("/profile");
  }
  return (
    <div className="auth-container">
      <div className="auth-container__left">
        <Image src={logo} className="auth-img" alt="logo"></Image>
      </div>

      <LoginForm />
    </div>
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
