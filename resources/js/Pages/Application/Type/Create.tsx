import Select from 'react-select';
import { PageProps } from "@/types";
import alert from "@/utils/sweet.alert";
import { FormEventHandler } from "react";
import TextInput from '@/Components/TextInput';
import { Link, useForm } from "@inertiajs/react";
import { capitalizeFirstLetter } from '@/utils/parse';
import ResponsiveHeader from "@/Components/ResponsiveHeader";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Create({ auth, categories, errors }: PageProps<{ categories: string[] }>) {
    const { data, setData, post, processing, reset, isDirty } = useForm({
        name: '',
        description: '',
        category: '',
    });

    const submit: FormEventHandler = (e: any) => {
        e.preventDefault();

        post(route('application.type.store'), {
            onProgress: () => {
                alert.fire({
                    title: 'Please wait...',
                    text: 'We are updating the application setting type.',
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    didOpen: () => {
                        alert.showLoading();
                    }
                });
            },
            onSuccess: () => {
                reset('name', 'description', 'category');
                alert.fire({
                    title: 'Success',
                    text: 'Application type has been created.',
                    icon: 'success',
                });
            },
            onError: () => {
                alert.fire({
                    title: 'Error',
                    text: 'Something went wrong. Please try again.',
                    icon: 'error',
                });
            }
        });
    };

    const handleReset = () => {
        if (isDirty) alert.fire({
            title: 'Are you sure?',
            text: 'You have unsaved changes. Are you sure you want to reset?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
        }).then((result: any) => {
            if (result.isConfirmed) {
                reset('name', 'description', 'category');
                alert.fire({
                    title: 'Success',
                    text: 'Form has been reset.',
                    icon: 'success',
                });
            }
        });
    }

    return (
        <AuthenticatedLayout
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
                            placeholder='e.g. Meta Tag'
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
                            placeholder='e.g. This is a meta tag'
                            onChange={(e) => setData('description', e.target.value)}
                            className="mt-1 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border-gray-300 rounded-md"
                        />
                        {errors?.description && <p className="mt-2 text-sm text-danger-600">{errors.description}</p>}
                    </div>

                    <div className="mt-4">
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                        <Select
                            id="category"
                            name="category"
                            isClearable={true}
                            isSearchable={true}
                            isDisabled={processing}
                            className="mt-1 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border-gray-300 rounded-md"
                            options={categories.map((data: any) => {
                                return { value: data, label: capitalizeFirstLetter(data) }
                            })}
                            onChange={(selected: any) => setData('category', selected?.value)}
                        />
                        {errors?.category && <p className="mt-2 text-sm text-danger-600">{errors.category}</p>}
                    </div>

                    <div className="flex items-center justify-end mt-8 gap-3">
                        <button type="reset" onClick={handleReset} disabled={processing} className="bg-neutral-700 text-white py-2 px-3 rounded shadow transition-all hover:bg-neutral-700">
                            Reset
                        </button>
                        <button type="submit" disabled={processing} className="bg-primary-700 text-white py-2 px-3 rounded shadow transition-all hover:bg-primary-700">
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
