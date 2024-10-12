import { PageProps } from "@/types";
import { Link, router } from "@inertiajs/react";
import { useState } from "react";
import MainLayout from "@/Layouts/MainLayout";
import FieldGroup from "@/Components/Form/FieldGroup";
import TextInput from "@/Components/Form/TextInput";
import DeleteButton from "@/Components/Button/DeleteButton";
import Confirmation from "./partials/Confirmation";
import {
  capitalizeFirstLetter,
  convertDateToLocaleString,
} from "@/utils/parse";

type IDeleteData = {
  uuid: any;
  name: string;
};

function Show({ data, backUrl }: PageProps<{ backUrl: string; data: any }>) {
  const [failed, setFailed] = useState(false);
  const [permissionDeleteData, setPermissionDeleteData] =
    useState<IDeleteData | null>(null);
  const [confirmingPermissionDeletion, setConfirmingPermissionDeletion] =
    useState(false);

  const deletePermission = (data: any) => {
    setConfirmingPermissionDeletion(true);
    setPermissionDeleteData(data);
  };

  const closeModal = () => setConfirmingPermissionDeletion(false);

  const handleDeletePermission = (e: any) => {
    e.preventDefault();

    const name = e.target.name.value;

    // check if name is empty
    if (!name) {
      setFailed(true);
      return;
    }

    // Check if name is not same with permission name
    if (name !== permissionDeleteData?.name) {
      setFailed(true);
      return;
    }

    // Delete permission here
    router.delete(
      route("rbac.permissions.destroy", permissionDeleteData?.uuid || 0),
      {
        preserveScroll: true,
        onSuccess: () => {
          closeModal();
        },
        onError: () => {
          closeModal();
          setFailed(true);
        },
      }
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6 lg:flex-row flex-col">
        <h1 className="mb-8 text-3xl font-bold">
          <Link
            href={backUrl}
            className="text-indigo-600 hover:text-indigo-700"
          >
            Permission
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
          <DeleteButton onDelete={() => deletePermission(data)}>
            Delete Permission
          </DeleteButton>
          <Link
            href={route("rbac.permissions.edit", data.uuid)}
            className="ml-auto btn btn-indigo"
          >
            Edit Permission
          </Link>
        </div>
      </div>

      <Confirmation
        isFailed={failed}
        loadingState={false}
        confirmingPermissionDeletion={confirmingPermissionDeletion}
        permissionDeleteData={permissionDeleteData}
        closeModal={closeModal}
        handleDeletePermission={handleDeletePermission}
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
  <MainLayout title="Show Permission" children={page} />
);

export default Show;
