import { PageProps } from '@/types';
import { Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Home({ auth }: PageProps) {
    const BoxTemplate = ({ title, description, link }: { title: string, description: string, link: string }) => {
        return (
            <div className='p-4 mb-5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-sm'>
                <div className='flex lg:justify-between justify-start items-center lg:flex-row flex-col'>
                    <div>
                        <h2 className='font-semibold text-md dark:text-gray-400 leading-tight'>{title}</h2>
                        <span className='text-gray-500 dark:text-gray-400 text-sm'>{description}</span>
                    </div>
                    <div className='flex items-center gap-4 lg:mt-0 mt-3'>
                        <Link href={link} className='text-white dark:text-gray-800 bg-blue-500 dark:bg-white hover:bg-blue-600 dark:hover:bg-white dark:focus:bg-white px-4 py-2 rounded-lg'>
                            View
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <AuthenticatedLayout user={auth.user} title="Log">
            <div className="py-4">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-600">
                            <h1 className="text-xl font-semibold dark:text-gray-400">Log</h1>
                            <p className="text-gray-500 dark:text-gray-400">Choose which log you want to see</p>
                        </div>

                        <div className="flex flex-wrap justify-start">
                            <div className="w-full p-4">
                                <BoxTemplate
                                    title='Authentication Log'
                                    description='See all authentication logs, including login and logout'
                                    link={route('log.auth.index')}
                                />

                                <BoxTemplate
                                    title='Model Log'
                                    description='See all changes to the model, including create, update, and delete'
                                    link={route('log.model.index')}
                                />

                                <BoxTemplate
                                    title='System Log'
                                    description='See all system logs, including daily log for see any error and info'
                                    link={route('log.system.index')}
                                />

                                <BoxTemplate
                                    title='Query Log'
                                    description='See all query logs, including daily log for see any query executed'
                                    link={route('log.query.index')}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
