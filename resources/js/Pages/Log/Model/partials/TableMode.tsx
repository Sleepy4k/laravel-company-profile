import { capitalizeFirstLetter, convertDateToLocaleString, convertObjectToString } from "@/utils/parse";
import FilterBar from "@/Components/FilterBar/FilterBar";
import Pagination from "@/Components/Pagination/Pagination";
import Table from "@/Components/Table/Table";

interface ITableModeProps {
  data: any;
}

type TableData = {
  id: number;
  event: string;
  causer_type: string;
  causer_id: number;
  subject_type: string;
  subject_id: number;
  description: string;
  properties: string[];
  created_at: string;
  updated_at: string;
};

export default function TableMode({ data }: ITableModeProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <FilterBar />
      </div>
      <Table
        columns={[
          {
            label: "ID",
            name: "id",
            sortable: true,
          },
          {
            label: "Event",
            name: "event",
            sortable: true,
            sticky: true,
            renderCell(row) {
              return capitalizeFirstLetter(row.event) || "-";
            },
          },
          {
            label: "Subject",
            name: "subject_id",
            sortable: true,
            renderCell(row) {
              if (!row.subject_type || row.subject_type == null) return "-";

              return `${row.subject_type} (${row.subject_id || "-"})`;
            },
          },
          {
            label: "Causer",
            name: "causer_id",
            sortable: true,
            renderCell(row) {
              if (!row.causer_type || row.causer_type == null) return "-";

              return `${row.causer_type} (${row.causer_id || "-"})`;
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
            label: "Properties",
            name: "properties",
            sortable: false,
            renderCell(row) {
              return convertObjectToString(row.properties) || "-";
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
        permission="log.model.show"
        rows={data.data}
        getRowDetailsUrl={(row: TableData) =>
          route("log.model.show", row.id)
        }
      />
      <Pagination links={data.links} />
    </div>
  );
}
