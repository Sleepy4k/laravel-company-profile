import Select from 'react-select';
import { PageProps } from "@/types";
import alert from "@/utils/sweet.alert";
import { FormEventHandler } from "react";
import TextInput from '@/Components/TextInput';
import { Link, useForm } from "@inertiajs/react";
import ResponsiveHeader from "@/Components/ResponsiveHeader";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Edit({ auth, setting, type, app, errors }: PageProps<{ setting: any, type: any }>) {
    const { data, setData, patch, processing, reset } = useForm({
        key: setting.key,
        display: setting.display,
        value: setting.value,
        description: setting.description,
        type_id: setting.type_id as number,
    });

    const submit: FormEventHandler = (e: any) => {
        e.preventDefault();

        patch(route('application.update', setting?.id || 0), {
            onSuccess: () => {
                reset('key', 'display', 'value', 'description', 'type_id');
                alert.fire({
                    title: 'Success',
                    text: 'Application setting has been updated.',
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
            title="Update Application"
            header={
                <ResponsiveHeader>
                    <Link href={route('application.index', { displayMode: 'table' })} className='bg-primary-700 py-2 px-3 text-white rounded shadow transition-all hover:bg-primary-700'>
                        Back
                    </Link>
                </ResponsiveHeader>
            }
        >
            <div className="bg-white lg:w-[35rem] w-[20rem] mx-auto px-6 py-4">
                <form onSubmit={submit} className="mb-5">
                    <div>
                        <label htmlFor="key" className="block text-sm font-medium text-gray-700">Key</label>
                        <TextInput
                            id="key"
                            type="text"
                            name="key"
                            disabled={processing}
                            value={data.key}
                            onChange={(e) => setData('key', e.target.value)}
                            className="mt-1 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border-gray-300 rounded-md"
                        />
                        {errors?.key && <p className="mt-2 text-sm text-danger-600">{errors.key}</p>}
                    </div>

                    <div className="mt-4">
                        <label htmlFor="display" className="block text-sm font-medium text-gray-700">Display</label>
                        <TextInput
                            id="display"
                            type="text"
                            name="display"
                            disabled={processing}
                            value={data.display}
                            onChange={(e) => setData('display', e.target.value)}
                            className="mt-1 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border-gray-300 rounded-md"
                        />
                        {errors?.display && <p className="mt-2 text-sm text-danger-600">{errors.display}</p>}
                    </div>

                    <div className="mt-4">
                        <label htmlFor="value" className="block text-sm font-medium text-gray-700">Value</label>
                        <TextInput
                            id="value"
                            type="text"
                            name="value"
                            disabled={processing}
                            value={data.value}
                            onChange={(e) => setData('value', e.target.value)}
                            className="mt-1 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border-gray-300 rounded-md"
                        />
                        {errors?.value && <p className="mt-2 text-sm text-danger-600">{errors.value}</p>}
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

                    <div className="mt-4">
                        <label htmlFor="type_id" className="block text-sm font-medium text-gray-700">Type</label>
                        <Select
                            id="type_id"
                            name="type_id"
                            isClearable={true}
                            isSearchable={true}
                            isDisabled={processing}
                            defaultValue={{ value: setting.type_id, label: setting.type.name }}
                            className="mt-1 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border-gray-300 rounded-md"
                            options={type.map((data: any) => {
                                return { value: data.id, label: data.name }
                            })}
                            onChange={(selected: any) => setData('type_id', selected?.value)}
                        />
                        {errors?.type_id && <p className="mt-2 text-sm text-danger-600">{errors.type_id}</p>}
                    </div>

                    <div className="flex items-center justify-end mt-8">
                        <button type="submit" disabled={processing} className="bg-primary-700 text-white py-2 px-3 rounded shadow transition-all hover:bg-primary-700">
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
