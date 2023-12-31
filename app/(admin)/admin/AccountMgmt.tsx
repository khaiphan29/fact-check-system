import { useMemo, useState, useEffect } from "react";
import { getServerSession } from "next-auth";

import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  type MRT_RowSelectionState,
} from "material-react-table";
import AccountTable from "./components/AccountTable";

import { AccountListResponse } from "@/types/global";
import { getAccountList } from "@/utils/auth";

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
      <div className="px-4 flex justify-between">
        <div className="flex gap-4">
          {/* <div
            className={
              multiSelection
                ? "p-4 py-3 border rounded-xl cursor-pointer bg-black text-white"
                : "p-4 py-3 border rounded-xl cursor-pointer hover:bg-black hover:text-white transition-all duration-200"
            }
            onClick={() => {
              selectMultiSelection(!multiSelection);
            }}
          >
            Chọn Nhiều Tài Khoản
          </div> */}
          <div className="p-4 py-3 border rounded-xl cursor-pointer hover:bg-black hover:text-white transition-all duration-200">
            Sửa Thông Tin
          </div>
          <div className="p-4 py-3 border rounded-xl cursor-pointer hover:bg-black hover:text-white transition-all duration-200">
            Xoá Tài Khoản
          </div>
        </div>

        <div className="p-4 py-3 border rounded-xl cursor-pointer hover:bg-black hover:text-white transition-all duration-200">
          Tạo Tài Khoản
        </div>
      </div>
      <AccountTable accounts={accountList} />
    </div>
  );
};

export default AccountMgmt;
