import { PageProps } from '@/types';
import debounce from "lodash.debounce";
import PopOver from '@/Components/PopOver';
import DataTable from "@/Components/DataTable";
import TextInput from "@/Components/TextInput";
import { Link, router } from '@inertiajs/react';
import CustomButton from '@/Components/CustomButton';
import TableHeading from "@/Components/DataTable/Heading";
import ResponsiveHeader from '@/Components/ResponsiveHeader';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { capitalizeFirstLetter, convertDateToLocaleString, convertObjectToString } from '@/utils/parse';

export default function Home({ auth, data, queryParams }: PageProps<{ data: any, queryParams: any }>) {
    queryParams = queryParams || {};

    const searchFieldChanged = (name: string, value: string) => {
        value ? queryParams[name] = value : delete queryParams[name];

        router.get(route('log.model.index'), queryParams);
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

        router.get(route('log.model.index'), queryParams);
    };

    const isQueryParamEmpty = () => {
        return !queryParams || Object.keys(queryParams).length === 0;
    }

    const handleReset = () => {
        // If query params is empty, do nothing
        if (isQueryParamEmpty()) return;

        router.get(route('log.model.index'));
    }

    const handleReload = () => router.get(route('log.model.index'), queryParams);

    const handleNullable = (causer: any, id: number) => {
        if (!causer) return '-';

        let result = causer;

        if (!id) return result;

        return `${result} (${id})`;
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            title="Model Log"
            header={
                <ResponsiveHeader>
                    <Link href={route('log.index')} className='bg-primary-700 lg:py-2 py-1 lg:px-3 px-2 text-white dark:text-gray-800 rounded shadow transition-all dark:bg-white hover:bg-primary-700 dark:hover:bg-white dark:focus:bg-white'>
                        Back
                    </Link>
                </ResponsiveHeader>
            }
        >
            <div className='max-w-[85%] mx-auto'>
                <DataTable
                    links={data.links}
                    search={<>
                        <TextInput
                            type="text"
                            name="search"
                            placeholder="Search"
                            className="mt-4 ms-4 block lg:w-1/4"
                            onChange={debounce((e) => searchFieldChanged('search', e.target.value), 500)}
                        />
                        <div className="flex justify-end">
                            <CustomButton
                                type='button'
                                disabled={isQueryParamEmpty()}
                                className="btn btn-neutral ms-4 mt-4"
                                onClick={handleReset}
                            >
                                Reset
                            </CustomButton>
                            <CustomButton
                                type='button'
                                className="btn btn-neutral ms-4 mt-4"
                                onClick={handleReload}
                            >
                                Reload
                            </CustomButton>
                        </div>
                    </>}
                    header={<>
                        <TableHeading
                            name="id"
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                            sortChanged={sortChanged}
                        >
                            ID
                        </TableHeading>
                        <TableHeading
                            name="event"
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                            sortChanged={sortChanged}
                        >
                            Event
                        </TableHeading>
                        <TableHeading
                            name="subject"
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                            sortChanged={sortChanged}
                        >
                            Subject
                        </TableHeading>
                        <TableHeading
                            name="causer"
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                            sortChanged={sortChanged}
                        >
                            Causer
                        </TableHeading>
                        <TableHeading
                            name="description"
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                            sortChanged={sortChanged}
                        >
                            Description
                        </TableHeading>
                        <TableHeading
                            name="category"
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                            sortChanged={sortChanged}
                        >
                            Properties
                        </TableHeading>
                        <TableHeading
                            name="created_at"
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                            sortChanged={sortChanged}
                        >
                            Created At
                        </TableHeading>
                        <TableHeading
                            name="updated_at"
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                            sortChanged={sortChanged}
                        >
                            Updated At
                        </TableHeading>
                        <th className="px-3 py-2">Actions</th>
                    </>}
                >
                    {data && data.data.map((item: any, index: number) => (
                        <tr key={index}>
                            <td className="px-3 py-2 max-w-[8vw] overflow-hidden">{item.id}</td>
                            <td className="px-3 py-2 max-w-[8vw] overflow-hidden">{capitalizeFirstLetter(item.event)}</td>
                            <td className="px-3 py-2 max-w-[8vw] overflow-hidden">{handleNullable(item.subject_type, item.subject_id)}</td>
                            <td className="px-3 py-2 max-w-[8vw] overflow-hidden">{handleNullable(item.causer_type, item.causer_id)}</td>
                            <td className="px-3 py-2 max-w-[8vw] overflow-hidden">{item.description || '-'}</td>
                            <td className="px-3 py-2 max-w-[8vw] overflow-hidden">{convertObjectToString(item.properties) || '-'}</td>
                            <td className="px-3 py-2 max-w-[8vw] overflow-hidden">{convertDateToLocaleString(item.created_at) || '-'}</td>
                            <td className="px-3 py-2 max-w-[8vw] overflow-hidden">{convertDateToLocaleString(item.updated_at) || '-'}</td>
                            <td className="px-3 py-2 text-nowrap">
                                <PopOver>
                                    <Link
                                        href={route('log.model.show', item.id)}
                                        className="block px-4 py-2 text-sm text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                                    >
                                        <div className='flex flex-row'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="mr-2 h-5 w-5 shrink-0 text-neutral-500 group-hover:text-neutral-600 dark:text-neutral-300 dark:group-hover:text-neutral-100"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"></path><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                            <span className='mt-0.5'>View</span>
                                        </div>
                                    </Link>
                                </PopOver>
                            </td>
                        </tr>
                    ))}
                </DataTable>
            </div>
        </AuthenticatedLayout>
    );
}
