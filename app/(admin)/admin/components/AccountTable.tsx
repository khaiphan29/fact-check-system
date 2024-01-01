import { useMemo, useState, useEffect } from "react";
import { getServerSession } from "next-auth";

import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  type MRT_RowSelectionState,
} from "material-react-table";
import PopUpAccountMod from "./PopUpAccounMod";

//AccountMgmt data type
type Account = {
  name: string;
  email: string;
  username: string;
  role: string;
  phone: string;
};

type Props = {
  accounts: Account[];
};

const AccountTable = (props: Props) => {
  const data: Account[] = props.accounts;
  const [isModifying, setIsModifying] = useState<boolean>(false);
  const [email, setEmail] = useState<string>();

  //should be memoized or stable
  const columns = useMemo<MRT_ColumnDef<Account>[]>(
    () => [
      {
        accessorKey: "name", //access nested data with dot notation
        header: "Name",
        size: 150,
      },
      {
        accessorKey: "email",
        header: "Email",
        size: 150,
      },
      {
        accessorKey: "username", //normal accessorKey
        header: "Username",
        size: 200,
      },
      {
        accessorKey: "role",
        header: "Role",
        size: 150,
      },
      {
        accessorKey: "phone",
        header: "Phone",
        size: 150,
      },
    ],
    []
  );

  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});

  const table = useMaterialReactTable({
    columns,
    data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    muiPaginationProps: {
      rowsPerPageOptions:
        props.accounts.length < 50 ? [props.accounts.length] : [50, 100, 200],
      showFirstButton: true,
      showLastButton: true,
    },
    getRowId: (row) => row.email,
    muiTableBodyRowProps: ({ row }) => ({
      //implement row selection click events manually
      onClick: () => {
        setIsModifying(true);
        setEmail(row.id);
      },
      sx: {
        cursor: "pointer",
      },
    }),
    onRowSelectionChange: setRowSelection,
    state: { rowSelection },
    // enableRowSelection: true,
    // enableMultiRowSelection: false,
  });

  useEffect(() => {
    //fetch data based on row selection state or something
    const idx = Number(Object.keys(table.getState().rowSelection)[0]);
    console.log(data[idx]);
  }, [table.getState().rowSelection]);

  return (
    <div>
      {isModifying && (
        <PopUpAccountMod email={email!} setCloseFunction={setIsModifying} />
      )}
      <MaterialReactTable table={table} />
    </div>
  );
};

export default AccountTable;
