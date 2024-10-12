import { PageProps } from "@/types";
import { Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import MainLayout from "@/Layouts/MainLayout";
import LoadingButton from "@/Components/Button/LoadingButton";
import FieldGroup from "@/Components/Form/FieldGroup";
import TextInput from "@/Components/Form/TextInput";
import SelectInput from "@/Components/Form/SelectInput";
import { capitalizeFirstLetter } from "@/utils/parse";

type GuardNameProp = {
  value: string;
  label: string;
};

function Edit({
  permission,
  guardList,
  backUrl,
}: PageProps<{
  permission: any;
  guardList: GuardNameProp[];
  backUrl: string;
}>) {
  const { data, setData, patch, processing, reset, errors } = useForm({
    name: permission.name,
    guard_name: permission.guard_name,
  });

  const handleSubmit: FormEventHandler = (e: any) => {
    e.preventDefault();

    patch(route("rbac.permissions.update", permission?.uuid || 0), {
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
            Permission
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
              label="Display"
              name="guard_name"
              error={errors.guard_name}
            >
              <SelectInput
                name="guard_name"
                error={errors.guard_name}
                options={guardList}
                defaultValue={{
                  value: data.guard_name,
                  label: capitalizeFirstLetter(data.guard_name),
                }}
                onChange={(selected: any) =>
                  setData("guard_name", selected?.value)
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
              Update Permission
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
  <MainLayout title="Update Permission" children={page} />
);

export default Edit;
