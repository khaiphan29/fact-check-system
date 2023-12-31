import { useMemo, useState, useEffect } from "react";
import { getServerSession } from "next-auth";

import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  type MRT_RowSelectionState,
} from "material-react-table";

//AccountMgmt data type
type Feedback = {
  id: number;
  isPositive: string;
  feedBackCheck: {
    isIncorrectEvidence: string;
    isIncorrectRating: string;
  }; 
  description: string;
};

type Props = {
  feedbacks: Feedback[];
};

const FeedbackTable = (props: Props) => {
  const data: Feedback[] = props.feedbacks;
  //should be memoized or stable
  const columns = useMemo<MRT_ColumnDef<Feedback>[]>(
    () => [
      {
        accessorKey: "isPositive", //access nested data with dot notation
        header: "Tích cực",
        size: 150,
      },
      {
        accessorKey: "feedBackCheck.isIncorrectEvidence",
        header: "Sai Minh Chứng",
        size: 150,
      },
      {
        accessorKey: "feedBackCheck.isIncorrectRating", //normal accessorKey
        header: "Sai Nhận Định",
        size: 200,
      },
      {
        accessorKey: "description",
        header: "Mô tả",
        size: 150,
      },
    ],
    []
  );

  // const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});

  const table = useMaterialReactTable({
    columns,
    data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    muiPaginationProps: {
      rowsPerPageOptions:
        props.feedbacks.length < 50 ? [props.feedbacks.length] : [50, 100, 200],
      showFirstButton: true,
      showLastButton: true,
    },
    enableRowSelection: true,
    enableMultiRowSelection: false,
  });

  useEffect(() => {
    //fetch data based on row selection state or something
    const idx = Number(Object.keys(table.getState().rowSelection)[0]);
    console.log(data[idx]);
  }, [table.getState().rowSelection]);

  return (
    <div>
      <MaterialReactTable table={table} />
    </div>
  );
};

export default FeedbackTable;
