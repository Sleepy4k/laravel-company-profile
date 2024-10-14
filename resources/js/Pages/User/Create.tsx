import { PageProps } from "@/types";
import { Link, useForm } from "@inertiajs/react";
import { FormEventHandler, useState } from "react";
import MainLayout from "@/Layouts/MainLayout";
import LoadingButton from "@/Components/Button/LoadingButton";
import FieldGroup from "@/Components/Form/FieldGroup";
import TextInput from "@/Components/Form/TextInput";
import SelectInput from "@/Components/Form/SelectInput";
import { capitalizeFirstLetter } from "@/utils/parse";
import Permissions from "./partials/Permissions";

function Create({
  roles,
  permissions,
  backUrl,
}: PageProps<{ backUrl: string; roles: any; permissions: any }>) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentPermissions, setCurrentPermissions] = useState<string[]>([]);
  const [mergedPermissions, setMergedPermissions] = useState<string[]>([]);
  const { data, setData, post, processing, reset, errors } = useForm<{
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    role: string | null;
    permissions: string[];
  }>({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    role: null,
    permissions: [],
  });

  const handleSubmit: FormEventHandler = (e: any) => {
    e.preventDefault();

    post(route("users.store"), {
      onSuccess: () => reset(),
    });
  };

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

            <FieldGroup label="Email" name="email" error={errors.email}>
              <TextInput
                name="email"
                error={errors.email}
                value={data.email}
                onChange={(e) => setData("email", e.target.value)}
              />
            </FieldGroup>

            <FieldGroup label="Role" name="role" error={errors.role}>
              <SelectInput
                name="role"
                error={errors.role}
                onChange={handleRoleChange}
                options={roles.map((data: any) => {
                  return {
                    value: data.name,
                    label: capitalizeFirstLetter(data.name),
                  };
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

            <FieldGroup
              label="Password"
              name="password"
              error={errors.password}
            >
              <TextInput
                type="password"
                name="password"
                error={errors.password}
                value={data.password}
                onChange={(e) => setData("password", e.target.value)}
              />
            </FieldGroup>

            <FieldGroup
              label="Password Confirmation"
              name="password_confirmation"
              error={errors.password_confirmation}
            >
              <TextInput
                type="password"
                name="password_confirmation"
                error={errors.password_confirmation}
                value={data.password_confirmation}
                onChange={(e) =>
                  setData("password_confirmation", e.target.value)
                }
              />
            </FieldGroup>
          </div>

          <div className="flex items-center justify-end px-8 py-4 bg-gray-100 border-t border-gray-200">
            <LoadingButton
              loading={processing}
              type="submit"
              className="btn-indigo"
            >
              Create User
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
Create.layout = (page: React.ReactNode) => (
  <MainLayout title="Create User" children={page} />
);

export default Create;
