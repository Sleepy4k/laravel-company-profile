import { PageProps } from "@/types";
import { Link } from "@inertiajs/react";
import TextInput from '@/Components/TextInput';
import ResponsiveHeader from "@/Components/ResponsiveHeader";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Create({ auth, data, backUrl }: PageProps<{ data: any, backUrl: string }>) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            title="View Translation"
            header={
                <ResponsiveHeader>
                    <Link href={route('translate.edit', data?.uuid || 0)} className='bg-primary-700 lg:py-2 py-1 lg:px-3 px-2 text-white dark:text-gray-800 rounded shadow transition-all dark:bg-white hover:bg-primary-700 dark:hover:bg-white dark:focus:bg-white'>
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
                    <label htmlFor="group" className="block text-sm font-medium text-gray-700 dark:text-gray-400">Group</label>
                    <TextInput
                        disabled
                        id="group"
                        type="text"
                        value={data.group}
                        className="mt-1 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border-gray-300 rounded-md"
                    />
                </div>

                <div className="mt-4">
                    <label htmlFor="key" className="block text-sm font-medium text-gray-700 dark:text-gray-400">Key</label>
                    <TextInput
                        disabled
                        id="key"
                        type="text"
                        value={data.key}
                        className="mt-1 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border-gray-300 rounded-md"
                    />
                </div>

                <div className="mt-4">
                    <label htmlFor="lang_id" className="block text-sm font-medium text-gray-700 dark:text-gray-400">Indonesian</label>
                    <TextInput
                        disabled
                        id="lang_id"
                        type="text"
                        value={data.text.id}
                        className="mt-1 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border-gray-300 rounded-md"
                    />
                </div>

                <div className="mt-4">
                    <label htmlFor="lang_en" className="block text-sm font-medium text-gray-700 dark:text-gray-400">English</label>
                    <TextInput
                        disabled
                        id="lang_en"
                        type="text"
                        value={data.text.en}
                        className="mt-1 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border-gray-300 rounded-md"
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
