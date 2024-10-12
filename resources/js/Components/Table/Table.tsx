import { QueryParams } from "@/types";
import can from "@/utils/permission";
import { Link, router, usePage } from "@inertiajs/react";
import get from "lodash/get";
import { ChevronDownIcon, ChevronRight, ChevronUpIcon } from "lucide-react";

type TableProps<T> = {
  columns: {
    isId?: boolean;
    name: string;
    label: string;
    sticky?: boolean;
    colSpan?: number;
    sortable?: boolean;
    renderCell?: (row: T) => React.ReactNode;
  }[];
  rows: T[];
  per_page?: number;
  permission?: string | null;
  getRowDetailsUrl?: (row: T) => string;
};

export default function Table<T>({
  columns = [],
  rows = [],
  permission = null,
  per_page = 10,
  getRowDetailsUrl,
}: TableProps<T>) {
  const queryParams =
    usePage<{ queryParams: QueryParams }>().props.queryParams || {};

  const sortChanged = (name: string, isSortAble: boolean | undefined) => {
    if (!isSortAble) return;

    if (name === queryParams.sort_field) {
      if (queryParams.sort_direction == "asc") {
        queryParams.sort_direction = "desc";
      } else {
        queryParams.sort_direction = "asc";
      }
    } else {
      queryParams.sort_field = name;
      queryParams.sort_direction = "asc";
    }

    router.get(
      route(route().current() as string, route().routeParams),
      queryParams,
      {
        preserveScroll: true,
      }
    );
  };

  const isUserHasPermission = () => {
    if (permission === null) return true;

    return can([permission]);
  };

  const handleID = (index: number) => {
    const currentPage = queryParams?.page ?? 1;
    const showedData = per_page * currentPage - 10;

    return showedData + index;
  };

  return (
    <div className="overflow-x-auto bg-white rounded shadow">
      <table className="w-full whitespace-nowrap">
        <thead>
          <tr key="header-999-head-of-table" className="font-bold text-left">
            {columns?.map((column, index) => (
              <>
                <th
                  onClick={() => sortChanged(column.name, column.sortable)}
                  key={`${index}-${column.name}-head`}
                  colSpan={column.colSpan ?? 1}
                  className={`px-6 py-4 border-b ${
                    column.sticky ? "sticky z-10 left-0 bg-white" : ""
                  }`}
                >
                  <div
                    key={`${index}-${column.name}-head-div`}
                    className={`flex items-center justify-between gap-2 ${
                      column.sortable ? "cursor-pointer" : ""
                    }`}
                  >
                    {column.label}
                    {column.sortable && (
                      <div key={`${index}-${column.name}-head-div-action`}>
                        <ChevronUpIcon
                          className={
                            "w-4 " +
                            (queryParams.sort_field === column.name &&
                            queryParams.sort_direction === "desc"
                              ? "text-white"
                              : "")
                          }
                        />
                        <ChevronDownIcon
                          className={
                            "w-4 -mt-2 " +
                            (queryParams.sort_field === column.name &&
                            queryParams.sort_direction === "asc"
                              ? "text-white"
                              : "")
                          }
                        />
                      </div>
                    )}
                  </div>
                </th>
              </>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Empty state */}
          {rows?.length === 0 && (
            <tr>
              <td
                className="px-6 py-24 border-t text-center"
                colSpan={columns.length}
              >
                No data found.
              </td>
            </tr>
          )}
          {rows?.map((row, row_index) => {
            return (
              <tr
                key={`${row_index}-body-of-table`}
                className="hover:bg-gray-100 focus-within:bg-gray-100"
              >
                {columns.map((column, column_index) => {
                  return (
                    <td
                      key={`${row_index}-${column_index}-${column.name}`}
                      className={`border-t ${
                        column.sticky ? "sticky z-10 left-0 bg-white" : ""
                      }`}
                    >
                      {isUserHasPermission() && getRowDetailsUrl ? (
                        <Link
                          tabIndex={-1}
                          href={getRowDetailsUrl?.(row) as string}
                          className="flex items-center px-6 py-4 lg:max-w-[20vw] overflow-hidden focus:text-indigo focus:outline-none"
                        >
                          {column.isId
                            ? handleID(row_index + 1)
                            : column.renderCell?.(row) ??
                              get(row, column.name) ??
                              "N/A"}
                        </Link>
                      ) : (
                        <div className="flex items-center px-6 py-4 lg:max-w-[20vw] overflow-hidden">
                          {column.isId
                            ? handleID(row_index + 1)
                            : column.renderCell?.(row) ??
                              get(row, column.name) ??
                              "N/A"}
                        </div>
                      )}
                    </td>
                  );
                })}
                {isUserHasPermission() && getRowDetailsUrl && (
                  <td
                    key={`234634634-button-default`}
                    className="w-px border-t"
                  >
                    <Link
                      href={getRowDetailsUrl?.(row)!}
                      className="flex items-center px-4 focus:outline-none"
                    >
                      <ChevronRight size={24} className="text-gray-400" />
                    </Link>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
