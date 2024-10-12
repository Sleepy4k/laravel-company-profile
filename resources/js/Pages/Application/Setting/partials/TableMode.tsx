import { Link } from "@inertiajs/react";
import { convertDateToLocaleString } from "@/utils/parse";
import FilterBar from "@/Components/FilterBar/FilterBar";
import Pagination from "@/Components/Pagination/Pagination";
import Table from "@/Components/Table/Table";

interface ITableModeProps {
  data: any;
  mode: string | null;
}

type TableData = {
  uuid: string;
  display: string;
  value: string;
  description: string;
  type: {
    name: string;
  };
  created_at: string;
  updated_at: string;
};

export default function TableMode({ data, mode }: ITableModeProps) {
  if (mode == null || mode !== "table") return null;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <FilterBar />
        <Link
          className="btn-indigo focus:outline-none"
          href={route("application.create")}
        >
          <span>Create</span>
        </Link>
      </div>
      <Table
        per_page={data.per_page}
        columns={[
          {
            label: "ID",
            name: "id",
            sortable: true,
          },
          {
            label: "Key",
            name: "key",
            sortable: true,
            sticky: true,
          },
          {
            label: "Name",
            name: "display",
            sortable: true,
            renderCell(row) {
              return row.display || "-";
            },
          },
          {
            label: "Value",
            name: "value",
            sortable: true,
            renderCell(row) {
              return row.value || "-";
            },
          },
          {
            label: "Description",
            name: "description",
            sortable: true,
            renderCell(row) {
              return row.description || "-";
            },
          },
          {
            label: "Type",
            name: "type",
            renderCell(row) {
              return row.type.name || "-";
            },
          },
          {
            label: "Created At",
            name: "created_at",
            sortable: true,
            renderCell(row) {
              return convertDateToLocaleString(row.created_at) || "-";
            },
          },
          {
            label: "Updated At",
            name: "updated_at",
            sortable: true,
            renderCell(row) {
              return convertDateToLocaleString(row.updated_at) || "-";
            },
          },
        ]}
        rows={data.data}
        getRowDetailsUrl={(row: TableData) =>
          route("application.show", row.uuid)
        }
      />
      <Pagination links={data.links} />
    </div>
  );
}
