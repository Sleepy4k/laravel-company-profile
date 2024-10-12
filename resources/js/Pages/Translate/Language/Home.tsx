import { PageProps } from "@/types";
import { Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import MainLayout from "@/Layouts/MainLayout";
import LoadingButton from "@/Components/Button/LoadingButton";
import FieldGroup from "@/Components/Form/FieldGroup";
import SelectInput from "@/Components/Form/SelectInput";

function Home({
  translate,
  backUrl,
}: PageProps<{ backUrl: string; translate: any }>) {
  const { data, setData, post, processing, errors } = useForm({
    lang: translate.lang,
  });

  const handleSubmit: FormEventHandler = (e: any) => {
    e.preventDefault();

    post(route("translate.language.store"), {
      onSuccess: () => location.reload(),
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
            Language
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
            <FieldGroup label="Language" name="lang" error={errors.lang}>
              <SelectInput
                name="lang"
                error={errors.lang}
                defaultValue={{
                  value: data.lang,
                  label: data.lang == "en" ? "English" : "Indonesian",
                }}
                onChange={(selected: any) => setData("lang", selected?.value)}
                options={[
                  { value: "en", label: "English" },
                  { value: "id", label: "Indonesian" },
                ]}
              />
            </FieldGroup>
          </div>

          <div className="flex items-center justify-end px-8 py-4 bg-gray-100 border-t border-gray-200">
            <LoadingButton
              loading={processing}
              type="submit"
              className="btn-indigo"
            >
              Change Language
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
Home.layout = (page: React.ReactNode) => (
  <MainLayout title="Change Language" children={page} />
);

export default Home;
