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
  email: string;
};

function Show({
  data,
  permissions,
  backUrl,
}: PageProps<{ backUrl: string; permissions: any; data: any }>) {
  const [failed, setFailed] = useState(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentPermissions, setCurrentPermissions] = useState<string[]>([]);
  const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
  const [userDeleteData, setUserDeleteData] = useState<IDeleteData | null>(
    null
  );

  const deleteUser = (data: any) => {
    setConfirmingUserDeletion(true);
    setUserDeleteData(data);
  };

  const closeModal = () => {
    setShowModal(false);
    setConfirmingUserDeletion(false);
  }

  const handleDeleteUser = (e: any) => {
    e.preventDefault();

    const email = e.target.email.value;

    // check if email is empty
    if (!email) {
      setFailed(true);
      return;
    }

    // Check if email is not same with user email
    if (email !== userDeleteData?.email) {
      setFailed(true);
      return;
    }

    // Delete user here
    router.delete(route("users.destroy", userDeleteData?.uuid || 0), {
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
            Users
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

          <FieldGroup label="Email" name="email">
            <TextInput disabled name="email" value={data.email} />
          </FieldGroup>

          <FieldGroup label="Role" name="role">
            <TextInput disabled name="role" value={capitalizeFirstLetter(data.roles[0].name) || 'User'} />
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
          <DeleteButton onDelete={() => deleteUser(data)}>
            Delete User
          </DeleteButton>
          <Link
            href={route("users.edit", data.uuid)}
            className="ml-auto btn btn-indigo"
          >
            Edit User
          </Link>
        </div>
      </div>

      <Confirmation
        isFailed={failed}
        loadingState={false}
        confirmingUserDeletion={confirmingUserDeletion}
        userDeleteData={userDeleteData}
        closeModal={closeModal}
        handleDeleteUser={handleDeleteUser}
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
  <MainLayout title="Show User" children={page} />
);

export default Show;
