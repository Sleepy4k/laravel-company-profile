import { PageProps } from "@/types";
import { Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import MainLayout from "@/Layouts/MainLayout";
import LoadingButton from "@/Components/Button/LoadingButton";
import FieldGroup from "@/Components/Form/FieldGroup";
import TextInput from "@/Components/Form/TextInput";
import SelectInput from "@/Components/Form/SelectInput";

type GuardNameProp = {
  value: string;
  label: string;
};

function Create({
  guardList,
  defaultGuard,
  backUrl,
}: PageProps<{
  guardList: GuardNameProp[];
  defaultGuard: GuardNameProp;
  backUrl: string;
}>) {
  const { data, setData, post, processing, reset, errors } = useForm({
    name: "",
    guard_name: defaultGuard.value,
  });

  const handleSubmit: FormEventHandler = (e: any) => {
    e.preventDefault();

    post(route("rbac.permissions.store"), {
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
          <span className="font-medium text-indigo-600"> /</span> Create
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
                defaultValue={defaultGuard}
                options={guardList}
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
              Create Permission
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
Create.layout = (page: React.ReactNode) => (
  <MainLayout title="Create Permission" children={page} />
);

export default Create;
