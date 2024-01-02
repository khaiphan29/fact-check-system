import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import AccountModForm from "@/components/AccountModForm";

export const metadata = {
  title: "Thông Tin Cá Nhân",
  description: "",
};

const Profile = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen pt-10 flex flex-col items-center">
      <div className="flex justify-between items-end">
        <p className="text-2xl">{session.user?.email}</p>
        {/* <div className="ml-5">chỉnh sửa</div> */}
      </div>
      <AccountModForm email={session.user?.email!} isUser={true} />
    </main>
  );
};

export default Profile;
