import { PageProps } from "@/types";
import alert from "@/utils/sweet.alert";
import { FormEventHandler } from "react";
import TextInput from '@/Components/TextInput';
import { Link, useForm } from "@inertiajs/react";
import ResponsiveHeader from "@/Components/ResponsiveHeader";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Create({ auth, app, errors }: PageProps) {
    const { data, setData, post, processing, reset } = useForm({
        name: '',
        description: '',
    });

    const submit: FormEventHandler = (e: any) => {
        e.preventDefault();

        post(route('application.type.store'), {
            onSuccess: () => {
                reset('name', 'description');
                alert.fire({
                    title: 'Success',
                    text: 'Application type has been created.',
                    icon: 'success',
                });
            },
            onError: (error: any) => {
                alert.fire({
                    title: 'Error',
                    text: error.message,
                    icon: 'error',
                });
            }
        });
    };

    return (
        <AuthenticatedLayout
            app={app}
            user={auth.user}
            title="Create Application Type"
            header={
                <ResponsiveHeader>
                    <Link href={route('application.type.index')} className='bg-primary-700 py-2 px-3 text-white rounded shadow transition-all hover:bg-primary-700'>
                        Back
                    </Link>
                </ResponsiveHeader>
            }
        >
            <div className="bg-white lg:w-[35rem] w-[20rem] mx-auto px-6 py-4">
                <form onSubmit={submit} className="mb-5">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Key</label>
                        <TextInput
                            id="name"
                            type="text"
                            name="name"
                            disabled={processing}
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="mt-1 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border-gray-300 rounded-md"
                        />
                        {errors?.name && <p className="mt-2 text-sm text-danger-600">{errors.name}</p>}
                    </div>

                    <div className="mt-4">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            disabled={processing}
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            className="mt-1 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border-gray-300 rounded-md"
                        />
                        {errors?.description && <p className="mt-2 text-sm text-danger-600">{errors.description}</p>}
                    </div>

                    <div className="flex items-center justify-end mt-8">
                        <button type="submit" disabled={processing} className="bg-primary-700 text-white py-2 px-3 rounded shadow transition-all hover:bg-primary-700">
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
