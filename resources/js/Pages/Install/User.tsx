import { PageProps } from '@/types';
import { FormEventHandler } from 'react';
import { Head, useForm } from '@inertiajs/react';
import InstallationLayout from '@/Layouts/InstallationLayout';

export default function User({ errors }: PageProps) {
    const { data, setData, post, get, processing, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('install.user.store'), {
            preserveScroll: true,
            onSuccess: () => window.location.replace(route('install.finalize')),
            onFinish: () => {
                reset('password', 'password_confirmation');
            }
        });
    };

    return (
        <InstallationLayout step={4} errors={errors}>
            <Head title="User" />

            <div className="mt-5 rounded-md bg-warning-50 p-4">
                <div className="flex">
                    <div className="shrink-0">
                        <svg
                            className="h-5 w-5 text-warning-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                            />
                        </svg>
                    </div>
                    <div className="ml-3">
                        <h3 className="text-sm font-medium text-warning-800">
                            If you are submitted form and you are getting redirected to the same page, please click the "Install" button again.
                            This is a known issue because of restarting server from changed env data and we are working on it.
                        </h3>
                    </div>
                </div>
            </div>

            <form onSubmit={submit}>
                <div className="p-3">
                    <h5 className="my-5 text-lg font-semibold text-neutral-800">Configure Admin User</h5>

                    <div className="space-y-6 sm:space-y-5">
                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-neutral-200 sm:pt-5">
                            <label htmlFor="inputUserName" className="block text-sm font-medium text-neutral-700 sm:mt-px sm:pt-2">
                                <span className="mr-1 text-sm text-danger-600">*</span>Name (Full Name)
                            </label>
                            <div className="mt-1 sm:col-span-2 sm:mt-0">
                                <input
                                    id="inputUserName"
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    disabled={processing}
                                    placeholder='Enter your full name'
                                    className="block w-full rounded-md border border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                                    onChange={(e) => setData('name', e.target.value)}
                                />
                                {errors?.name && <p className="mt-2 text-sm text-danger-600">{errors.name}</p>}
                            </div>
                        </div>

                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-neutral-200 sm:pt-5">
                            <label htmlFor="inputEmail" className="block text-sm font-medium text-neutral-700 sm:mt-px sm:pt-2">
                                <span className="mr-1 text-sm text-danger-600">*</span>E-Mail Address
                            </label>
                            <div className="mt-1 sm:col-span-2 sm:mt-0">
                                <input
                                    id="inputEmail"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    disabled={processing}
                                    placeholder='Enter your email address that will be used for login'
                                    className="block w-full rounded-md border border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                                {errors?.email && <p className="mt-2 text-sm text-danger-600">{errors.email}</p>}
                            </div>
                        </div>

                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-neutral-200 sm:pt-5">
                            <label htmlFor="inputPassword" className="block text-sm font-medium text-neutral-700 sm:mt-px sm:pt-2">
                                <span className="mr-1 text-sm text-danger-600">*</span>Password
                            </label>
                            <div className="mt-1 sm:col-span-2 sm:mt-0">
                                <input
                                    id="inputPassword"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    disabled={processing}
                                    placeholder='Login password'
                                    className="block w-full rounded-md border border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                                {errors?.password && <p className="mt-2 text-sm text-danger-600">{errors.password}</p>}
                            </div>
                        </div>

                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-neutral-200 sm:pt-5">
                            <label htmlFor="inputPasswordConfirm" className="block text-sm font-medium text-neutral-700 sm:mt-px sm:pt-2">
                                <span className="mr-1 text-sm text-danger-600">*</span>Confirm Password
                            </label>
                            <div className="mt-1 sm:col-span-2 sm:mt-0">
                                <input
                                    id="inputPasswordConfirm"
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    disabled={processing}
                                    placeholder='Confirm login password'
                                    className="block w-full rounded-md border border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                />
                                {errors?.password_confirmation && <p className="mt-2 text-sm text-danger-600">{errors.password_confirmation}</p>}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="-m-7 -mb-11 mt-6 rounded-b border-t border-neutral-200 bg-neutral-50 p-4 text-right">
                    <button type="submit" disabled={processing} className="inline-flex items-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-60 hover:bg-primary-700">
                        Install
                    </button>
                </div>
            </form>
        </InstallationLayout>
    );
}
