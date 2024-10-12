import { PageProps } from "@/types";
import { Link, useForm } from "@inertiajs/react";
import { FormEventHandler, useEffect, useState } from "react";
import MainLayout from "@/Layouts/MainLayout";
import LoadingButton from "@/Components/Button/LoadingButton";
import FieldGroup from "@/Components/Form/FieldGroup";
import TextInput from "@/Components/Form/TextInput";
import SelectInput from "@/Components/Form/SelectInput";
import FileInput from "@/Components/Form/FileInput";

function Edit({
  setting,
  types,
  backUrl,
}: PageProps<{ backUrl: string; setting: any; types: any }>) {
  const [isFile, setIsFile] = useState(false);
  const [file, setFile] = useState<string | null>(null);
  const { data, setData, post, processing, reset, errors } = useForm({
    _method: "PUT",
    key: setting.key,
    display: setting.display,
    value: setting.value,
    description: setting.description,
    type_id: setting.type_id as number,
    file: null,
  });

  useEffect(() => {
    if (setting.type.category === "file") {
      setIsFile(true);
    }
  }, []);

  useEffect(() => {
    if (file !== null) setFile(null);

    for (let i = 0; i < types.length; i++) {
      if (types[i].id === data.type_id) {
        setIsFile(types[i].category === "file");
        break;
      }
    }
  }, [data.type_id]);

  const handleSubmit: FormEventHandler = (e: any) => {
    e.preventDefault();

    post(route("application.update", setting?.uuid || 0), {
      onSuccess: () => reset(),
    });
  };

  const handleFileChange = (e: any) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setData("file", selectedFile);
      setFile(URL.createObjectURL(selectedFile));
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
            Settings
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
            <FieldGroup label="Key" name="key" error={errors.key}>
              <TextInput
                name="key"
                error={errors.key}
                value={data.key}
                onChange={(e) => setData("key", e.target.value)}
              />
            </FieldGroup>

            <FieldGroup label="Display" name="display" error={errors.display}>
              <TextInput
                name="display"
                error={errors.display}
                value={data.display}
                onChange={(e) => setData("display", e.target.value)}
              />
            </FieldGroup>

            <FieldGroup label="Type" name="type_id" error={errors.type_id}>
              <SelectInput
                name="type_id"
                error={errors.type_id}
                defaultValue={{ value: data.type_id, label: setting.type.name }}
                onChange={(selected: any) =>
                  setData("type_id", parseInt(selected?.value, 10))
                }
                options={types.map((data: any) => {
                  return { value: data.id, label: data.name };
                })}
              />
            </FieldGroup>

            {isFile ? (
              <FieldGroup label="File" name="file" error={errors.file}>
                <FileInput
                  accept=".png, .jpg, .jpeg"
                  onChange={handleFileChange}
                />
              </FieldGroup>
            ) : (
              <FieldGroup label="Value" name="value" error={errors.value}>
                <TextInput
                  name="value"
                  error={errors.value}
                  value={data.value}
                  onChange={(e) => setData("value", e.target.value)}
                />
              </FieldGroup>
            )}

            <FieldGroup
              label="Description"
              name="description"
              error={errors.description}
            >
              <TextInput
                name="description"
                error={errors.description}
                value={data.description}
                onChange={(e) => setData("description", e.target.value)}
              />
            </FieldGroup>
          </div>

          <div className="flex items-center justify-end px-8 py-4 bg-gray-100 border-t border-gray-200">
            <LoadingButton
              loading={processing}
              type="submit"
              className="btn-indigo"
            >
              Update Setting
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
  <MainLayout title="Update Setting" children={page} />
);

export default Edit;
