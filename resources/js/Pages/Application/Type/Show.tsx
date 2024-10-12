import { PageProps } from "@/types";
import { Link, router } from "@inertiajs/react";
import { useState } from "react";
import MainLayout from "@/Layouts/MainLayout";
import FieldGroup from "@/Components/Form/FieldGroup";
import TextInput from "@/Components/Form/TextInput";
import DeleteButton from "@/Components/Button/DeleteButton";
import { capitalizeFirstLetter } from "@/utils/parse";
import Confirmation from "./partials/Confirmation";

type IDeleteData = {
  uuid: any;
  key: string;
  name: string;
};

function Show({ data, backUrl }: PageProps<{ backUrl: string; data: any }>) {
  const [failed, setFailed] = useState(false);
  const [settingDeleteData, setSettingDeleteData] =
    useState<IDeleteData | null>(null);
  const [confirmingSettingDeletion, setConfirmingSettingDeletion] =
    useState(false);
  const deleteSetting = (data: any) => {
    setConfirmingSettingDeletion(true);
    setSettingDeleteData(data);
  };

  const closeModal = () => setConfirmingSettingDeletion(false);

  const handleDeleteSetting = (e: any) => {
    e.preventDefault();

    const name = e.target.name.value;

    // check if name is empty
    if (!name) {
      setFailed(true);
      return;
    }

    // Check if name is not same with setting type name
    if (name !== settingDeleteData?.name) {
      setFailed(true);
      return;
    }

    // Delete setting here
    router.delete(
      route("application.type.destroy", settingDeleteData?.uuid || 0),
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
            Types
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
          <FieldGroup label="Name" name="name">
            <TextInput disabled name="name" value={data.name} />
          </FieldGroup>

          <FieldGroup label="Description" name="description">
            <TextInput disabled name="description" value={data.description} />
          </FieldGroup>

          <FieldGroup label="Category" name="category">
            <TextInput
              disabled
              name="category"
              value={capitalizeFirstLetter(data.category)}
            />
          </FieldGroup>
        </div>

        <div className="flex items-center justify-end px-8 py-4 bg-gray-100 border-t border-gray-200">
          <DeleteButton onDelete={() => deleteSetting(data)}>
            Delete Setting Type
          </DeleteButton>
          <Link
            href={route("application.type.edit", data.uuid)}
            className="ml-auto btn btn-indigo"
          >
            Edit Setting Type
          </Link>
        </div>
      </div>

      <Confirmation
        isFailed={failed}
        loadingState={false}
        confirmingSettingDeletion={confirmingSettingDeletion}
        settingDeleteData={settingDeleteData}
        closeModal={closeModal}
        handleDeleteSetting={handleDeleteSetting}
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
  <MainLayout title="Show Setting Type" children={page} />
);

export default Show;
