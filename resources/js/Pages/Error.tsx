import { PageProps } from "@/types"
import { Link } from "@inertiajs/react"

export default function ErrorPage({
    auth,
    home,
    status = 500,
    title = 'Something Went Wrong',
    description = 'Sorry, we are having trouble loading the page you are looking for.',
}: PageProps<{ home: string, status: number, title: string, description: string }>) {
    const redirectUrl = () => {
        if (auth && auth.user && auth.user !== null) {
            return route('dashboard.index');
        } else {
            return '/';
        }
    }

    return (
        <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
            <div className="text-center">
                <p className="text-base font-semibold text-indigo-600">{status}</p>
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">{title}</h1>
                <p className="mt-6 text-base leading-7 text-gray-600">{description}</p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <Link href={redirectUrl()} className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        {home}
                    </Link>
                </div>
            </div>
        </main>
    )
}
