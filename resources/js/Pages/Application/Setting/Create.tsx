import Select from 'react-select';
import { PageProps } from "@/types";
import alert from "@/utils/sweet.alert";
import TextInput from '@/Components/TextInput';
import { Link, useForm } from "@inertiajs/react";
import ResponsiveHeader from "@/Components/ResponsiveHeader";
import { FormEventHandler, useEffect, useState } from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Create({ auth, types, backUrl, errors }: PageProps<{ backUrl: string, types: any }>) {
    const [isFile, setIsFile] = useState(false);
    const [file, setFile] = useState<string|null>(null);
    const { data, setData, post, processing, reset, isDirty } = useForm({
        key: '',
        display: '',
        value: '',
        description: '',
        type_id: 0,
        file: null,
    });

    useEffect(() => {
        if (file !== null) setFile(null);
        for (let i = 0; i < types.length; i++) {
            if (types[i].id === data.type_id) {
                setIsFile(types[i].category === 'file');
                break;
            }
        }
    }, [data.type_id]);

    const submit: FormEventHandler = (e: any) => {
        e.preventDefault();

        post(route('application.store'), {
            onProgress: () => {
                alert.fire({
                    title: 'Please wait...',
                    text: 'We are updating the application setting.',
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    didOpen: () => {
                        alert.showLoading();
                    }
                });
            },
            onSuccess: () => {
                reset('key', 'display', 'value', 'description', 'type_id', 'file');
                alert.fire({
                    title: 'Success',
                    text: 'Application setting has been created.',
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
                reset('key', 'display', 'value', 'description', 'type_id', 'file');
                alert.fire({
                    title: 'Success',
                    text: 'Form has been reset.',
                    icon: 'success',
                });
            }
        });
    }

    const handleFileChange = (e: any) => {
        const selectedFile = e.target.files[0];

        if (selectedFile) {
            setData('file', selectedFile);
            setFile(URL.createObjectURL(selectedFile));
        }
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            title="Create Application"
            header={
                <ResponsiveHeader>
                    <Link href={backUrl} className='bg-primary-700 py-2 px-3 text-white rounded shadow transition-all hover:bg-primary-700'>
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
                            placeholder='e.g. app_name'
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
                            placeholder='e.g. Application Name'
                            onChange={(e) => setData('display', e.target.value)}
                            className="mt-1 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border-gray-300 rounded-md"
                        />
                        {errors?.display && <p className="mt-2 text-sm text-danger-600">{errors.display}</p>}
                    </div>

                    {isFile ? (
                        <div className="mt-4">
                            <label htmlFor="file" className="block text-sm font-medium text-gray-700">File</label>
                            <TextInput
                                id="file"
                                type="file"
                                name="file"
                                disabled={processing}
                                onChange={handleFileChange}
                                accept='image/jpeg, image/jpg, image/png'
                                className="mt-1 file-input file-input-bordered file-input-sm block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border-gray-300 rounded-md"
                            />
                            {errors?.file && <p className="mt-2 text-sm text-danger-600">{errors.file}</p>}
                            {file && (
                                <div className="mt-2 card bg-base-100 w-[15rem] shadow-xl">
                                    <figure>
                                        <img src={file} alt="File Preview"/>
                                    </figure>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="mt-4">
                            <label htmlFor="value" className="block text-sm font-medium text-gray-700">Value</label>
                            <TextInput
                                id="value"
                                type="text"
                                name="value"
                                disabled={processing}
                                value={data.value}
                                placeholder='e.g. Laravel App'
                                onChange={(e) => setData('value', e.target.value)}
                                className="mt-1 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border-gray-300 rounded-md"
                            />
                            {errors?.value && <p className="mt-2 text-sm text-danger-600">{errors.value}</p>}
                        </div>
                    )}

                    <div className="mt-4">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            disabled={processing}
                            value={data.description}
                            placeholder='e.g. This is the application name.'
                            onChange={(e) => setData('description', e.target.value)}
                            className="mt-1 block w-full h-fit shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border-gray-300 rounded-md"
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
                            className="mt-1 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border-gray-300 rounded-md"
                            options={types.map((data: any) => {
                                return { value: data.id, label: data.name }
                            })}
                            onChange={(selected: any) => setData('type_id', selected?.value)}
                        />
                        {errors?.type_id && <p className="mt-2 text-sm text-danger-600">{errors.type_id}</p>}
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
