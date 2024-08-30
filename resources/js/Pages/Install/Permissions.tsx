import { PageProps } from '@/types';
import { Link, Head } from '@inertiajs/react';
import PassesIcon from '@/Components/Installer/PassesIcon';
import InstallationLayout from '@/Layouts/InstallationLayout';
import IPermissionProps from '@/Interfaces/Install/PermissionInterface';

export default function Permissions({
    errors,
    permissions,
    process_user
}: PageProps<{ permissions: IPermissionProps, process_user: string }>) {
    return (
        <InstallationLayout step={2} errors={errors}>
            <Head title="Permissions" />

            <div className="p-3">
                <h4 className="my-5 text-lg font-semibold text-neutral-800">Files and folders permissions</h4>
                <p className="text-neutral-700">
                    These folders must be writable by web server user:
                    <strong className="select-all">{` ${process_user}`}</strong>
                    <br />
                    Recommended permissions:
                    <strong className="select-all">{' 0775'}</strong>
                    <br />
                    <br />
                </p>

                <div className="flex flex-col">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <div className="overflow-hidden border border-neutral-200 shadow-sm sm:rounded-lg">
                                <table className="min-w-full divide-y divide-neutral-200">
                                    <thead className="bg-neutral-50">
                                        <tr>
                                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
                                                Path
                                            </th>
                                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
                                                Permission
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-neutral-200 bg-white">
                                        {Object.keys(permissions.results).map((key, index) => (
                                            <tr key={index}>
                                                <td className="whitespace-nowrap px-4 py-2 text-sm font-medium text-neutral-900">
                                                    { permissions.results[index].folder.trim().replace(/\/+$/, '') }
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-2 text-sm font-medium text-neutral-900">
                                                    <span className={`${permissions.results[index].isSet ? 'text-success-500' : 'text-danger-500'} inline-flex`}>
                                                        { permissions.results[index].isSet && <PassesIcon /> }

                                                        { permissions.results[index].permission }
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {(permissions['errors'] && permissions['errors'] == true) ? (
                <div className="-m-7 mt-6 rounded-b border-t border-warning-100 bg-warning-50 py-7 px-10 text-right">
                    <div className="flex">
                        <div className="shrink-0">
                            <svg className="h-5 w-5 text-warning-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-warning-800">
                                You need to fix the requirements in order to continue with the installation.
                            </h3>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="-m-7 me-2 mt-6 rounded-b border-t border-neutral-200 bg-neutral-50 p-4 text-right">
                    <Link href={route('install.setup')}
                        className="inline-flex items-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 hover:bg-primary-700"
                    >
                        Next
                    </Link>
                </div>
            )}
        </InstallationLayout>
    );
}
