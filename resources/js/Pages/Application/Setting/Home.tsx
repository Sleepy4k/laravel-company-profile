import { PageProps } from '@/types';
import Modal from '@/Components/Modal';
import debounce from 'lodash.debounce';
import alert from '@/utils/sweet.alert';
import { useEffect, useState } from 'react';
import DataTable from '@/Components/DataTable';
import TextInput from '@/Components/TextInput';
import { Link, router } from '@inertiajs/react';
import TableHeading from '@/Components/DataTable/Heading';
import ResponsiveHeader from '@/Components/ResponsiveHeader';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

interface IDeleteData {
    id: number;
    key: string;
    name: string;
}

export default function Home({ auth, app, data, queryParams = null }: PageProps<{ data: any, queryParams: any }>) {
    const [mode, setMode] = useState<'table' | 'box' | null>(null);
    const [settingDeleteData, setSettingDeleteData] = useState<IDeleteData|null>(null);
    const [confirmingSettingDeletion, setConfirmingSettingDeletion] = useState(false);

    queryParams = queryParams || {};

    useEffect(() => {
        // Get mode from url, if last url is /application/mode then set mode to box
        const url = window.location.href;
        const mode = url.split('/')[url.split('/').length - 1].split('?')[0];

        mode === 'box' ? setMode('box') : setMode('table');
    }, []);

    const handleChangeMode = () => {
        router.visit(route('application.index', { type: mode == 'box' ? 'table' : 'box' }));
    }

    const searchFieldChanged = (name: string, value: any) => {
        value ? queryParams[name] = value : delete queryParams[name];

        router.get(route("application.index", { type: mode == 'box' ? 'box' : 'table' }), queryParams);
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

        router.get(route("application.index", { type: mode == 'box' ? 'box' : 'table' }), queryParams);
    };

    const deleteSetting = (data: any) => {
        setConfirmingSettingDeletion(true);
        setSettingDeleteData(data);
    };

    const closeModal = () => setConfirmingSettingDeletion(false);

    const handleDeleteSetting = (e: any) => {
        e.preventDefault();

        const key = e.target.key.value;

        // check if key is empty
        if (!key) {
            closeModal();
            alert.fire({
                title: 'Key is empty',
                text: 'Key is empty, aborting deletion',
                icon: 'error',
            });
            return;
        }

        // Check if key is not same with setting key
        if (key !== settingDeleteData?.key) {
            closeModal();
            alert.fire({
                title: 'Key is not same',
                text: 'Key is not same with setting key, aborting deletion',
                icon: 'error',
            });
            return;
        }

        // Delete setting here
        const id = settingDeleteData?.id || 0;
        router.delete(route("application.destroy", id));
        closeModal();
    }

    return (
        <AuthenticatedLayout
            app={app}
            user={auth.user}
            title="Application"
            className={mode == 'box' ? 'max-w-full flex overflow-x-scroll' : ''}
            header={
                <ResponsiveHeader>
                    <label className="swap swap-rotate relative">
                        <input type="checkbox" title='change mode for display data' className='hidden' onChange={handleChangeMode} checked={mode == 'box'} />
                        <svg
                            className="swap-off fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 512 512">
                            <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
                        </svg>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="swap-on inline-block stroke-current">
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
                        </svg>
                    </label>
                    <Link href={route('application.create')} className='bg-primary-700 py-2 px-3 text-white rounded shadow transition-all hover:bg-primary-700'>
                        Create New
                    </Link>
                </ResponsiveHeader>
            }
        >
            {/* Render data here */}
            {mode && mode === 'table' && (
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
                                    className="btn btn-neutral ms-4 mt-4"
                                    onClick={() => searchFieldChanged('search', '')}
                                >
                                    Reset
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
                                name="key"
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                                sortChanged={sortChanged}
                            >
                                Key
                            </TableHeading>
                            <TableHeading
                                name="display"
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                                sortChanged={sortChanged}
                            >
                                Display As
                            </TableHeading>
                            <TableHeading
                                name="value"
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                                sortChanged={sortChanged}
                            >
                                Value
                            </TableHeading>
                            <TableHeading
                                name="description"
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                                sortChanged={sortChanged}
                            >
                                Description
                            </TableHeading>
                            <th className="px-3 py-2">Type</th>
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
                                <td className="px-3 py-2">{item.id}</td>
                                <td className="px-3 py-2">{item.key}</td>
                                <td className="px-3 py-2">{item.display || '-'}</td>
                                <td className="px-3 py-2">{item.value || '-'}</td>
                                <td className="px-3 py-2">{item.description || '-'}</td>
                                <td className="px-3 py-2">{item.type.name || '-'}</td>
                                <td className="px-3 py-2">{item.created_at || '-'}</td>
                                <td className="px-3 py-2">{item.updated_at || '-'}</td>
                                <td className="px-3 py-2 text-nowrap">
                                    <Link
                                        href={route('application.show', item.id)}
                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                    >
                                        View
                                    </Link>
                                    <Link
                                        href={route('application.edit', item.id)}
                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        type='button'
                                        onClick={(e) => deleteSetting(item)}
                                        className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </DataTable>
                </div>
            )}

            {mode && mode === 'box' && (
                <div className="flex justify-start px-4 pb-2 sm:px-6 ms-8 me-8 mb-5 space-x-8">
                    {data && data.map((item: any, col: number) => (
                        <div key={col} className='inline-flex h-[calc(100vh-15rem)] lg:w-[20vw] w-[30vw] flex-col overflow-x-hidden overflow-y-hidden rounded-lg bg-neutral-400/40 border border-neutral-300/40 align-top shadow '>
                            <div className='px-3 py-2.5'>
                                <div className='flex items-center'>
                                    <h5 className='mr-auto font-medium text-neutral-800 text-sm'>{item.name}</h5>
                                </div>
                                <div className='flex lg:flex-row flex-col items-center text-sm'>
                                    <span className='text-neutral-600'>{item.description}</span>
                                    <span className='mx-1 text-neutral-900'>-</span>
                                    <span className='text-neutral-700'>{item.settings.length} setting</span>
                                </div>
                            </div>
                            <div className='overflow-x-hidden overflow-y-auto'>
                                {item && item.settings.length > 0 && item.settings.map((setting: any, row: number) => (
                                    <div key={row} className='m-3 overflow-hidden whitespace-normal rounded-md bg-white shadow px-3 py-2.5'>
                                        <h3 className='text-lg'>{setting.name}</h3>
                                        <p>{setting.value || '-'}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <Modal show={confirmingSettingDeletion} onClose={closeModal}>
                <form className="p-6" onSubmit={handleDeleteSetting}>
                    <h2 className="text-lg font-medium text-gray-900">
                        Are you sure you want to delete {settingDeleteData?.name} setting?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Once you delete this setting, all of its resources and data will be permanently deleted.
                        Please enter this setting key (<b>{settingDeleteData?.key}</b>) to confirm you would like to permanently delete this setting.
                    </p>

                    <div className="mt-6">
                        <label htmlFor="key" className="sr-only">Key</label>
                        <input
                            id="key"
                            type="text"
                            name="key"
                            placeholder="Key"
                            className="mt-1 block w-3/4"
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
