import { useEffect, useState } from "react";
import { PageProps } from "@/types";
import trans from "@/utils/translate";
import Modal from "@/Components/Modal";
import { Link } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import ResponsiveHeader from "@/Components/ResponsiveHeader";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
    capitalizeFirstLetter,
    convertDateToLocaleString,
} from "@/utils/parse";

export default function Show({
    data,
    permissions,
    backUrl,
}: PageProps<{ data: any, permissions: any, backUrl: string }>) {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [currentPermissions, setCurrentPermissions] = useState<string[]>([]);

    const closeModal = () => setShowModal(false);

    useEffect(() => {
        const filteredData = data.permissions.map((permission: any) => permission.name);
        setCurrentPermissions(filteredData);
    }, []);

    return (
        <AuthenticatedLayout
            title={trans("page.rbac.role.show.title", "View Role")}
            header={
                <ResponsiveHeader>
                    <Link
                        href={route("rbac.roles.edit", data?.uuid || 0)}
                        className="bg-primary-700 lg:py-2 py-1 lg:px-3 px-2 text-white dark:text-gray-800 rounded shadow transition-all dark:bg-white hover:bg-primary-700 dark:hover:bg-white dark:focus:bg-white"
                    >
                        Edit
                    </Link>
                    <Link
                        href={backUrl}
                        className="bg-primary-700 lg:py-2 py-1 lg:px-3 px-2 text-white dark:text-gray-800 rounded shadow transition-all dark:bg-white hover:bg-primary-700 dark:hover:bg-white dark:focus:bg-white"
                    >
                        {trans("form.button.back", "Back")}
                    </Link>
                </ResponsiveHeader>
            }
        >
            <div className="bg-white dark:bg-gray-800 lg:w-[35rem] w-[20rem] mb-5 mx-auto px-6 py-4">
                <div>
                    <label
                        htmlFor="id"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-400"
                    >
                        {trans("page.rbac.role.field.id", "ID")}
                    </label>
                    <TextInput
                        disabled
                        id="id"
                        value={data.id}
                        className="mt-1 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border-gray-300 rounded-md"
                    />
                </div>

                <div className="mt-4">
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-400"
                    >
                        {trans("page.rbac.role.field.name", "Name")}
                    </label>
                    <TextInput
                        disabled
                        id="name"
                        value={capitalizeFirstLetter(data.name)}
                        className="mt-1 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border-gray-300 rounded-md"
                    />
                </div>

                <div className="mt-4">
                    <label
                        htmlFor="guard_name"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-400"
                    >
                        {trans(
                            "page.rbac.role.field.guard_name",
                            "Guard Name"
                        )}
                    </label>
                    <TextInput
                        disabled
                        id="guard_name"
                        value={capitalizeFirstLetter(data.guard_name)}
                        className="mt-1 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border-gray-300 rounded-md"
                    />
                </div>

                <div className="mt-4">
                    <label
                        htmlFor="permissions"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-400"
                    >
                        Permissions
                    </label>
                    <button
                        type="button"
                        onClick={() => setShowModal(true)}
                        className="mt-1 block w-full bg-primary-700 text-white py-2 px-3 rounded shadow transition-all hover:bg-primary-700"
                    >
                        Select Permissions
                    </button>
                </div>

                <div className="mt-4">
                    <label
                        htmlFor="created_at"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-400"
                    >
                        {trans("page.log.auth.field.created_at", "Created At")}
                    </label>
                    <TextInput
                        disabled
                        id="created_at"
                        value={convertDateToLocaleString(data.created_at)}
                        className="mt-1 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border-gray-300 rounded-md"
                    />
                </div>

                <div className="mt-4">
                    <label
                        htmlFor="updated_at"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-400"
                    >
                        {trans("page.log.auth.field.updated_at", "Updated At")}
                    </label>
                    <TextInput
                        disabled
                        id="updated_at"
                        value={convertDateToLocaleString(data.updated_at)}
                        className="mt-1 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border-gray-300 rounded-md"
                    />
                </div>
            </div>

            <Modal show={showModal} onClose={closeModal}>
                <div className="p-6 max-h-[calc(100vh-10rem)] overflow-y-auto">
                    {permissions.map((data: any) => (
                        <>
                            <label
                                htmlFor={data.group}
                                className="block mt-5 text-sm font-medium text-gray-700 dark:text-gray-400"
                            >
                                {data.group.toUpperCase()}
                            </label>
                            <div className="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                {data.permissions.map((permission: any) => (
                                    <div
                                        key={permission.id}
                                        className="flex items-center"
                                    >
                                        <input
                                            disabled
                                            id={`permission-${permission.uuid}`}
                                            type="checkbox"
                                            name="permissions[]"
                                            value={permission.name}
                                            className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
                                            {...(currentPermissions.includes(
                                                permission.name
                                            ) && { checked: true })}
                                        />
                                        <label
                                            htmlFor={`permission-${permission.uuid}`}
                                            className="ml-2 block text-sm text-gray-900 dark:text-gray-300"
                                        >
                                            {permission.name}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </>
                    ))}
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
