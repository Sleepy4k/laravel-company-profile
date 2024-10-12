import { PageProps } from "@/types";
import { Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import MainLayout from "@/Layouts/MainLayout";
import LoadingButton from "@/Components/Button/LoadingButton";
import FieldGroup from "@/Components/Form/FieldGroup";
import TextInput from "@/Components/Form/TextInput";

function Edit({
  translate,
  backUrl,
}: PageProps<{ backUrl: string; translate: any }>) {
  const { data, setData, patch, processing, reset, errors } = useForm({
    key: translate.key,
    group: translate.group,
    lang_id: translate.text.id,
    lang_en: translate.text.en,
  });

  const handleSubmit: FormEventHandler = (e: any) => {
    e.preventDefault();

    patch(route("translate.update", translate?.uuid || 0), {
      onSuccess: () => reset(),
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
            <FieldGroup label="Group" name="group" error={errors.group}>
              <TextInput
                name="group"
                error={errors.group}
                value={data.group}
                onChange={(e) => setData("group", e.target.value)}
              />
            </FieldGroup>

            <FieldGroup label="Key" name="key" error={errors.key}>
              <TextInput
                name="key"
                error={errors.key}
                value={data.key}
                onChange={(e) => setData("key", e.target.value)}
              />
            </FieldGroup>

            <FieldGroup
              label="Indonesian"
              name="lang_id"
              error={errors.lang_id}
            >
              <TextInput
                name="lang_id"
                error={errors.lang_id}
                value={data.lang_id}
                onChange={(e) => setData("lang_id", e.target.value)}
              />
            </FieldGroup>

            <FieldGroup label="English" name="lang_en" error={errors.lang_en}>
              <TextInput
                name="lang_en"
                error={errors.lang_en}
                value={data.lang_en}
                onChange={(e) => setData("lang_en", e.target.value)}
              />
            </FieldGroup>
          </div>

          <div className="flex items-center justify-end px-8 py-4 bg-gray-100 border-t border-gray-200">
            <LoadingButton
              loading={processing}
              type="submit"
              className="btn-indigo"
            >
              Update Translate
            </LoadingButton>
          </div>
        </form>
      </div>
    </div>
  );
}

/**
 * Persistent Layout (Inertia.js)
 *
 * [Learn more](https://inertiajs.com/pages#persistent-layouts)
 */
Edit.layout = (page: React.ReactNode) => (
  <MainLayout title="Update Translate" children={page} />
);

export default Edit;
