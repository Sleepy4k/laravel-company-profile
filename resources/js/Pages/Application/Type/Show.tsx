import { PageProps } from "@/types";
import { Link } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import { capitalizeFirstLetter } from "@/utils/parse";
import ResponsiveHeader from "@/Components/ResponsiveHeader";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Show({ auth, data }: PageProps<{ data: any }>) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            title="View Application Type"
            header={
                <ResponsiveHeader>
                    <Link href={route('application.type.edit', data?.id || 0)} className='bg-primary-700 py-2 px-3 text-white rounded shadow transition-all hover:bg-primary-700'>
                        Edit
                    </Link>
                    <Link href={route('application.type.index')} className='bg-primary-700 py-2 px-3 text-white rounded shadow transition-all hover:bg-primary-700'>
                        Back
                    </Link>
                </ResponsiveHeader>
            }
        >
            <div className="bg-white lg:w-[35rem] w-[20rem] mx-auto px-6 py-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Key</label>
                    <TextInput
                        disabled
                        id="name"
                        value={data.name}
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
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                    <TextInput
                        disabled
                        id="category"
                        value={capitalizeFirstLetter(data.category)}
                        className="mt-1 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border-gray-300 rounded-md"
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
