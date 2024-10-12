import { PageProps } from "@/types";
import { Link, router } from "@inertiajs/react";
import { useEffect, useState } from "react";
import MainLayout from "@/Layouts/MainLayout";
import FieldGroup from "@/Components/Form/FieldGroup";
import TextInput from "@/Components/Form/TextInput";
import DeleteButton from "@/Components/Button/DeleteButton";
import Confirmation from "./partials/Confirmation";

type IDeleteData = {
  uuid: any;
  key: string;
  name: string;
};

function Show({ data, backUrl }: PageProps<{ backUrl: string, data: any }>) {
  const [isFile, setIsFile] = useState(false);
  const [failed, setFailed] = useState(false);
  const [settingDeleteData, setSettingDeleteData] =
    useState<IDeleteData | null>(null);
  const [confirmingSettingDeletion, setConfirmingSettingDeletion] =
    useState(false);

  useEffect(() => {
    if (data.type.category === "file") {
      setIsFile(true);
    }
  }, []);

  const deleteSetting = (data: any) => {
    setConfirmingSettingDeletion(true);
    setSettingDeleteData(data);
  };

  const closeModal = () => setConfirmingSettingDeletion(false);

  const handleDeleteSetting = (e: any) => {
    e.preventDefault();

    const key = e.target.key.value;

    // check if key is empty
    if (!key) {
      setFailed(true);
      return;
    }

    // Check if key is not same with setting key
    if (key !== settingDeleteData?.key) {
      setFailed(true);
      return;
    }

    // Delete setting here
    router.delete(route("application.destroy", settingDeleteData?.uuid || 0), {
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

  return (
    <div>
      <div className="flex items-center justify-between mb-6 lg:flex-row flex-col">
        <h1 className="mb-8 text-3xl font-bold">
          <Link
            href={backUrl}
            className="text-indigo-600 hover:text-indigo-700"
          >
            Settings
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
          <FieldGroup label="Key" name="key">
            <TextInput disabled name="key" value={data.key} />
          </FieldGroup>

          <FieldGroup label="Display" name="display">
            <TextInput disabled name="display" value={data.display} />
          </FieldGroup>

          <FieldGroup label="Type" name="type_id">
            <TextInput disabled name="type_id" value={data.type.name} />
          </FieldGroup>

          {isFile ? (
            <FieldGroup label="File" name="file">
              <div className="flex items-center space-x-2">
                <label
                  htmlFor="file"
                  className="flex items-center justify-center w-32 h-32 border border-gray-300 rounded cursor-pointer"
                >
                  <img
                    src={data.value}
                    alt="file"
                    className="max-w-full max-h-full"
                  />
                </label>
              </div>
            </FieldGroup>
          ) : (
            <FieldGroup label="Value" name="value">
              <TextInput disabled name="value" value={data.value} />
            </FieldGroup>
          )}

          <FieldGroup label="Description" name="description">
            <TextInput disabled name="description" value={data.description} />
          </FieldGroup>
        </div>

        <div className="flex items-center px-8 py-4 bg-gray-100 border-t border-gray-200">
          <DeleteButton onDelete={() => deleteSetting(data)}>
            Delete Setting
          </DeleteButton>
          <Link
            href={route("application.edit", data.uuid)}
            className="ml-auto btn btn-indigo"
          >
            Edit Setting
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
  <MainLayout title="Show Setting" children={page} />
);

export default Show;
