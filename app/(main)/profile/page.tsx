import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import styles from "./Profile.module.css";
import AccountModForm from "@/components/AccountModForm";

const Profile = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  return (
    <main className={styles.main}>
      <h1 className={styles.username}>{session.user?.email}</h1>
      <AccountModForm email={session.user?.email!} isUser={true} />
    </main>
  );
};

export default Profile;
