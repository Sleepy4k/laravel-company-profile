import { PropsWithChildren } from 'react';
import Menu from '@/Components/Installer/Menu';
import ApplicationLogo from '@/Components/ApplicationLogo';

interface InstallationProps extends PropsWithChildren {
    step: number;
    errors: Record<string, any> | null;
}

export default function Installation({ children, errors, step }: InstallationProps) {
    return (
        <div id="app">
            <div className="flex min-h-screen flex-col justify-center bg-neutral-100 py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="mb-5 mt-5 text-center">
                        <ApplicationLogo className="mx-auto h-12 w-auto" />
                        <span>Welcome to {import.meta.env.VITE_APP_NAME} Installer</span>
                    </div>
                </div>
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-5xl">
                    <div className="border border-neutral-200 bg-white p-7 shadow-sm sm:rounded-lg">
                        <Menu step={step} />

                        {errors && Object.keys(errors || {}).length > 0 && (
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
                                            There was an error with your submission
                                        </h3>
                                        <div className="mt-2 text-sm text-warning-700">
                                            <ul className="list-disc pl-5 space-y-1">
                                                {Object.keys(errors).map((key) => (
                                                    <li key={key}>{errors[key]}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        { children }
                    </div>
                </div>
            </div>
        </div>
    );
}
