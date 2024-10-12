import { PageProps } from "@/types";
import { Link } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import FieldGroup from "@/Components/Form/FieldGroup";
import TextInput from "@/Components/Form/TextInput";
import {
  capitalizeFirstLetter,
  convertDateToLocaleString,
  convertObjectToString,
  makeRowsFromContent,
} from "@/utils/parse";
import TextArea from "@/Components/Form/TextArea";
import DataCard from "@/Components/DataCard/DataCard";

function Show({ data, backUrl }: PageProps<{ backUrl: string; data: any }>) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6 lg:flex-row flex-col">
        <h1 className="mb-8 text-3xl font-bold">
          <Link
            href={backUrl}
            className="text-indigo-600 hover:text-indigo-700"
          >
            Auth
          </Link>
          <span className="font-medium text-indigo-600"> /</span> Show
        </h1>

        <div className="flex items-center lg:gap-5 gap-1 lg:flex-row flex-col">
          <Link href={backUrl} className="btn btn-indigo focus:outline-none">
            Back
          </Link>
        </div>
      </div>

      <DataCard>
        <DataCard.Box>
          <>
            <FieldGroup label="Event" name="event">
              <TextInput
                disabled
                name="event"
                value={capitalizeFirstLetter(data.event)}
              />
            </FieldGroup>

            <FieldGroup label="Description" name="description">
              <TextInput disabled name="description" value={data.description} />
            </FieldGroup>

            <FieldGroup label="Properties" name="properties">
              <TextArea
                disabled
                name="properties"
                rows={makeRowsFromContent(data.properties)}
                value={convertObjectToString(data.properties)}
              />
            </FieldGroup>
          </>
        </DataCard.Box>
        <DataCard.Box>
          <>
            <FieldGroup label="Causer Type" name="causer_type">
              <TextInput
                disabled
                name="causer_type"
                value={data.causer_type || "-"}
              />
            </FieldGroup>

            <FieldGroup label="Causer ID" name="causer_id">
              <TextInput
                disabled
                name="causer_id"
                value={data.causer_id || "-"}
              />
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
          </>
        </DataCard.Box>
      </DataCard>
    </div>
  );
}

/**
 * Persistent Layout (Inertia.js)
 *
 * [Learn more](https://inertiajs.com/pages#persistent-layouts)
 */
Show.layout = (page: React.ReactNode) => (
  <MainLayout title="Show Authenticated Log" children={page} />
);

export default Show;
