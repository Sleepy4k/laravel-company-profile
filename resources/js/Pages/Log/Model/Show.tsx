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
                    <Link href={backUrl} className='bg-primary-700 lg:py-2 py-1 lg:px-3 px-2 text-white dark:text-gray-800 rounded shadow transition-all dark:bg-white hover:bg-primary-700 dark:hover:bg-white dark:focus:bg-white'>
                        Back
                    </Link>
                </ResponsiveHeader>
            }
        >
            <div className="bg-white dark:bg-gray-800 lg:w-[35rem] w-[20rem] mx-auto px-6 py-4">
                <div>
                    <label htmlFor="id" className="block text-sm font-medium text-gray-700 dark:text-gray-400">ID</label>
                    <TextInput
                        disabled
                        id="id"
                        value={data.id}
                        className="mt-1 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border-gray-300 rounded-md"
                    />
                </div>

                <div className="mt-4">
                    <label htmlFor="event" className="block text-sm font-medium text-gray-700 dark:text-gray-400">Event</label>
                    <TextInput
                        disabled
                        id="event"
                        value={capitalizeFirstLetter(data.event)}
                        className="mt-1 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border-gray-300 rounded-md"
                    />
                </div>

                <div className="mt-4">
                    <label htmlFor="subject_type" className="block text-sm font-medium text-gray-700 dark:text-gray-400">Subject Type</label>
                    <TextInput
                        disabled
                        id="subject_type"
                        value={data.subject_type}
                        className="mt-1 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border-gray-300 rounded-md"
                    />
                </div>

                <div className="mt-4">
                    <label htmlFor="subject_id" className="block text-sm font-medium text-gray-700 dark:text-gray-400">Subject Id</label>
                    <TextInput
                        disabled
                        id="subject_id"
                        value={data.subject_id}
                        className="mt-1 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border-gray-300 rounded-md"
                    />
                </div>

                <div className="mt-4">
                    <label htmlFor="causer_type" className="block text-sm font-medium text-gray-700 dark:text-gray-400">Causer Type</label>
                    <TextInput
                        disabled
                        id="causer_type"
                        value={data.causer_type}
                        className="mt-1 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border-gray-300 rounded-md"
                    />
                </div>

                <div className="mt-4">
                    <label htmlFor="causer_id" className="block text-sm font-medium text-gray-700 dark:text-gray-400">Causer Id</label>
                    <TextInput
                        disabled
                        id="causer_id"
                        value={data.causer_id}
                        className="mt-1 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border-gray-300 rounded-md"
                    />
                </div>

                <div className="mt-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-400">Description</label>
                    <TextInput
                        disabled
                        id="description"
                        value={data.description}
                        className="mt-1 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border-gray-300 rounded-md"
                    />
                </div>

                <div className="mt-4">
                    <label htmlFor="properties" className="block text-sm font-medium text-gray-700 dark:text-gray-400">Properties</label>
                    <textarea
                        disabled
                        id="properties"
                        value={convertObjectToString(data.properties)}
                        className="mt-1 block w-full h-fit shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                    />
                </div>

                <div className="mt-4">
                    <label htmlFor="created_at" className="block text-sm font-medium text-gray-700 dark:text-gray-400">Created At</label>
                    <TextInput
                        disabled
                        id="created_at"
                        value={convertDateToLocaleString(data.created_at)}
                        className="mt-1 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border-gray-300 rounded-md"
                    />
                </div>

                <div className="mt-4">
                    <label htmlFor="updated_at" className="block text-sm font-medium text-gray-700 dark:text-gray-400">Updated At</label>
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
