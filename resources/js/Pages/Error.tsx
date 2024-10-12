import { PageProps } from "@/types";
import { Head, Link } from "@inertiajs/react";

type ErrorPageProps = PageProps<{
  home: string;
  status: number;
  title: string;
  description: string;
  home_url?: string;
}>;

export default function ErrorPage({
  auth,
  home,
  home_url = "",
  status = 500,
  title = "Something Went Wrong",
  description = "Sorry, we are having trouble loading the page you are looking for.",
}: ErrorPageProps) {
  const redirectUrl = auth && auth.user ? route("dashboard.index") : "/";

  return (
    <div className="flex items-center justify-center min-h-screen p-5 text-indigo-100 bg-gray-800">
      <Head title={`${status} ${title}`} />
      <div className="w-full max-w-md">
        <h1 className="text-3xl">{`${status} ${title}`}</h1>
        <p className="mt-3 text-lg leading-tight">{description}</p>
        <div className="mt-5">
          <Link href={home_url || redirectUrl} className="mt-5 btn btn-primary">
            {home}
          </Link>
        </div>
      </div>
    </div>
  );
}
