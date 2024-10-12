import { PageProps } from "@/types";
import { Link, useForm } from "@inertiajs/react";
import { FormEventHandler, useState } from "react";
import MainLayout from "@/Layouts/MainLayout";
import LoadingButton from "@/Components/Button/LoadingButton";
import FieldGroup from "@/Components/Form/FieldGroup";
import TextInput from "@/Components/Form/TextInput";
import SelectInput from "@/Components/Form/SelectInput";
import Permissions from "./partials/Permissions";

type GuardNameProp = {
  value: string;
  label: string;
};

function Create({
  permissions,
  guardList,
  defaultGuard,
  backUrl,
}: PageProps<{
  permissions: any;
  guardList: GuardNameProp[];
  defaultGuard: GuardNameProp;
  backUrl: string;
}>) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentPermissions, setCurrentPermissions] = useState<string[]>([]);
  const { data, setData, post, processing, reset, errors } = useForm<{
    name: string;
    guard_name: string;
    permissions: string[];
  }>({
    name: "",
    guard_name: defaultGuard.value,
    permissions: [],
  });

  const handleSubmit: FormEventHandler = (e: any) => {
    e.preventDefault();

    post(route("rbac.roles.store"), {
      onSuccess: () => reset(),
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
    <div>
      <div className="flex items-center justify-between mb-6 lg:flex-row flex-col">
        <h1 className="mb-8 text-3xl font-bold">
          <Link
            href={backUrl}
            className="text-indigo-600 hover:text-indigo-700"
          >
            Role
          </Link>
          <span className="font-medium text-indigo-600"> /</span> Create
        </h1>
        <div className="flex items-center lg:gap-5 gap-1 lg:flex-row flex-col">
          <Link href={backUrl} className="btn btn-indigo focus:outline-none">
            Back
          </Link>
        </div>
      </div>
      <div className="max-w-3xl overflow-hidden bg-white rounded shadow">
        <form onSubmit={handleSubmit}>
          <div className="grid gap-8 p-8 lg:grid-cols-1">
            <FieldGroup label="Name" name="name" error={errors.name}>
              <TextInput
                name="name"
                error={errors.name}
                value={data.name}
                onChange={(e) => setData("name", e.target.value)}
              />
            </FieldGroup>

            <FieldGroup
              label="Display"
              name="guard_name"
              error={errors.guard_name}
            >
              <SelectInput
                name="guard_name"
                error={errors.guard_name}
                defaultValue={defaultGuard}
                options={guardList}
                onChange={(selected: any) =>
                  setData("guard_name", selected?.value)
                }
              />
            </FieldGroup>

            <FieldGroup
              label="Permissions"
              name="permissions"
              error={errors.permissions}
            >
              <LoadingButton
                loading={false}
                type="button"
                onClick={() => setShowModal(!showModal)}
                className="btn-indigo"
              >
                Permissions
              </LoadingButton>
            </FieldGroup>
          </div>

          <div className="flex items-center justify-end px-8 py-4 bg-gray-100 border-t border-gray-200">
            <LoadingButton
              loading={processing}
              type="submit"
              className="btn-indigo"
            >
              Create Role
            </LoadingButton>
          </div>
        </form>
      </div>

      <Permissions
        showModal={showModal}
        closeModal={closeModal}
        permissions={permissions}
        handlePermissionChange={handlePermissionChange}
        currentPermissions={currentPermissions}
      />
    </div>
  );
}

/**
 * Persistent Layout (Inertia.js)
 *
 * [Learn more](https://inertiajs.com/pages#persistent-layouts)
 */
Create.layout = (page: React.ReactNode) => (
  <MainLayout title="Create Role" children={page} />
);

export default Create;
