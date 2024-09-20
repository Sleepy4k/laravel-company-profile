import { PageProps } from "@/types";
import { Link } from "@inertiajs/react";
import { useEffect, useState } from "react";
import TextInput from "@/Components/TextInput";
import { convertDateToLocaleString } from "@/utils/parse";
import ResponsiveHeader from "@/Components/ResponsiveHeader";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Show({ data, backUrl }: PageProps<{ data: any, backUrl: string }>) {
    const [isFile, setIsFile] = useState(false);

    useEffect(() => {
        if (data.type.category === 'file') {
            setIsFile(true);
        }
    }, []);

    return (
        <AuthenticatedLayout
            title="View Application"
            header={
                <ResponsiveHeader>
                    <Link href={route('application.edit', data?.uuid || 0)} className='bg-primary-700 lg:py-2 py-1 lg:px-3 px-2 text-white dark:text-gray-800 rounded shadow transition-all dark:bg-white hover:bg-primary-700 dark:hover:bg-white dark:focus:bg-white'>
                        Edit
                    </Link>
                    <Link href={backUrl} className='bg-primary-700 lg:py-2 py-1 lg:px-3 px-2 text-white dark:text-gray-800 rounded shadow transition-all dark:bg-white hover:bg-primary-700 dark:hover:bg-white dark:focus:bg-white'>
                        Back
                    </Link>
                </ResponsiveHeader>
            }
        >
            <div className="bg-white dark:bg-gray-800 lg:w-[35rem] w-[20rem] mx-auto px-6 py-4">
                <div>
                    <label htmlFor="key" className="block text-sm font-medium text-gray-700 dark:text-gray-400">Key</label>
                    <TextInput
                        disabled
                        id="key"
                        value={data.key}
                        className="mt-1 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border-gray-300 rounded-md"
                    />
                </div>

                <div className="mt-4">
                    <label htmlFor="display" className="block text-sm font-medium text-gray-700 dark:text-gray-400">Display</label>
                    <TextInput
                        disabled
                        id="display"
                        value={data.display}
                        className="mt-1 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border-gray-300 rounded-md"
                    />
                </div>

                {isFile ? (
                    <div className="mt-4">
                        <label htmlFor="file" className="block text-sm font-medium text-gray-700 dark:text-gray-400">File</label>
                            <div className="mt-2 card bg-base-100 w-[15rem] shadow-xl">
                                <figure>
                                    <img src={data.value} alt="File Preview"/>
                                </figure>
                            </div>
                    </div>
                ) : (
                    <div className="mt-4">
                        <label htmlFor="value" className="block text-sm font-medium text-gray-700 dark:text-gray-400">Value</label>
                        <TextInput
                            disabled
                            id="value"
                            value={data.value}
                            className="mt-1 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border-gray-300 rounded-md"
                        />
                    </div>
                )}

                <div className="mt-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-400">Description</label>
                    <textarea
                        disabled
                        id="description"
                        value={data.description}
                        className="mt-1 block w-full h-fit shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                    />
                </div>

                <div className="mt-4">
                    <label htmlFor="type_id" className="block text-sm font-medium text-gray-700 dark:text-gray-400">Type</label>
                    <TextInput
                        disabled
                        id="type_id"
                        value={data.type.name}
                        className="mt-1 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border-gray-300 rounded-md"
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
