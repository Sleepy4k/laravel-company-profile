import {
  capitalizeFirstLetter,
  convertDateToLocaleString,
} from "@/utils/parse";
import FilterBar from "@/Components/FilterBar/FilterBar";
import Pagination from "@/Components/Pagination/Pagination";
import Table from "@/Components/Table/Table";

interface ITableModeProps {
  data: any;
}

type TableData = {
  name: string;
  type: string;
  content: string;
  size: number;
  last_updated: string;
};

export default function HomeTable({ data }: ITableModeProps) {
  const convertNameToRoute = (name: string) => {
    // so we had file name like "laravel-2024-09-08.log"
    // we need to convert it to "2024-09-08"
    return name.split("-").slice(1).join("-").split(".")[0];
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
            label: "Name",
            name: "name",
            sortable: true,
            sticky: true,
            renderCell(row) {
              return capitalizeFirstLetter(row.name.split(".")[0]) || "-";
            },
          },
          {
            label: "File Extension",
            name: "ext",
            sortable: false,
            renderCell(row) {
              return capitalizeFirstLetter(row.name.split(".")[1]) || "-";
            },
          },
          {
            label: "Type",
            name: "type",
            sortable: true,
            renderCell(row) {
              return capitalizeFirstLetter(row.type) || "-";
            },
          },
          {
            label: "Content Type",
            name: "content",
            sortable: true,
            renderCell(row) {
              return row.content || "-";
            },
          },
          {
            label: "File Size",
            name: "size",
            sortable: true,
            renderCell(row) {
              return row.size || "-";
            },
          },
          {
            label: "Last Modified At",
            name: "last_updated",
            sortable: true,
            renderCell(row) {
              return convertDateToLocaleString(row.last_updated) || "-";
            },
          },
        ]}
        permission="log.system.index"
        rows={data.data}
        getRowDetailsUrl={(row: TableData) =>
          route("log.system.show", convertNameToRoute(row.name))
        }
      />
      <Pagination links={data.links} />
    </div>
  );
}
