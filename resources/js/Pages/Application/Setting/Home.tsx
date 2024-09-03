import { PageProps } from '@/types';
import { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, router } from '@inertiajs/react';

interface BoxData {
    type: string;
    data: {
        title: string;
        value: string;
    }[];
}

export default function Home({ auth, app, data }: PageProps<{ data: any }>) {
    const [mode, setMode] = useState<'table' | 'box'>('table');
    const [mappedBoxData, setMappedBoxData] = useState<BoxData[]>(data);

    useEffect(() => {
        // if change mode from table to box, then change the data
        if (mode === 'box') {
            router.visit(route('application.index') + '?type=box');
        } else {
            router.visit(route('application.index'));
        }
    }, [mode]);

    const disableNext = data.current_page === data.last_page || data.next_page_url === null;

    const disablePrev = data.current_page === 1 || data.prev_page_url === null;

    const handleNext = () => {
        router.visit(data.next_page_url);
    }

    const handlePrev = () => {
        router.visit(data.prev_page_url);
    }

    const handleStart = () => {
        router.visit(data.first_page_url);
    }

    const handleEnd = () => {
        router.visit(data.last_page_url);
    }

    return (
        <AuthenticatedLayout user={auth.user} app={app} title="Application">
            <div className="flex justify-end">
                <label className="btn btn-circle swap swap-rotate me-5 mt-3 relative">
                    {/* this hidden checkbox controls the state */}
                    <input type="checkbox" className='hidden' onChange={() => setMode(mode == 'box' ? 'table' : 'box')} />

                    {/* hamburger icon */}
                    <svg
                        className="swap-off fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 512 512">
                        <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
                    </svg>

                    {/* box icon */}
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
            </div>

            {/* Render data here */}
            {mode === 'table' && (
                <div>
                    <div className='flex justify-center'>
                        <div className="overflow-x-auto">
                            <div className='flex justify-start mb-4 ms-4 lg:ms-1'>
                                <Link href={route('application.create')} className='btn btn-primary'>
                                    Create New
                                </Link>
                            </div>
                            <table className="table table-lg table-pin-rows table-pin-cols">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Key</th>
                                        <th>Display As</th>
                                        <th>Value</th>
                                        <th>Description</th>
                                        <th>Type</th>
                                        <th>Created At</th>
                                        <th>Updated At</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data && data.data.map((item: any, index: number) => (
                                        <tr key={index}>
                                            <td>{item.id}</td>
                                            <td>{item.key}</td>
                                            <td>{item.display || '-'}</td>
                                            <td>{item.value || '-'}</td>
                                            <td>{item.description || '-'}</td>
                                            <td>{item.type.name || '-'}</td>
                                            <td>{item.created_at || '-'}</td>
                                            <td>{item.updated_at || '-'}</td>
                                            <td>
                                                <Link href={`${route('application.show', item.id)}`} className='btn btn-sm btn-neutral'>
                                                    View
                                                </Link>
                                                <Link href={`${route('application.edit', item.id)}`} className='btn btn-sm btn-primary ms-2'>
                                                    Edit
                                                </Link>
                                                <Link href={`${route('application.destroy', item.id)}`} className='btn btn-sm btn-error ms-2'>
                                                    Delete
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th>ID</th>
                                        <th>Key</th>
                                        <th>Display As</th>
                                        <th>Value</th>
                                        <th>Description</th>
                                        <th>Type</th>
                                        <th>Created At</th>
                                        <th>Updated At</th>
                                        <th>Actions</th>
                                    </tr>
                                </tfoot>
                            </table>
                            <div className='flex lg:justify-end justify-start mt-4 ms-4 lg:ms-1'>
                                <div className="join lg:gap-2 gap-1">
                                    <button type='button' disabled={disablePrev} onClick={handleStart} className="join-item btn">{'<<'}</button>
                                    <button type='button' disabled={disablePrev} onClick={handlePrev} className="join-item btn">{'<'}</button>
                                    <button type='button' className="join-item btn">Page {data.current_page}</button>
                                    <button type='button' disabled={disableNext} onClick={handleNext} className="join-item btn">{'>'}</button>
                                    <button type='button' disabled={disableNext} onClick={handleEnd} className="join-item btn">{'>>'}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Make responsive box, with 2 box in a row and make it center */}
            {mode === 'box' && (
                <div className='flex flex-col lg:flex-row justify-center gap-[2vw]'>
                    {mappedBoxData.map((box, index) => (
                        <div key={index} className='lg:w-[40%] m-2 bg-white shadow-md rounded-3xl shadow-2xl'>
                            {/* Add title from box.type */}
                            <div className='p-4 font-semibold text-center'>
                                <h2 className='text-2xl'>{box.type}</h2>
                                <span className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
                            </div>
                            {/* Render box.data here */}
                            <div className='flex flex-wrap justify-center gap-[2vw] mb-8'>
                                {box.data.map((data, index) => (
                                    <div key={index} className='card bg-neutral-100 w-[65vw] lg:w-[17vw] shadow-xl'>
                                        <div className='card-body'>
                                            <h2 className='card-title'>{data.title}</h2>
                                            <p>{data.value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </AuthenticatedLayout>
    );
}
