import { PageProps } from "@/types";
import { Link, useForm } from "@inertiajs/react";
import { FormEventHandler, useEffect, useState } from "react";
import MainLayout from "@/Layouts/MainLayout";
import LoadingButton from "@/Components/Button/LoadingButton";
import FieldGroup from "@/Components/Form/FieldGroup";
import TextInput from "@/Components/Form/TextInput";
import SelectInput from "@/Components/Form/SelectInput";
import { capitalizeFirstLetter } from "@/utils/parse";
import Permissions from "./partials/Permissions";

type GuardNameProp = {
  value: string;
  label: string;
};

function Edit({
  role,
  permissions,
  guardList,
  backUrl,
}: PageProps<{
  role: any;
  permissions: any;
  guardList: GuardNameProp[];
  backUrl: string;
}>) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentPermissions, setCurrentPermissions] = useState<string[]>([]);
  const { data, setData, patch, processing, reset, errors } = useForm<{
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

  const handleSubmit: FormEventHandler = (e: any) => {
    e.preventDefault();

    patch(route("rbac.roles.update", role?.uuid || 0), {
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
          <span className="font-medium text-indigo-600"> /</span> Update
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
                options={guardList}
                defaultValue={{
                  value: data.guard_name,
                  label: capitalizeFirstLetter(data.guard_name),
                }}
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
              Update Role
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
Edit.layout = (page: React.ReactNode) => (
  <MainLayout title="Update Role" children={page} />
);

export default Edit;
