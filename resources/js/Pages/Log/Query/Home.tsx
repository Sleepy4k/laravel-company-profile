import { PageProps } from "@/types";
import trans from "@/utils/translate";
import debounce from "lodash.debounce";
import PopOver from "@/Components/PopOver";
import DataTable from "@/Components/DataTable";
import TextInput from "@/Components/TextInput";
import { Link, router } from "@inertiajs/react";
import CustomButton from "@/Components/CustomButton";
import TableHeading from "@/Components/DataTable/Heading";
import ResponsiveHeader from "@/Components/ResponsiveHeader";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
    capitalizeFirstLetter,
    convertDateToLocaleString,
} from "@/utils/parse";

export default function Home({
    data,
    queryParams,
}: PageProps<{ data: any; queryParams: any }>) {
    queryParams = queryParams || {};

    const searchFieldChanged = (name: string, value: string) => {
        value ? (queryParams[name] = value) : delete queryParams[name];

        router.get(route("log.query.index"), queryParams);
    };

    const sortChanged = (name: string) => {
        if (name === queryParams.sort_field) {
            if (queryParams.sort_direction == "asc") {
                queryParams.sort_direction = "desc";
            } else {
                queryParams.sort_direction = "asc";
            }
        } else {
            queryParams.sort_field = name;
            queryParams.sort_direction = "asc";
        }

        router.get(route("log.query.index"), queryParams);
    };

    const isQueryParamEmpty = () => {
        return !queryParams || Object.keys(queryParams).length === 0;
    };

    const handleReset = () => {
        // If query params is empty, do nothing
        if (isQueryParamEmpty()) return;

        router.get(route("log.query.index"));
    };

    const handleReload = () =>
        router.get(route("log.query.index"), queryParams);

    const convertNameToRoute = (name: string) => {
        // so we had file name like "laravel-2024-09-08.log"
        // we need to convert it to "2024-09-08"
        return name.split("-").slice(1).join("-").split(".")[0];
    };

    return (
        <AuthenticatedLayout
            title={trans("page.log.query.title", "Query Log")}
            header={
                <ResponsiveHeader>
                    <Link
                        href={route("log.index")}
                        className="bg-primary-700 lg:py-2 py-1 lg:px-3 px-2 text-white dark:text-gray-800 rounded shadow transition-all dark:bg-white hover:bg-primary-700 dark:hover:bg-white dark:focus:bg-white"
                    >
                        {trans("form.button.back", "Back")}
                    </Link>
                </ResponsiveHeader>
            }
        >
            <div className="max-w-[85%] mx-auto">
                <DataTable
                    links={data.links}
                    search={
                        <>
                            <TextInput
                                type="text"
                                name="search"
                                placeholder={trans("table.search")}
                                className="mt-4 ms-4 block lg:w-1/4"
                                onChange={debounce(
                                    (e) =>
                                        searchFieldChanged(
                                            "search",
                                            e.target.value
                                        ),
                                    500
                                )}
                            />
                            <div className="flex justify-end">
                                <CustomButton
                                    type="button"
                                    disabled={isQueryParamEmpty()}
                                    className="btn btn-neutral ms-4 mt-4"
                                    onClick={handleReset}
                                >
                                    {trans("form.button.reset", "Reset")}
                                </CustomButton>
                                <CustomButton
                                    type="button"
                                    className="btn btn-neutral ms-4 mt-4"
                                    onClick={handleReload}
                                >
                                    {trans("form.button.reload", "Reload")}
                                </CustomButton>
                            </div>
                        </>
                    }
                    header={
                        <>
                            <th className="px-3 py-2">
                                {trans("page.log.query.field.id", "ID")}
                            </th>
                            <TableHeading
                                name="name"
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                                sortChanged={sortChanged}
                            >
                                {trans(
                                    "page.log.query.field.file_name",
                                    "File Name"
                                )}
                            </TableHeading>
                            <TableHeading
                                name="type"
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                                sortChanged={sortChanged}
                            >
                                {trans(
                                    "page.log.query.field.file_type",
                                    "File Type"
                                )}
                            </TableHeading>
                            <TableHeading
                                name="content"
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                                sortChanged={sortChanged}
                            >
                                {trans(
                                    "page.log.query.field.content_type",
                                    "Content Type"
                                )}
                            </TableHeading>
                            <TableHeading
                                name="size"
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                                sortChanged={sortChanged}
                            >
                                {trans(
                                    "page.log.query.field.file_size",
                                    "File Size"
                                )}
                            </TableHeading>
                            <TableHeading
                                name="last_updated"
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                                sortChanged={sortChanged}
                            >
                                {trans(
                                    "page.log.query.field.last_modified_at",
                                    "Last Modified At"
                                )}
                            </TableHeading>
                            <th className="px-3 py-2">
                                {trans("table.actions", "Actions")}
                            </th>
                        </>
                    }
                >
                    {data &&
                        data.data.map((item: any, index: number) => (
                            <tr key={index}>
                                <td className="px-3 py-2 max-w-[8vw] overflow-hidden">
                                    {index + 1}
                                </td>
                                <td className="px-3 py-2 max-w-[8vw] overflow-hidden">
                                    {capitalizeFirstLetter(item.name)}
                                </td>
                                <td className="px-3 py-2 max-w-[8vw] overflow-hidden">
                                    {capitalizeFirstLetter(item.type)}
                                </td>
                                <td className="px-3 py-2 max-w-[8vw] overflow-hidden">
                                    {item.content}
                                </td>
                                <td className="px-3 py-2 max-w-[8vw] overflow-hidden">
                                    {item.size}
                                </td>
                                <td className="px-3 py-2 max-w-[8vw] overflow-hidden">
                                    {convertDateToLocaleString(
                                        item.last_updated
                                    )}
                                </td>
                                <td className="px-3 py-2 text-nowrap">
                                    <PopOver>
                                        <Link
                                            href={route(
                                                "log.query.show",
                                                convertNameToRoute(item.name)
                                            )}
                                            className="block px-4 py-2 text-sm text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                                        >
                                            <div className="flex flex-row">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                    aria-hidden="true"
                                                    className="mr-2 h-5 w-5 shrink-0 text-neutral-500 group-hover:text-neutral-600 dark:text-neutral-300 dark:group-hover:text-neutral-100"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                                    ></path>
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                    ></path>
                                                </svg>
                                                <span className="mt-0.5">
                                                    {trans(
                                                        "popover.view",
                                                        "View"
                                                    )}
                                                </span>
                                            </div>
                                        </Link>
                                    </PopOver>
                                </td>
                            </tr>
                        ))}

                    {data && data.data.length === 0 && (
                        <tr>
                            <td colSpan={8} className="text-center py-4">
                                {trans("table.empty.table")}
                            </td>
                        </tr>
                    )}
                </DataTable>
            </div>
        </AuthenticatedLayout>
    );
}
