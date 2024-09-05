import BoxMode from './BoxMode';
import TableMode from './TableMode';
import { PageProps } from '@/types';
import Modal from '@/Components/Modal';
import alert from '@/utils/sweet.alert';
import { useEffect, useState } from 'react';
import { Link, router } from '@inertiajs/react';
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
        router.visit(route('application.index', { displayMode: mode == 'box' ? 'table' : 'box' }));
    }

    const searchFieldChanged = (name: string, value: any) => {
        value ? queryParams[name] = value : delete queryParams[name];

        router.get(route("application.index", { displayMode: mode == 'box' ? 'box' : 'table' }), queryParams);
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

        router.get(route("application.index", { displayMode: mode == 'box' ? 'box' : 'table' }), queryParams);
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

    const isQueryParamEmpty = () => {
        return !queryParams || Object.keys(queryParams).length === 0;
    }

    const handleReset = () => {
        // If query params is empty, do nothing
        if (isQueryParamEmpty()) return;

        router.get(route('application.index', { displayMode: mode == 'box' ? 'box' : 'table' }));
    }

    const handleReload = () => router.get(route('application.index', { displayMode: mode == 'box' ? 'box' : 'table' }), queryParams);

    return (
        <AuthenticatedLayout
            app={app}
            user={auth.user}
            title="Application"
            className={mode == 'box' ? 'max-w-full flex overflow-x-scroll' : ''}
            header={
                <ResponsiveHeader>
                    <label className="swap swap-rotate relative lg:py-2 py-1 lg:px-3 px-1">
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
                    <Link href={route('application.type.index')} className='bg-primary-700 lg:py-2 py-1 lg:px-3 px-2 text-white rounded shadow transition-all hover:bg-primary-700'>
                        Application Type
                    </Link>
                    <Link href={route('application.create')} className='bg-primary-700 lg:py-2 py-1 lg:px-3 px-2 text-white rounded shadow transition-all hover:bg-primary-700'>
                        Create New
                    </Link>
                </ResponsiveHeader>
            }
        >
            <TableMode
                data={data}
                mode={mode}
                isQueryParamEmpty={isQueryParamEmpty}
                handleReset={handleReset}
                searchFieldChanged={searchFieldChanged}
                sortChanged={sortChanged}
                deleteSetting={deleteSetting}
                queryParams={queryParams}
                handleReload={handleReload}
            />

            <BoxMode data={data} mode={mode} deleteSetting={deleteSetting} />

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
