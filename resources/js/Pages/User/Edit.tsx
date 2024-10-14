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

type RoleDataProp = {
  name: string;
  guard_name: string;
  permissions: PermissionDataProp[];
}

type PermissionDataProp = {
  name: string;
  guard_name: string;
}

type UserDataProp = {
  uuid: string;
  name: string;
  email: string;
  roles: RoleDataProp[];
  permissions: PermissionDataProp[];
};

function Edit({
  user,
  roles,
  permissions,
  backUrl,
}: PageProps<{
  user: UserDataProp;
  roles: RoleDataProp[];
  permissions: any;
  backUrl: string;
}>) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentPermissions, setCurrentPermissions] = useState<string[]>([]);
  const [mergedPermissions, setMergedPermissions] = useState<string[]>([]);
  const { data, setData, patch, processing, reset, errors } = useForm<{
    name: string;
    email: string;
    role: string|null;
    permissions: string[];
  }>({
    name: user.name,
    email: user.email,
    role: user.roles[0].name,
    permissions: [],
  });

  useEffect(() => {
    const data = user.permissions.map((permission: any) => permission.name);
    setCurrentPermissions(data);
    setData("permissions", data);
  }, []);

  const handleRoleChange = (selected: any) => {
    const selectedRole = selected?.value || "user";
    setData("role", selectedRole);

    const role = roles.find((role: any) => role.name == selectedRole);
    if (role) {
      const currentRolePermissions = role.permissions.map(
        (permission: any) => permission.name
      );

      setMergedPermissions([...currentPermissions, ...currentRolePermissions]);
    }
  };

  const handleSubmit: FormEventHandler = (e: any) => {
    e.preventDefault();

    patch(route("users.update", user?.uuid || 0), {
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
            Users
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

            <FieldGroup label="Email" name="email" error={errors.email}>
              <TextInput
                name="email"
                error={errors.email}
                value={data.email}
                onChange={(e) => setData("email", e.target.value)}
              />
            </FieldGroup>

            <FieldGroup
              label="Role"
              name="role"
              error={errors.role}
            >
              <SelectInput
                name="role"
                error={errors.role}
                defaultValue={{
                  value: data.role || 'user',
                  label: capitalizeFirstLetter(data.role || 'user'),
                }}
                onChange={handleRoleChange}
                options={roles.map((data: any) => {
                  return { value: data.name, label: capitalizeFirstLetter(data.name) };
                })}
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
              Update User
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
        mergedPermissions={mergedPermissions}
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
  <MainLayout title="Update User" children={page} />
);

export default Edit;
