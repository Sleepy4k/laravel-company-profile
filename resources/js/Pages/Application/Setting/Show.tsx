import { PageProps } from "@/types";
import { Link } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import ResponsiveHeader from "@/Components/ResponsiveHeader";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Show({ auth, data, app, errors }: PageProps<{ data: any, success?: string }>) {
    return (
        <AuthenticatedLayout
            app={app}
            user={auth.user}
            title="View Application"
            header={
                <ResponsiveHeader>
                    <Link href={route('application.edit', data?.id || 0)} className='bg-primary-700 py-2 px-3 text-white rounded shadow transition-all hover:bg-primary-700'>
                        Edit
                    </Link>
                    <Link href={route('application.index', { type: 'table' })} className='bg-primary-700 py-2 px-3 text-white rounded shadow transition-all hover:bg-primary-700'>
                        Back
                    </Link>
                </ResponsiveHeader>
            }
        >
            <div className="bg-white max-w-[35%] mx-auto px-6 py-4">
                <div>
                    <label htmlFor="key" className="block text-sm font-medium text-gray-700">Key</label>
                    <TextInput
                        disabled
                        id="key"
                        value={data.key}
                        className="mt-1 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border-gray-300 rounded-md"
                    />
                </div>

                <div className="mt-4">
                    <label htmlFor="display" className="block text-sm font-medium text-gray-700">Display</label>
                    <TextInput
                        disabled
                        id="display"
                        value={data.display}
                        className="mt-1 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border-gray-300 rounded-md"
                    />
                </div>

                <div className="mt-4">
                    <label htmlFor="value" className="block text-sm font-medium text-gray-700">Value</label>
                    <TextInput
                        disabled
                        id="value"
                        value={data.value}
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
                    <label htmlFor="type_id" className="block text-sm font-medium text-gray-700">Type</label>
                    <TextInput
                        disabled
                        id="type_id"
                        value={data.type.name}
                        className="mt-1 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border-gray-300 rounded-md"
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
