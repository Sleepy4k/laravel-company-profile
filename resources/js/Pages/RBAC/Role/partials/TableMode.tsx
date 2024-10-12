import {
  capitalizeFirstLetter,
  convertDateToLocaleString,
} from "@/utils/parse";
import FilterBar from "@/Components/FilterBar/FilterBar";
import Pagination from "@/Components/Pagination/Pagination";
import Table from "@/Components/Table/Table";
import { Link } from "@inertiajs/react";

interface ITableModeProps {
  data: any;
}

type TableData = {
  id: number;
  uuid: string;
  name: string;
  guard_name: string;
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
          href={route("rbac.roles.create")}
        >
          <span>Create</span>
        </Link>
      </div>
      <Table
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
            renderCell(row) {
              return capitalizeFirstLetter(row.name) || "-";
            },
          },
          {
            label: "Guard Name",
            name: "guard_name",
            sortable: true,
            renderCell(row) {
              return capitalizeFirstLetter(row.guard_name) || "-";
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
        permission="rbac.role.show"
        rows={data.data}
        getRowDetailsUrl={(row: TableData) =>
          route("rbac.roles.show", row.uuid)
        }
      />
      <Pagination links={data.links} />
    </div>
  );
}
