import { Link } from "@inertiajs/react";
import { capitalizeFirstLetter, convertDateToLocaleString } from "@/utils/parse";
import FilterBar from "@/Components/FilterBar/FilterBar";
import Pagination from "@/Components/Pagination/Pagination";
import Table from "@/Components/Table/Table";

interface ITableModeProps {
  data: any;
  mode: string | null;
}

type TableData = {
  uuid: string;
  group: string;
  key: string;
  text: {
    id: string;
    en: string;
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
          href={route("translate.create")}
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
            label: "Computed Key",
            name: "computed_key",
            sticky: true,
            renderCell(row) {
              return row.group + "." + row.key;
            },
          },
          {
            label: "Group",
            name: "group",
            sortable: true,
            renderCell(row) {
              return capitalizeFirstLetter(row.group) || "-";
            },
          },
          {
            label: "Key",
            name: "key",
            sortable: true,
          },
          {
            label: "Indonesian",
            name: "text",
            sortable: true,
            renderCell(row) {
              return row.text.id || "-";
            },
          },
          {
            label: "English",
            name: "text",
            sortable: true,
            renderCell(row) {
              return row.text.en || "-";
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
          route("translate.show", row.uuid)
        }
      />
      <Pagination links={data.links} />
    </div>
  );
}
