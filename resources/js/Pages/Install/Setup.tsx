import { PageProps } from "@/types";
import { FormEventHandler } from "react";
import { useForm } from "@inertiajs/react";
import InstallationLayout from "@/Layouts/InstallationLayout";
import IDefaultConfigProps from "@/Interfaces/Install/DefaultConfigInterface";

export default function Setup({
    guessedUrl,
    defaultConfig,
    errors,
}: PageProps<{ guessedUrl: string; defaultConfig: IDefaultConfigProps }>) {
    const { data, setData, post, processing, reset } = useForm({
        app_url: guessedUrl,
        app_name: defaultConfig.app_name,
        database_hostname: defaultConfig.database_hostname,
        database_port: defaultConfig.database_port,
        database_name: defaultConfig.database_name,
        database_username: defaultConfig.database_username,
        database_password: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("install.setup.store"), {
            preserveScroll: true,
            onSuccess: () => {
                window.history.pushState({}, "", route("install.database"));
                window.location.reload();
            },
            onFinish: () => reset("database_password"),
        });
    };

    return (
        <InstallationLayout step={3} errors={errors} title="Setup">
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
                            If you are submitted form and you are getting
                            redirected to the same page, please click the "Test
                            Connection &amp; Configure" button again. This is a
                            known issue because of restarting server from
                            changed env data and we are working on it.
                        </h3>
                    </div>
                </div>
            </div>

            <form onSubmit={submit}>
                <div className="p-3">
                    <h5 className="my-5 text-lg font-semibold text-neutral-800">
                        General Config
                    </h5>

                    <div className="space-y-6 sm:space-y-5">
                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-neutral-200 sm:pt-5">
                            <label
                                htmlFor="appUrlName"
                                className="block text-sm font-medium text-neutral-700 sm:mt-px sm:pt-2"
                            >
                                <span className="mr-1 text-sm text-danger-600">
                                    *
                                </span>
                                Application URL
                            </label>
                            <div className="mt-1 sm:col-span-2 sm:mt-0">
                                <input
                                    id="appUrlName"
                                    type="text"
                                    name="app_url"
                                    value={data.app_url}
                                    disabled={processing}
                                    placeholder="https://subdomain.example.com/"
                                    className="block w-full rounded-md border border-neutral-300 dark:text-black shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                                    onChange={(e) =>
                                        setData("app_url", e.target.value)
                                    }
                                />
                                <p className="mt-2 text-sm text-neutral-500">
                                    {`
                                        * This is the URL where you are installing the application,
                                        for example, for subdomain in this field you need to enter "https://subdomain.example.com/",
                                        make sure to check the documentation on how to create your subdomain.
                                    `}
                                </p>
                                {errors?.app_url && (
                                    <p className="mt-2 text-sm text-danger-600">
                                        {errors.app_url}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-neutral-200 sm:pt-5">
                            <label
                                htmlFor="inputAppName"
                                className="block text-sm font-medium text-neutral-700 sm:mt-px sm:pt-2"
                            >
                                <span className="mr-1 text-sm text-danger-600">
                                    *
                                </span>
                                Application Name
                            </label>
                            <div className="mt-1 sm:col-span-2 sm:mt-0">
                                <input
                                    id="inputAppName"
                                    type="text"
                                    name="app_name"
                                    value={data.app_name}
                                    placeholder="My App"
                                    disabled={processing}
                                    className="block w-full rounded-md border border-neutral-300 dark:text-black shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                                    onChange={(e) =>
                                        setData("app_name", e.target.value)
                                    }
                                />
                                {errors?.app_name && (
                                    <p className="mt-2 text-sm text-danger-600">
                                        {errors.app_name}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <h5 className="mb-5 mt-10 text-lg font-semibold text-neutral-800">
                        Database Configuration
                    </h5>

                    {errors?.privilege && (
                        <div className="mb-5 rounded-md border border-danger-200 bg-danger-50 p-4 text-sm text-danger-500">
                            <p className="mb-2">{errors.privilege}</p>
                            <p className="font-bold">
                                Make sure to give{" "}
                                <span className="font-bold">
                                    all privileges to the database user
                                </span>
                                , check the installation video in the
                                documentation.
                            </p>
                        </div>
                    )}

                    {errors?.general && (
                        <div className="mb-5 rounded-md border border-danger-200 bg-danger-50 p-4 text-sm text-danger-500">
                            <p className="mb-2">{errors.general}</p>
                            <p className="font-bold">
                                Please check the following:
                            </p>
                            <ul className="list-disc list-inside">
                                <li>Database credentials are correct.</li>
                                <li>Database server is running.</li>
                                <li>
                                    Database server is reachable from the
                                    current server.
                                </li>
                            </ul>
                        </div>
                    )}

                    <div className="space-y-6 sm:space-y-5">
                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-neutral-200 sm:pt-5">
                            <label
                                htmlFor="inputDatabaseHostname"
                                className="block text-sm font-medium text-neutral-700 sm:mt-px sm:pt-2"
                            >
                                <span className="mr-1 text-sm text-danger-600">
                                    *
                                </span>
                                Database Hostname
                            </label>
                            <div className="mt-1 sm:col-span-2 sm:mt-0">
                                <input
                                    id="inputDatabaseHostname"
                                    type="text"
                                    name="database_hostname"
                                    value={data.database_hostname}
                                    placeholder="localhost"
                                    disabled={processing}
                                    className="block w-full rounded-md border border-neutral-300 dark:text-black shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                                    onChange={(e) =>
                                        setData(
                                            "database_hostname",
                                            e.target.value
                                        )
                                    }
                                />
                                {errors?.database_hostname && (
                                    <p className="mt-2 text-sm text-danger-600">
                                        {errors.database_hostname}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-neutral-200 sm:pt-5">
                            <label
                                htmlFor="inputDatabasePort"
                                className="block text-sm font-medium text-neutral-700 sm:mt-px sm:pt-2"
                            >
                                <span className="mr-1 text-sm text-danger-600">
                                    *
                                </span>
                                Database Port
                            </label>
                            <div className="mt-1 sm:col-span-2 sm:mt-0">
                                <input
                                    id="inputDatabasePort"
                                    type="text"
                                    name="database_port"
                                    value={data.database_port}
                                    placeholder="3306"
                                    disabled={processing}
                                    className="block w-full rounded-md border border-neutral-300 dark:text-black shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                                    onChange={(e) =>
                                        setData("database_port", e.target.value)
                                    }
                                />
                                <p className="mt-2 text-sm text-neutral-500">
                                    {`
                                        * The default MySQL ports is 3306,
                                        change the value only if you are certain that you are using different port.
                                    `}
                                </p>
                                {errors?.database_port && (
                                    <p className="mt-2 text-sm text-danger-600">
                                        {errors.database_port}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-neutral-200 sm:pt-5">
                            <label
                                htmlFor="inputDatabaseName"
                                className="block text-sm font-medium text-neutral-700 sm:mt-px sm:pt-2"
                            >
                                <span className="mr-1 text-sm text-danger-600">
                                    *
                                </span>
                                Database Name
                            </label>
                            <div className="mt-1 sm:col-span-2 sm:mt-0">
                                <input
                                    id="inputDatabaseName"
                                    type="text"
                                    name="database_name"
                                    value={data.database_name}
                                    placeholder="my_database"
                                    disabled={processing}
                                    className="block w-full rounded-md border border-neutral-300 dark:text-black shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                                    onChange={(e) =>
                                        setData("database_name", e.target.value)
                                    }
                                />
                                <p className="mt-2 text-sm text-neutral-500">
                                    {`
                                        * Make sure that you have created the database before configuring.
                                    `}
                                </p>
                                {errors?.database_name && (
                                    <p className="mt-2 text-sm text-danger-600">
                                        {errors.database_name}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-neutral-200 sm:pt-5">
                            <label
                                htmlFor="inputDatabaseUsername"
                                className="block text-sm font-medium text-neutral-700 sm:mt-px sm:pt-2"
                            >
                                <span className="mr-1 text-sm text-danger-600">
                                    *
                                </span>
                                Database Username
                            </label>
                            <div className="mt-1 sm:col-span-2 sm:mt-0">
                                <input
                                    id="inputDatabaseUsername"
                                    type="text"
                                    name="database_username"
                                    value={data.database_username}
                                    placeholder="root"
                                    disabled={processing}
                                    className="block w-full rounded-md border border-neutral-300 dark:text-black shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                                    onChange={(e) =>
                                        setData(
                                            "database_username",
                                            e.target.value
                                        )
                                    }
                                />
                                <p className="mt-2 text-sm text-neutral-500">
                                    {`
                                        * Make sure you have set ALL privileges for the user.
                                    `}
                                </p>
                                {errors?.database_username && (
                                    <p className="mt-2 text-sm text-danger-600">
                                        {errors.database_username}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-neutral-200 sm:pt-5">
                            <label
                                htmlFor="inputDatabasePassword"
                                className="block text-sm font-medium text-neutral-700 sm:mt-px sm:pt-2"
                            >
                                Database Password
                            </label>
                            <div className="mt-1 sm:col-span-2 sm:mt-0">
                                <input
                                    id="inputDatabasePassword"
                                    type="text"
                                    name="database_password"
                                    value={data.database_password}
                                    disabled={processing}
                                    placeholder="password"
                                    className="block w-full rounded-md border border-neutral-300 dark:text-black shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                                    onChange={(e) =>
                                        setData(
                                            "database_password",
                                            e.target.value
                                        )
                                    }
                                />
                                <p className="mt-2 text-sm text-neutral-500">
                                    {`
                                        * Enter the database user password.
                                    `}
                                </p>
                                {errors?.database_password && (
                                    <p className="mt-2 text-sm text-danger-600">
                                        {errors.database_password}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="-m-7 -mb-11 mt-6 rounded-b border-t border-neutral-200 bg-neutral-50 p-4 text-right">
                    <button
                        type="submit"
                        disabled={processing}
                        className="inline-flex items-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-60 hover:bg-primary-700"
                    >
                        Test Connection &amp; Configure
                    </button>
                </div>
            </form>
        </InstallationLayout>
    );
}
