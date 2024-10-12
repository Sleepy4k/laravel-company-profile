import { PageProps } from "@/types";
import { Link, router } from "@inertiajs/react";
import { useState } from "react";
import MainLayout from "@/Layouts/MainLayout";
import FieldGroup from "@/Components/Form/FieldGroup";
import TextInput from "@/Components/Form/TextInput";
import DeleteButton from "@/Components/Button/DeleteButton";
import Confirmation from "./partials/Confirmation";

type IDeleteData = {
  uuid: any;
  key: string;
  group: string;
};

function Show({ data, backUrl }: PageProps<{ backUrl: string; data: any }>) {
  const [failed, setFailed] = useState(false);
  const [progress, setProgress] = useState(false);
  const [translateDeleteData, setTranslateDeleteData] =
    useState<IDeleteData | null>(null);
  const [confirmingTranslateDeletion, setConfirmingTranslateDeletion] =
    useState(false);

  const deleteTranslate = (data: any) => {
    setConfirmingTranslateDeletion(true);
    setTranslateDeleteData(data);
  };

  const closeModal = () => setConfirmingTranslateDeletion(false);

  const handleDeleteTranslate = (e: any) => {
    e.preventDefault();

    const key = e.target.key.value;

    // check if key is empty
    if (!key) {
      setFailed(true);
      return;
    }

    // Check if key is not same with translate key
    if (key !== `${translateDeleteData?.group}.${translateDeleteData?.key}`) {
      setFailed(true);
      return;
    }

    // Delete translate here
    router.delete(route("translate.destroy", translateDeleteData?.uuid || 0), {
      preserveScroll: true,
      onStart: () => {
        setProgress(true);
      },
      onSuccess: () => {
        closeModal();
      },
      onError: () => {
        closeModal();
        setFailed(true);
      },
      onFinish: () => {
        setProgress(false);
      }
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
            Translate
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
          <FieldGroup label="Group" name="group">
            <TextInput disabled name="group" value={data.group} />
          </FieldGroup>

          <FieldGroup label="Key" name="key">
            <TextInput disabled name="key" value={data.key} />
          </FieldGroup>

          <FieldGroup label="Indonesian" name="lang_id">
            <TextInput disabled name="lang_id" value={data.text.id} />
          </FieldGroup>

          <FieldGroup label="English" name="lang_en">
            <TextInput disabled name="lang_en" value={data.text.en} />
          </FieldGroup>
        </div>

        <div className="flex items-center justify-end px-8 py-4 bg-gray-100 border-t border-gray-200">
          <DeleteButton onDelete={() => deleteTranslate(data)}>
            Delete Translate
          </DeleteButton>
          <Link
            href={route("translate.edit", data.uuid)}
            className="ml-auto btn btn-indigo"
          >
            Edit Translate
          </Link>
        </div>
      </div>

      <Confirmation
        isFailed={failed}
        loadingState={progress}
        confirmingTranslateDeletion={confirmingTranslateDeletion}
        translateDeleteData={translateDeleteData}
        closeModal={closeModal}
        handleDeleteTranslate={handleDeleteTranslate}
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
  <MainLayout title="Show Translate" children={page} />
);

export default Show;
