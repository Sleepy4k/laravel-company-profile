import { PageProps } from '@/types';
import { Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Home({ auth }: PageProps) {
    return (
        <AuthenticatedLayout user={auth.user} title="Log">
            <div className="py-4">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <h1 className="text-xl font-semibold">Log</h1>
                            <p className="text-gray-500">Choose which log you want to see</p>
                        </div>

                        <div className="flex flex-wrap justify-start">
                            <div className="w-full p-4">
                                <div className='p-4 mb-5 bg-white border border-gray-200 rounded-lg shadow-sm'>
                                    <div className='flex lg:justify-between justify-start items-center lg:flex-row flex-col'>
                                        <div>
                                            <h2 className='font-semibold text-md leading-tight'>Authentication Log</h2>
                                            <span className='text-gray-500 text-sm'>See all authentication logs, including login and logout</span>
                                        </div>
                                        <div className='flex items-center gap-4 lg:mt-0 mt-3'>
                                            <Link href={route('log.auth.index')} className='text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg'>
                                                View
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                <div className='p-4 mb-5 bg-white border border-gray-200 rounded-lg shadow-sm'>
                                    <div className='flex lg:justify-between justify-start items-center lg:flex-row flex-col'>
                                        <div>
                                            <h2 className='font-semibold text-md leading-tight'>Model Log</h2>
                                            <span className='text-gray-500 text-sm'>See all changes to the model, including create, update, and delete</span>
                                        </div>
                                        <div className='flex items-center gap-4 lg:mt-0 mt-3'>
                                            <Link href={route('log.model.index')} className='text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg'>
                                                View
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                <div className='p-4 mb-5 bg-white border border-gray-200 rounded-lg shadow-sm'>
                                    <div className='flex lg:justify-between justify-start items-center lg:flex-row flex-col'>
                                        <div>
                                            <h2 className='font-semibold text-md leading-tight'>System Log</h2>
                                            <span className='text-gray-500 text-sm'>See all system logs, including daily log for see any error and info</span>
                                        </div>
                                        <div className='flex items-center gap-4 lg:mt-0 mt-3'>
                                            <Link href={route('log.system.index')} className='text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg'>
                                                View
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                <div className='p-4 mb-5 bg-white border border-gray-200 rounded-lg shadow-sm'>
                                    <div className='flex lg:justify-between justify-start items-center lg:flex-row flex-col'>
                                        <div>
                                            <h2 className='font-semibold text-md leading-tight'>Query Log</h2>
                                            <span className='text-gray-500 text-sm'>See all query logs, including daily log for see any query executed</span>
                                        </div>
                                        <div className='flex items-center gap-4 lg:mt-0 mt-3'>
                                            <Link href={route('log.query.index')} className='text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg'>
                                                View
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
