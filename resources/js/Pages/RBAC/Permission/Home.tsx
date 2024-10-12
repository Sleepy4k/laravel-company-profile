import { PageProps } from "@/types";
import { Link } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import TableMode from "./partials/TableMode";

function Home({ data }: PageProps<{ data: any }>) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6 lg:flex-row flex-col">
        <h1 className="mb-8 text-3xl font-bold">
          <Link
            href={route(route().current() as string, route().routeParams)}
            className="text-indigo-600 hover:text-indigo-700"
          >
            Permission
          </Link>
          <span className="font-medium text-indigo-600"> /</span> Table
        </h1>
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
Home.layout = (page: React.ReactNode) => (
  <MainLayout title="Permission" children={page} />
);

export default Home;
