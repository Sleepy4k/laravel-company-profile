import { PageProps } from "@/types";
import { Link } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import TableMode from "./partials/ShowTable";

function Show({ data }: PageProps<{ data: any }>) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6 lg:flex-row flex-col">
        <h1 className="mb-8 text-3xl font-bold">
          <Link
            href={route("log.query.index")}
            className="text-indigo-600 hover:text-indigo-700"
          >
            Query
          </Link>
          <span className="font-medium text-indigo-600"> /</span> Show
        </h1>
        <div className="flex items-center lg:gap-5 gap-1 lg:flex-row flex-col">
          <Link
            href={route("log.query.index")}
            className="btn btn-indigo focus:outline-none"
          >
            Back
          </Link>
        </div>
      </div>

      <TableMode data={data} />
    </div>
  );
}

/**
 * Persistent Layout (Inertia.js)
 *
 * [Learn more](https://inertiajs.com/pages#persistent-layouts)
 */
Show.layout = (page: React.ReactNode) => (
  <MainLayout title="Show Query Log" children={page} />
);

export default Show;
