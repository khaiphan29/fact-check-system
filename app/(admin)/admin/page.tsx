import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import SideNavigator from "./SideNavigator";

const Page = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className="">
      <SideNavigator email={session?.user?.email!} />
    </div>
  );
};

export default Page;
