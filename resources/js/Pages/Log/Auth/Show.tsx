import { PageProps } from "@/types";
import { Link } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import ResponsiveHeader from "@/Components/ResponsiveHeader";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { capitalizeFirstLetter, convertDateToLocaleString, convertObjectToString } from "@/utils/parse";

export default function Show({ auth, data, backUrl }: PageProps<{ data: any, backUrl: string }>) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            title="View Authentication Log"
            header={
                <ResponsiveHeader>
                    <Link href={backUrl} className='bg-primary-700 py-2 px-3 text-white rounded shadow transition-all hover:bg-primary-700'>
                        Back
                    </Link>
                </ResponsiveHeader>
            }
        >
            <div className="bg-white lg:w-[35rem] w-[20rem] mb-5 mx-auto px-6 py-4">
                <div>
                    <label htmlFor="id" className="block text-sm font-medium text-gray-700">ID</label>
                    <TextInput
                        disabled
                        id="id"
                        value={data.id}
                        className="mt-1 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border-gray-300 rounded-md"
                    />
                </div>

                <div className="mt-4">
                    <label htmlFor="event" className="block text-sm font-medium text-gray-700">Event</label>
                    <TextInput
                        disabled
                        id="event"
                        value={capitalizeFirstLetter(data.event)}
                        className="mt-1 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border-gray-300 rounded-md"
                    />
                </div>

                <div className="mt-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <TextInput
                        disabled
                        id="description"
                        value={data.description}
                        className="mt-1 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border-gray-300 rounded-md"
                    />
                </div>

                <div className="mt-4">
                    <label htmlFor="causer_type" className="block text-sm font-medium text-gray-700">Causer Type</label>
                    <TextInput
                        disabled
                        id="causer_type"
                        value={data.causer_type}
                        className="mt-1 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border-gray-300 rounded-md"
                    />
                </div>

                <div className="mt-4">
                    <label htmlFor="causer_id" className="block text-sm font-medium text-gray-700">Causer Id</label>
                    <TextInput
                        disabled
                        id="causer_id"
                        value={data.causer_id}
                        className="mt-1 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border-gray-300 rounded-md"
                    />
                </div>

                <div className="mt-4">
                    <label htmlFor="properties" className="block text-sm font-medium text-gray-700">Properties</label>
                    <textarea
                        disabled
                        id="properties"
                        value={convertObjectToString(data.properties)}
                        className="mt-1 block w-full h-fit shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border-gray-300 rounded-md"
                    />
                </div>

                <div className="mt-4">
                    <label htmlFor="created_at" className="block text-sm font-medium text-gray-700">Created At</label>
                    <TextInput
                        disabled
                        id="created_at"
                        value={convertDateToLocaleString(data.created_at)}
                        className="mt-1 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border-gray-300 rounded-md"
                    />
                </div>

                <div className="mt-4">
                    <label htmlFor="updated_at" className="block text-sm font-medium text-gray-700">Updated At</label>
                    <TextInput
                        disabled
                        id="updated_at"
                        value={convertDateToLocaleString(data.updated_at)}
                        className="mt-1 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border-gray-300 rounded-md"
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
