import { PageProps } from "@/types";
import { Link, router } from "@inertiajs/react";
import { useEffect, useState } from "react";
import MainLayout from "@/Layouts/MainLayout";
import FieldGroup from "@/Components/Form/FieldGroup";
import TextInput from "@/Components/Form/TextInput";
import DeleteButton from "@/Components/Button/DeleteButton";
import Confirmation from "./partials/Confirmation";
import {
  capitalizeFirstLetter,
  convertDateToLocaleString,
} from "@/utils/parse";
import Permissions from "./partials/Permissions";
import LoadingButton from "@/Components/Button/LoadingButton";

type IDeleteData = {
  uuid: any;
  name: string;
};

function Show({
  data,
  permissions,
  backUrl,
}: PageProps<{ backUrl: string; permissions: any; data: any }>) {
  const [failed, setFailed] = useState(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentPermissions, setCurrentPermissions] = useState<string[]>([]);
  const [confirmingRoleDeletion, setConfirmingRoleDeletion] = useState(false);
  const [roleDeleteData, setRoleDeleteData] = useState<IDeleteData | null>(
    null
  );

  const deleteRole = (data: any) => {
    setConfirmingRoleDeletion(true);
    setRoleDeleteData(data);
  };

  const closeModal = () => {
    setShowModal(false);
    setConfirmingRoleDeletion(false);
  }

  const handleDeleteRole = (e: any) => {
    e.preventDefault();

    const name = e.target.name.value;

    // check if name is empty
    if (!name) {
      setFailed(true);
      return;
    }

    // Check if name is not same with role name
    if (name !== roleDeleteData?.name) {
      setFailed(true);
      return;
    }

    // Delete role here
    router.delete(route("rbac.roles.destroy", roleDeleteData?.uuid || 0), {
      preserveScroll: true,
      onSuccess: () => {
        closeModal();
      },
      onError: () => {
        closeModal();
        setFailed(true);
      },
    });
  };

  useEffect(() => {
    const filteredData = data.permissions.map((permission: any) => permission.name);
    setCurrentPermissions(filteredData);
  }, []);

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
          <span className="font-medium text-indigo-600"> /</span> Show
        </h1>
        <div className="flex items-center lg:gap-5 gap-1 lg:flex-row flex-col">
          <Link href={backUrl} className="btn btn-indigo focus:outline-none">
            Back
          </Link>
        </div>
      </div>
      <div className="max-w-3xl overflow-hidden bg-white rounded shadow">
        <div className="grid gap-8 p-8 lg:grid-cols-1">
          <FieldGroup label="ID" name="id">
            <TextInput disabled name="id" value={data.id} />
          </FieldGroup>

          <FieldGroup label="Name" name="name">
            <TextInput disabled name="name" value={data.name} />
          </FieldGroup>

          <FieldGroup label="Guard Name" name="guard_name">
            <TextInput
              disabled
              name="guard_name"
              value={capitalizeFirstLetter(data.guard_name)}
            />
          </FieldGroup>

          <FieldGroup
              label="Permissions"
              name="permissions"
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

          <FieldGroup label="Created At" name="created_at">
            <TextInput
              disabled
              name="created_at"
              value={convertDateToLocaleString(data.created_at)}
            />
          </FieldGroup>

          <FieldGroup label="Updated At" name="updated_at">
            <TextInput
              disabled
              name="updated_at"
              value={convertDateToLocaleString(data.updated_at)}
            />
          </FieldGroup>
        </div>

        <div className="flex items-center px-8 py-4 bg-gray-100 border-t border-gray-200">
          <DeleteButton onDelete={() => deleteRole(data)}>
            Delete Role
          </DeleteButton>
          <Link
            href={route("rbac.roles.edit", data.uuid)}
            className="ml-auto btn btn-indigo"
          >
            Edit Role
          </Link>
        </div>
      </div>

      <Confirmation
        isFailed={failed}
        loadingState={false}
        confirmingRoleDeletion={confirmingRoleDeletion}
        roleDeleteData={roleDeleteData}
        closeModal={closeModal}
        handleDeleteRole={handleDeleteRole}
      />
      <Permissions
        isDisabled
        showModal={showModal}
        closeModal={closeModal}
        permissions={permissions}
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
Show.layout = (page: React.ReactNode) => (
  <MainLayout title="Show Role" children={page} />
);

export default Show;
