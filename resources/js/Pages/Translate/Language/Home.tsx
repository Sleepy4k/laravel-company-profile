import Select from 'react-select';
import { PageProps } from "@/types";
import alert from "@/utils/sweet.alert";
import { FormEventHandler } from "react";
import { Link, useForm } from "@inertiajs/react";
import ResponsiveHeader from "@/Components/ResponsiveHeader";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Edit({ auth, translate, backUrl, errors, flash }: PageProps<{ translate: any, backUrl: string, flash: any }>) {
    const { data, setData, post, processing, reset, isDirty } = useForm({
        lang: translate.lang,
    });

    console.log(translate.lang);


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
            user={auth.user}
            title="Update Translation"
            header={
                <ResponsiveHeader>
                    <Link href={backUrl} className='bg-primary-700 py-2 px-3 text-white rounded shadow transition-all hover:bg-primary-700'>
                        Back
                    </Link>
                </ResponsiveHeader>
            }
        >
            <div className="bg-white lg:w-[35rem] w-[20rem] mx-auto px-6 py-4">
                {flash && (
                    <div className="bg-gray-100 border border-gray-400 text-gray-700 px-4 py-3 rounded relative mb-5" role="alert">
                        <strong className="font-bold">Info!</strong>
                        <span className="block sm:inline">{` ${flash}`}</span>
                    </div>
                )}

                <form onSubmit={submit} className="mb-5">
                    <div>
                        <label htmlFor="lang" className="block text-sm font-medium text-gray-700">Default Lang</label>
                        <Select
                            id="lang"
                            name="lang"
                            isClearable={true}
                            isSearchable={true}
                            isDisabled={processing}
                            defaultValue={getDefaultValue(data.lang)}
                            className="mt-1 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border-gray-300 rounded-md"
                            options={[
                                { value: 'en', label: 'English' },
                                { value: 'id', label: 'Indonesian' },
                            ]}
                            onChange={(selected: any) => setData('lang', selected?.value)}
                        />
                        {errors?.lang && <p className="mt-2 text-sm text-danger-600">{errors.lang}</p>}
                    </div>

                    <div className="flex items-center justify-end mt-8 gap-3">
                        <button type="reset" onClick={handleReset} disabled={processing} className="bg-neutral-700 text-white py-2 px-3 rounded shadow transition-all hover:bg-neutral-700">
                            Reset
                        </button>
                        <button type="submit" disabled={processing} className="bg-primary-700 text-white py-2 px-3 rounded shadow transition-all hover:bg-primary-700">
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
