import { PageProps } from "@/types";
import trans from "@/utils/translate";
import Modal from "@/Components/Modal";
import alert from "@/utils/sweet.alert";
import TextInput from "@/Components/TextInput";
import { Link, useForm } from "@inertiajs/react";
import CustomButton from "@/Components/CustomButton";
import ResponsiveHeader from "@/Components/ResponsiveHeader";
import { FormEventHandler, useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Edit({
    role,
    permissions,
    backUrl,
    errors,
}: PageProps<{ role: any; permissions: any; backUrl: string }>) {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [currentPermissions, setCurrentPermissions] = useState<string[]>([]);
    const { data, setData, patch, processing, reset, isDirty } = useForm<{
        name: string;
        guard_name: string;
        permissions: string[];
    }>({
        name: role.name,
        guard_name: role.guard_name,
        permissions: [],
    });

    useEffect(() => {
        const data = role.permissions.map((permission: any) => permission.name);
        setCurrentPermissions(data);
        setData("permissions", data);
    }, []);

    const submit: FormEventHandler = (e: any) => {
        e.preventDefault();

        patch(route("rbac.roles.update", role?.uuid || 0), {
            onProgress: () => {
                alert.fire({
                    title: "Please wait...",
                    text: "We are updating the role.",
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    didOpen: () => {
                        alert.showLoading();
                    },
                });
            },
            onSuccess: () => {
                reset("name", "guard_name");
                alert.fire({
                    title: "Success",
                    text: "Role has been updated.",
                    icon: "success",
                });
            },
            onError: () => {
                alert.fire({
                    title: "Error",
                    text: "Something went wrong. Please try again.",
                    icon: "error",
                });
            },
        });
    };

    const handleReset = () => {
        if (isDirty)
            alert
                .fire({
                    title: "Are you sure?",
                    text: "You have unsaved changes. Are you sure you want to reset?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Yes",
                    cancelButtonText: "No",
                })
                .then((result: any) => {
                    if (result.isConfirmed) {
                        reset("name", "guard_name");
                        alert.fire({
                            title: "Success",
                            text: "Form has been reset.",
                            icon: "success",
                        });
                    }
                });
    };

    const closeModal = () => setShowModal(false);

    const handlePermissionChange = (e: any) => {
        const { value } = e.target;

        if (currentPermissions.includes(value)) {
            const data = currentPermissions.filter(
                (permission) => permission !== value
            );
            setCurrentPermissions(data);
            setData("permissions", data);
        } else {
            const data = [...currentPermissions, value];
            setCurrentPermissions(data);
            setData("permissions", data);
        }
    };

    return (
        <AuthenticatedLayout
            title={trans("page.rbac.role.edit.title", "Edit Role")}
            header={
                <ResponsiveHeader>
                    <Link
                        href={backUrl}
                        className="bg-primary-700 lg:py-2 py-1 lg:px-3 px-2 text-white dark:text-gray-800 rounded shadow transition-all dark:bg-white hover:bg-primary-700 dark:hover:bg-white dark:focus:bg-white"
                    >
                        Back
                    </Link>
                </ResponsiveHeader>
            }
        >
            <div className="bg-white dark:bg-gray-800 lg:w-[35rem] w-[20rem] mx-auto px-6 py-4">
                <form onSubmit={submit} className="mb-5">
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-400"
                        >
                            Name
                        </label>
                        <TextInput
                            id="name"
                            type="text"
                            name="name"
                            disabled={processing}
                            value={data.name}
                            placeholder="e.g. name"
                            onChange={(e) => setData("name", e.target.value)}
                            className="mt-1 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border-gray-300 rounded-md"
                        />
                        {errors?.group && (
                            <p className="mt-2 text-sm text-danger-600">
                                {errors.group}
                            </p>
                        )}
                    </div>

                    <div className="mt-4">
                        <label
                            htmlFor="guard_name"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-400"
                        >
                            Guard Name
                        </label>
                        <TextInput
                            id="guard_name"
                            type="text"
                            name="guard_name"
                            disabled={processing}
                            value={data.guard_name}
                            placeholder="e.g. web"
                            onChange={(e) =>
                                setData("guard_name", e.target.value)
                            }
                            className="mt-1 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border-gray-300 rounded-md"
                        />
                        {errors?.key && (
                            <p className="mt-2 text-sm text-danger-600">
                                {errors.key}
                            </p>
                        )}
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

                    <div className="flex items-center justify-end mt-8 gap-3">
                        <CustomButton
                            type="reset"
                            onClick={handleReset}
                            disabled={processing}
                            className="bg-neutral-700 text-white py-2 px-3 rounded shadow transition-all hover:bg-neutral-700 dark:opacity-35"
                        >
                            Reset
                        </CustomButton>
                        <CustomButton
                            type="submit"
                            disabled={processing}
                            className="bg-primary-700 text-white py-2 px-3 rounded shadow transition-all hover:bg-primary-700"
                        >
                            Update
                        </CustomButton>
                    </div>
                </form>
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
                                            id={`permission-${permission.uuid}`}
                                            type="checkbox"
                                            name="permissions[]"
                                            value={permission.name}
                                            onChange={handlePermissionChange}
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
