import { Link } from "@inertiajs/react";

type CurrentPageProps = {
  url: string
}

export default function ButtonNavSuccess({ url }: CurrentPageProps) {
  return (
    <div className="-m-7 mt-6 rounded-b border-t border-neutral-200 bg-neutral-50 p-4 px-10 text-right">
      <Link
        href={url}
        className="inline-flex items-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 hover:bg-primary-700"
      >
        Next
      </Link>
    </div>
  );
}
