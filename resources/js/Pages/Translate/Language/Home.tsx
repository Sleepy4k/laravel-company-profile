import Select from 'react-select';
import { PageProps } from "@/types";
import alert from "@/utils/sweet.alert";
import { FormEventHandler } from "react";
import { Link, useForm } from "@inertiajs/react";
import CustomButton from '@/Components/CustomButton';
import ResponsiveHeader from "@/Components/ResponsiveHeader";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Edit({ translate, backUrl, errors, flash }: PageProps<{ translate: any, backUrl: string, flash: any }>) {
    const { data, setData, post, processing, reset, isDirty } = useForm({
        lang: translate.lang,
    });

    const submit: FormEventHandler = (e: any) => {
        e.preventDefault();

        post(route('translate.language.store'), {
            onProgress: () => {
                alert.fire({
                    title: 'Please wait...',
                    text: 'We are updating the translate.',
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    didOpen: () => {
                        alert.showLoading();
                    }
                });
            },
            onSuccess: () => {
                reset('lang');
                alert.fire({
                    title: 'Success',
                    text: 'Translate has been updated.',
                    icon: 'success',
                }).then(() => location.reload());
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
                reset('lang');
                alert.fire({
                    title: 'Success',
                    text: 'Form has been reset.',
                    icon: 'success',
                });
            }
        });
    }

    const getDefaultValue = (lang: string) => {
        switch (lang) {
            case 'en':
                return { value: 'en', label: 'English' };
            case 'id':
                return { value: 'id', label: 'Indonesian' };
            default:
                return null;
        }
    }

    return (
        <AuthenticatedLayout
            title="Update Translation"
            header={
                <ResponsiveHeader>
                    <Link href={backUrl} className='bg-primary-700 lg:py-2 py-1 lg:px-3 px-2 text-white dark:text-gray-800 rounded shadow transition-all dark:bg-white hover:bg-primary-700 dark:hover:bg-white dark:focus:bg-white'>
                        Back
                    </Link>
                </ResponsiveHeader>
            }
        >
            <div className="bg-white dark:bg-gray-800 lg:w-[35rem] w-[20rem] mx-auto px-6 py-4">
                {flash && (
                    <div className="bg-gray-100 border border-gray-400 text-gray-700 px-4 py-3 rounded relative mb-5" role="alert">
                        <strong className="font-bold">Info!</strong>
                        <span className="block sm:inline">{` ${flash}`}</span>
                    </div>
                )}

                <form onSubmit={submit} className="mb-5">
                    <div>
                        <label htmlFor="lang" className="block text-sm font-medium text-gray-700 dark:text-gray-400">Default Lang</label>
                        <Select
                            id="lang"
                            name="lang"
                            isClearable={true}
                            isSearchable={true}
                            isDisabled={processing}
                            defaultValue={getDefaultValue(data.lang)}
                            classNamePrefix="my-react-select"
                            className="my-react-select-container"
                            options={[
                                { value: 'en', label: 'English' },
                                { value: 'id', label: 'Indonesian' },
                            ]}
                            onChange={(selected: any) => setData('lang', selected?.value)}
                        />
                        {errors?.lang && <p className="mt-2 text-sm text-danger-600">{errors.lang}</p>}
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
