import { Link } from "@inertiajs/react";
import { capitalizeFirstLetter, convertDateToLocaleString } from "@/utils/parse";
import FilterBar from "@/Components/FilterBar/FilterBar";
import Pagination from "@/Components/Pagination/Pagination";
import Table from "@/Components/Table/Table";

interface ITableModeProps {
  data: any;
}

type TableData = {
  uuid: string;
  name: string;
  description: string;
  category: string;
  created_at: string;
  updated_at: string;
};

export default function TableMode({ data }: ITableModeProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <FilterBar />
        <Link
          className="btn-indigo focus:outline-none"
          href={route("application.type.create")}
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
            label: "Name",
            name: "name",
            sortable: true,
            sticky: true,
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
            label: "Category",
            name: "category",
            sortable: true,
            renderCell(row) {
              return capitalizeFirstLetter(row.category) || "-";
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
          route("application.type.show", row.uuid)
        }
      />
      <Pagination links={data.links} />
    </div>
  );
}
