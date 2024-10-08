import Select from 'react-select';
import { PageProps } from "@/types";
import alert from "@/utils/sweet.alert";
import TextInput from '@/Components/TextInput';
import { Link, useForm } from "@inertiajs/react";
import CustomButton from '@/Components/CustomButton';
import ResponsiveHeader from "@/Components/ResponsiveHeader";
import { FormEventHandler, useEffect, useState } from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Edit({ setting, types, backUrl, errors }: PageProps<{ setting: any, types: any, backUrl: string }>) {
    const [isFile, setIsFile] = useState(false);
    const [file, setFile] = useState<string|null>(null);
    const { data, setData, post, processing, reset, isDirty } = useForm({
        _method: 'PUT',
        key: setting.key,
        display: setting.display,
        value: setting.value,
        description: setting.description,
        type_id: setting.type_id as number,
        file: null,
    });

    useEffect(() => {
        if (setting.type.category === 'file') {
            setIsFile(true);
        }
    }, []);

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

        post(route('application.update', setting?.uuid || 0), {
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
                    text: 'Application setting has been updated.',
                    icon: 'success',
                }).then(() => location.reload());
            },
            onError: () => {
                alert.fire({
                    title: 'Error',
                    text: 'Something went wrong. Please try again.',
                    icon: 'error',
                });
            },
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
            title="Update Application"
            header={
                <ResponsiveHeader>
                    <Link href={backUrl} className='bg-primary-700 lg:py-2 py-1 lg:px-3 px-2 text-white dark:text-gray-800 rounded shadow transition-all dark:bg-white hover:bg-primary-700 dark:hover:bg-white dark:focus:bg-white'>
                        Back
                    </Link>
                </ResponsiveHeader>
            }
        >
            <div className="bg-white dark:bg-gray-800 lg:w-[35rem] w-[20rem] mx-auto px-6 py-4">
                <form onSubmit={submit} className="mb-5">
                    <div>
                        <label htmlFor="key" className="block text-sm font-medium text-gray-700 dark:text-gray-400">Key</label>
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
                        <label htmlFor="display" className="block text-sm font-medium text-gray-700 dark:text-gray-400">Display</label>
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

                    {isFile ? (
                        <div className="mt-4">
                            <label htmlFor="file" className="block text-sm font-medium text-gray-700 dark:text-gray-400">File</label>
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
                            {setting.value && !file && (
                                <div className="mt-2 card bg-base-100 w-[15rem] shadow-xl">
                                    <figure>
                                        <img src={setting.value} alt="File Preview"/>
                                    </figure>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="mt-4">
                            <label htmlFor="value" className="block text-sm font-medium text-gray-700 dark:text-gray-400">Value</label>
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
                    )}

                    <div className="mt-4">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-400">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            disabled={processing}
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            className="mt-1 block w-full h-fit shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                        />
                        {errors?.description && <p className="mt-2 text-sm text-danger-600">{errors.description}</p>}
                    </div>

                    <div className="mt-4">
                        <label htmlFor="type_id" className="block text-sm font-medium text-gray-700 dark:text-gray-400">Type</label>
                        <Select
                            id="type_id"
                            name="type_id"
                            isClearable={true}
                            isSearchable={true}
                            isDisabled={processing}
                            defaultValue={{ value: setting.type_id, label: setting.type.name }}
                            classNamePrefix="my-react-select"
                            className="my-react-select-container"
                            options={types.map((data: any) => {
                                return { value: data.id, label: data.name }
                            })}
                            onChange={(selected: any) => setData('type_id', selected?.value)}
                        />
                        {errors?.type_id && <p className="mt-2 text-sm text-danger-600">{errors.type_id}</p>}
                    </div>

                    <div className="flex items-center justify-end mt-8 gap-3">
                        <CustomButton type="reset" onClick={handleReset} disabled={processing} className="bg-neutral-700 text-white py-2 px-3 rounded shadow transition-all hover:bg-neutral-700 dark:opacity-35">
                            Reset
                        </CustomButton>
                        <CustomButton type="submit" disabled={processing} className="bg-primary-700 text-white py-2 px-3 rounded shadow transition-all hover:bg-primary-700">
                            Update
                        </CustomButton>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
