import { PageProps } from "@/types";
import alert from "@/utils/sweet.alert";
import { FormEventHandler } from "react";
import TextInput from '@/Components/TextInput';
import { Link, useForm } from "@inertiajs/react";
import ResponsiveHeader from "@/Components/ResponsiveHeader";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import CustomButton from "@/Components/CustomButton";

export default function Edit({ auth, translate, backUrl, errors }: PageProps<{ translate: any, backUrl: string }>) {
    const { data, setData, patch, processing, reset, isDirty } = useForm({
        key: translate.key,
        group: translate.group,
        lang_id: translate.text.id,
        lang_en: translate.text.en,
    });

    const submit: FormEventHandler = (e: any) => {
        e.preventDefault();

        patch(route('translate.update', translate?.uuid || 0), {
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
                reset('key', 'group', 'lang_id', 'lang_en');
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
                reset('key', 'group', 'lang_id', 'lang_en');
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
                <form onSubmit={submit} className="mb-5">
                <div>
                        <label htmlFor="group" className="block text-sm font-medium text-gray-700 dark:text-gray-400">Group</label>
                        <TextInput
                            id="group"
                            type="text"
                            name="group"
                            disabled={processing}
                            value={data.group}
                            placeholder='e.g. todo'
                            onChange={(e) => setData('group', e.target.value)}
                            className="mt-1 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border-gray-300 rounded-md"
                        />
                        {errors?.group && <p className="mt-2 text-sm text-danger-600">{errors.group}</p>}
                    </div>

                    <div className="mt-4">
                        <label htmlFor="key" className="block text-sm font-medium text-gray-700 dark:text-gray-400">Key</label>
                        <TextInput
                            id="key"
                            type="text"
                            name="key"
                            disabled={processing}
                            value={data.key}
                            placeholder='e.g. do.something'
                            onChange={(e) => setData('key', e.target.value)}
                            className="mt-1 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border-gray-300 rounded-md"
                        />
                        {errors?.key && <p className="mt-2 text-sm text-danger-600">{errors.key}</p>}
                    </div>

                    <div className="mt-4">
                        <label htmlFor="lang_id" className="block text-sm font-medium text-gray-700 dark:text-gray-400">Indonesian</label>
                        <TextInput
                            id="lang_id"
                            type="text"
                            name="lang_id"
                            disabled={processing}
                            value={data.lang_id}
                            placeholder='e.g. Memasak'
                            onChange={(e) => setData('lang_id', e.target.value)}
                            className="mt-1 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border-gray-300 rounded-md"
                        />
                        {errors?.lang_id && <p className="mt-2 text-sm text-danger-600">{errors.lang_id}</p>}
                    </div>

                    <div className="mt-4">
                        <label htmlFor="lang_en" className="block text-sm font-medium text-gray-700 dark:text-gray-400">English</label>
                        <TextInput
                            id="lang_en"
                            type="text"
                            name="lang_en"
                            disabled={processing}
                            value={data.lang_en}
                            placeholder='e.g. Cooking'
                            onChange={(e) => setData('lang_en', e.target.value)}
                            className="mt-1 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border-gray-300 rounded-md"
                        />
                        {errors?.lang_en && <p className="mt-2 text-sm text-danger-600">{errors.lang_en}</p>}
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
