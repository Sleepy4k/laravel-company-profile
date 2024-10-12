import {
  capitalizeFirstLetter,
  convertDateToLocaleString,
} from "@/utils/parse";
import FilterBar from "@/Components/FilterBar/FilterBar";
import Pagination from "@/Components/Pagination/Pagination";
import Table from "@/Components/Table/Table";
import DetailData from "./DetailData";
import { useState } from "react";

interface ITableModeProps {
  data: any;
}

type TableData = {
  env: string;
  type: string;
  message: string;
  timestamp: string;
};

export default function ShowTable({ data }: ITableModeProps) {
  const [isShow, setIsShow] = useState<boolean>(false);
  const [detailData, setDetailData] = useState<TableData | null>(null);

  const handleDetailButton = (data: TableData) => {
    setIsShow(true);
    setDetailData(data);
  };

  const handleCloseDetail = () => {
    setIsShow(false);
    setDetailData(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <FilterBar />
      </div>
      <Table
        per_page={data.per_page}
        columns={[
          {
            label: "ID",
            name: "id",
            sortable: false,
            isId: true,
          },
          {
            label: "Environment",
            name: "env",
            sortable: true,
            renderCell(row: TableData) {
              return capitalizeFirstLetter(row.env) || "-";
            },
          },
          {
            label: "Type",
            name: "type",
            sortable: true,
            sticky: true,
            renderCell(row: TableData) {
              return row.type || "-";
            },
          },
          {
            label: "Message",
            name: "message",
            sortable: true,
            renderCell(row: TableData) {
              return row.message || "-";
            },
          },
          {
            label: "Logged At",
            name: "timestamp",
            sortable: true,
            renderCell(row: TableData) {
              return (
                convertDateToLocaleString(row.timestamp) +
                " (" +
                row.timestamp.split(" ")[1] +
                ")"
              );
            },
          },
          {
            label: "Action",
            name: "action",
            sortable: false,
            renderCell(row: TableData) {
              return (
                <button type="button" onClick={() => handleDetailButton(row)}>
                  Detail
                </button>
              );
            },
          },
        ]}
        rows={data.data}
      />
      <Pagination links={data.links} />

      <DetailData
        data={detailData}
        isShow={isShow}
        closeModal={handleCloseDetail}
      />
    </div>
  );
}
