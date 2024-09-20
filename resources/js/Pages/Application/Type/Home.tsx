import { useState } from 'react';
import { PageProps } from '@/types';
import Modal from '@/Components/Modal';
import debounce from "lodash.debounce";
import alert from '@/utils/sweet.alert';
import PopOver from '@/Components/PopOver';
import DataTable from "@/Components/DataTable";
import TextInput from "@/Components/TextInput";
import { Link, router } from '@inertiajs/react';
import TableHeading from "@/Components/DataTable/Heading";
import ResponsiveHeader from '@/Components/ResponsiveHeader';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { capitalizeFirstLetter, convertDateToLocaleString } from '@/utils/parse';

interface IDeleteData {
    uuid: any;
    key: string;
    name: string;
}

export default function Home({ data, queryParams }: PageProps<{ data: any, queryParams: any }>) {
    const [settingDeleteData, setSettingDeleteData] = useState<IDeleteData|null>(null);
    const [confirmingSettingDeletion, setConfirmingSettingDeletion] = useState(false);

    queryParams = queryParams || {};

    const searchFieldChanged = (name: string, value: string) => {
        value ? queryParams[name] = value : delete queryParams[name];

        router.get(route('application.type.index'), queryParams);
    };

    const sortChanged = (name: string) => {
        if (name === queryParams.sort_field) {
            if (queryParams.sort_direction == "asc") {
                queryParams.sort_direction = "desc";
            } else {
                queryParams.sort_direction = "asc";
            }
        } else {
            queryParams.sort_field = name;
            queryParams.sort_direction = "asc";
        }

        router.get(route('application.type.index'), queryParams);
    };

    const deleteSetting = (data: any) => {
        setConfirmingSettingDeletion(true);
        setSettingDeleteData(data);
    };

    const closeModal = () => setConfirmingSettingDeletion(false);

    const handleDeleteSetting = (e: any) => {
        e.preventDefault();

        const name = e.target.name.value;

        // check if name is empty
        if (!name) {
            closeModal();
            alert.fire({
                title: 'Name is empty',
                text: 'Name is empty, aborting deletion',
                icon: 'error',
            });
            return;
        }

        // Check if name is not same with setting type name
        if (name !== settingDeleteData?.name) {
            closeModal();
            alert.fire({
                title: 'Name is not same',
                text: 'Name is not same with setting type name, aborting deletion',
                icon: 'error',
            });
            return;
        }

        // Delete setting here
        router.delete(route("application.type.destroy", settingDeleteData?.uuid || 0), {
            onProgress: () => {
                alert.fire({
                    title: 'Please wait...',
                    text: 'We are deleting the application setting type.',
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    didOpen: () => {
                        alert.showLoading();
                    }
                });
            },
            onSuccess: () => {
                closeModal();
                alert.fire({
                    title: 'Success',
                    text: 'Application setting type has been deleted.',
                    icon: 'success',
                });
            },
            onError: () => {
                closeModal();
                alert.fire({
                    title: 'Error',
                    text: 'Something went wrong. Please try again.',
                    icon: 'error',
                });
            }
        });
    }

    const isQueryParamEmpty = () => {
        return !queryParams || Object.keys(queryParams).length === 0;
    }

    const handleReset = () => {
        // If query params is empty, do nothing
        if (isQueryParamEmpty()) return;

        router.get(route('application.type.index'));
    }

    const handleReload = () => router.get(route('application.type.index'), queryParams);

    return (
        <AuthenticatedLayout
            title="Application Type"
            header={
                <ResponsiveHeader>
                    <Link href={route('application.index', { displayMode: 'table' })} className='bg-primary-700 lg:py-2 py-1 lg:px-3 px-2 text-white rounded shadow transition-all hover:bg-primary-700'>
                        Application Setting
                    </Link>
                    <Link href={route('application.type.create')} className='bg-primary-700 lg:py-2 py-1 lg:px-3 px-2 text-white rounded shadow transition-all hover:bg-primary-700'>
                        Create New
                    </Link>
                </ResponsiveHeader>
            }
        >
            <div className='max-w-[85%] mx-auto'>
                <DataTable
                    links={data.links}
                    search={<>
                        <TextInput
                            type="text"
                            name="search"
                            placeholder="Search"
                            className="mt-4 ms-4 block lg:w-1/4"
                            onChange={debounce((e) => searchFieldChanged('search', e.target.value), 500)}
                        />
                        <div className="flex justify-end">
                            <button
                                type='button'
                                disabled={isQueryParamEmpty()}
                                className="btn btn-neutral ms-4 mt-4"
                                onClick={handleReset}
                            >
                                Reset
                            </button>
                            <button
                                type='button'
                                className="btn btn-neutral ms-4 mt-4"
                                onClick={handleReload}
                            >
                                Reload
                            </button>
                        </div>
                    </>}
                    header={<>
                        <TableHeading
                            name="id"
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                            sortChanged={sortChanged}
                        >
                            ID
                        </TableHeading>
                        <TableHeading
                            name="name"
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                            sortChanged={sortChanged}
                        >
                            Name
                        </TableHeading>
                        <TableHeading
                            name="description"
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                            sortChanged={sortChanged}
                        >
                            Description
                        </TableHeading>
                        <TableHeading
                            name="category"
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                            sortChanged={sortChanged}
                        >
                            Category
                        </TableHeading>
                        <TableHeading
                            name="created_at"
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                            sortChanged={sortChanged}
                        >
                            Created At
                        </TableHeading>
                        <TableHeading
                            name="updated_at"
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                            sortChanged={sortChanged}
                        >
                            Updated At
                        </TableHeading>
                        <th className="px-3 py-2">Actions</th>
                    </>}
                >
                    {data && data.data.map((item: any, index: number) => (
                        <tr key={index}>
                            <td className="px-3 py-2 max-w-[8vw] overflow-hidden">{item.id}</td>
                            <td className="px-3 py-2 max-w-[8vw] overflow-hidden">{item.name}</td>
                            <td className="px-3 py-2 max-w-[8vw] overflow-hidden">{item.description || '-'}</td>
                            <td className="px-3 py-2 max-w-[8vw] overflow-hidden">{capitalizeFirstLetter(item.category)}</td>
                            <td className="px-3 py-2 max-w-[8vw] overflow-hidden">{convertDateToLocaleString(item.created_at) || '-'}</td>
                            <td className="px-3 py-2 max-w-[8vw] overflow-hidden">{convertDateToLocaleString(item.updated_at) || '-'}</td>
                            <td className="px-3 py-2 text-nowrap">
                                <PopOver>
                                    <Link
                                        href={route('application.type.show', item.uuid)}
                                        className="block px-4 py-2 text-sm text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                                    >
                                        <div className='flex flex-row'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="mr-2 h-5 w-5 shrink-0 text-neutral-500 group-hover:text-neutral-600 dark:text-neutral-300 dark:group-hover:text-neutral-100"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"></path><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                            <span className='mt-0.5'>View</span>
                                        </div>
                                    </Link>
                                    <Link
                                        href={route('application.type.edit', item.uuid)}
                                        className="block px-4 py-2 text-sm text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                                    >
                                        <div className='flex flex-row'>
                                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="mr-2 h-5 w-5 shrink-0 text-neutral-500 group-hover:text-neutral-600 dark:text-neutral-300 dark:group-hover:text-neutral-100"><path d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                            <span className='mt-0.5'>Edit</span>
                                        </div>
                                    </Link>
                                    <button
                                        type='button'
                                        onClick={() => deleteSetting(item)}
                                        className="block px-4 py-2 text-sm text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                                    >
                                        <div className='flex flex-row'>
                                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="mr-2 h-5 w-5 shrink-0 text-neutral-500 group-hover:text-neutral-600 dark:text-neutral-300 dark:group-hover:text-neutral-100"><path d="M10 12L14 16M14 12L10 16M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                            <span className='mt-0.5'>Delete</span>
                                        </div>
                                    </button>
                                </PopOver>
                            </td>
                        </tr>
                    ))}
                </DataTable>
            </div>

            <Modal show={confirmingSettingDeletion} onClose={closeModal}>
                <form className="p-6" onSubmit={handleDeleteSetting}>
                    <h2 className="text-lg font-medium text-gray-900">
                        Are you sure you want to delete {settingDeleteData?.name} setting type?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Once you delete this setting type, all of its resources and data will be permanently deleted.
                        Please enter this setting type name (<b>{settingDeleteData?.name}</b>) to confirm you would like to permanently delete this setting type.
                    </p>

                    <div className="mt-6">
                        <label htmlFor="name" className="sr-only">Name</label>
                        <input
                            id="key"
                            type="text"
                            name="name"
                            placeholder="Name"
                            className="mt-1 block w-3/4 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                        />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <button type="button" onClick={closeModal} className="btn btn-neutral">Cancel</button>
                        <button type="submit" className="btn btn-error ms-3">Delete</button>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}
