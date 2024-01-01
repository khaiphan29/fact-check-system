import { useMemo, useState, useEffect } from "react";
import AccountTable from "./components/AccountTable";

import { AccountListResponse } from "@/types/global";
import { getAccountList } from "@/utils/auth";
import PopUpRegister from "./components/PopUpRegisterForm";

//AccountMgmt data type
type Account = {
  name: string;
  email: string;
  username: string;
  role: string;
  phone: string;
};

interface Props {
  email: string;
}

const AccountMgmt = (props: Props) => {
  const [accountList, setAccountList] = useState<Account[]>([]);
  const [isRegister, setIsRegister] = useState<boolean>(false);

  async function fetchAccountData() {
    const res: Response = await getAccountList({
      email: props.email,
    });
    if (res.ok) {
      const data: AccountListResponse = await res.json();
      setAccountList(data.accounts);
    }
  }

  useEffect(() => {
    fetchAccountData();
  }, []);

  return (
    <div>
      {isRegister && <PopUpRegister setCloseFunction={setIsRegister} />}

      <div className="px-4 flex justify-between">
        <div
          className="ml-auto p-4 py-3 border rounded-xl cursor-pointer hover:bg-black hover:text-white transition-all duration-200"
          onClick={() => {
            setIsRegister(true);
          }}
        >
          Tạo Tài Khoản
        </div>
      </div>
      <AccountTable accounts={accountList} />
    </div>
  );
};

export default AccountMgmt;
