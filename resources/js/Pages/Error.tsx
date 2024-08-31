export default function ErrorPage({ status }: { status: number }) {
    const title = {
        503: '503: Service Unavailable',
        500: '500: Server Error',
        429: '429: Too Many Requests',
        404: '404: Page Not Found',
        403: '403: Forbidden',
    }[status]

    const description = {
        503: 'Sorry, we are doing some maintenance. Please check back soon.',
        500: 'Whoops, something went wrong on our servers.',
        429: 'Sorry, you are making too many requests to our servers.',
        404: 'Sorry, the page you are looking for could not be found.',
        403: 'Sorry, you are forbidden from accessing this page.',
    }[status]

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="text-center text-3xl font-extrabold text-gray-900">{title}</h2>
                    <p className="mt-2 text-center text-sm text-gray-600">{description}</p>
                </div>
            </div>
        </div>
    )
}
