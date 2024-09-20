import { PageProps } from "@/types";
import trans from "@/utils/translate";
import alert from "@/utils/sweet.alert";
import { FormEventHandler } from "react";
import TextInput from "@/Components/TextInput";
import { Link, useForm } from "@inertiajs/react";
import CustomButton from "@/Components/CustomButton";
import ResponsiveHeader from "@/Components/ResponsiveHeader";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Create({
    backUrl,
    errors,
}: PageProps<{ backUrl: string }>) {
    const { data, setData, post, processing, reset, isDirty } = useForm({
        name: "",
        guard_name: "web",
    });

    const submit: FormEventHandler = (e: any) => {
        e.preventDefault();

        post(route("rbac.roles.store"), {
            onProgress: () => {
                alert.fire({
                    title: "Please wait...",
                    text: "We are creating the role.",
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
                    text: "Role has been created.",
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

    return (
        <AuthenticatedLayout
            title={trans("page.rbac.role.create.title", "Create Role")}
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
                            Create
                        </CustomButton>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
