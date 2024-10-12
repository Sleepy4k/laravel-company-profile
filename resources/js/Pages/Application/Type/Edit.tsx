import { PageProps } from "@/types";
import { Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import MainLayout from "@/Layouts/MainLayout";
import LoadingButton from "@/Components/Button/LoadingButton";
import FieldGroup from "@/Components/Form/FieldGroup";
import TextInput from "@/Components/Form/TextInput";
import SelectInput from "@/Components/Form/SelectInput";
import { capitalizeFirstLetter } from "@/utils/parse";

function Edit({
  setting,
  categories,
  backUrl,
}: PageProps<{ backUrl: string, setting: any; categories: any }>) {
  const { data, setData, patch, processing, reset, errors } = useForm({
    name: setting.name,
    description: setting.description,
    category: setting.category,
  });

  const handleSubmit: FormEventHandler = (e: any) => {
    e.preventDefault();

    patch(route("application.type.update", setting?.uuid || 0), {
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
            Types
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

            <FieldGroup
              label="Description"
              name="description"
              error={errors.description}
            >
              <TextInput
                name="Description"
                error={errors.description}
                value={data.description}
                onChange={(e) => setData("description", e.target.value)}
              />
            </FieldGroup>

            <FieldGroup
              label="Category"
              name="category"
              error={errors.category}
            >
              <SelectInput
                name="category"
                error={errors.category}
                defaultValue={{ value: data.category, label: capitalizeFirstLetter(data.category) }}
                onChange={(selected: any) => setData("category", selected?.value)}
                options={categories.map((data: any) => {
                  return { value: data, label: capitalizeFirstLetter(data) };
                })}
              />
            </FieldGroup>
          </div>

          <div className="flex items-center justify-end px-8 py-4 bg-gray-100 border-t border-gray-200">
            <LoadingButton
              loading={processing}
              type="submit"
              className="btn-indigo"
            >
              Update Setting Type
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
  <MainLayout title="Update Setting Type" children={page} />
);

export default Edit;
