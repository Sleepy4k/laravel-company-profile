import { PageProps } from '@/types';
import debounce from "lodash.debounce";
import DataTable from "@/Components/DataTable";
import TextInput from "@/Components/TextInput";
import { Link, router } from '@inertiajs/react';
import TableHeading from "@/Components/DataTable/Heading";
import ResponsiveHeader from '@/Components/ResponsiveHeader';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { capitalizeFirstLetter, convertDateToLocaleString } from '@/utils/parse';

export default function Show({ auth, data, queryParams, filename }: PageProps<{ data: any, queryParams: any, filename: string }>) {
    queryParams = queryParams || {};

    console.log(data);


    const searchFieldChanged = (name: string, value: string) => {
        value ? queryParams[name] = value : delete queryParams[name];

        router.get(route('log.system.show', filename), queryParams);
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

        router.get(route('log.system.show', filename), queryParams);
    };

    const isQueryParamEmpty = () => {
        return !queryParams || Object.keys(queryParams).length === 0;
    }

    const handleReset = () => {
        // If query params is empty, do nothing
        if (isQueryParamEmpty()) return;

        router.get(route('log.system.show', filename));
    }

    const handleReload = () => router.get(route('log.system.show', filename), queryParams);

    return (
        <AuthenticatedLayout
            user={auth.user}
            title="System Log"
            header={
                <ResponsiveHeader>
                    <Link href={route('log.system.index')} className='bg-primary-700 lg:py-2 py-1 lg:px-3 px-2 text-white rounded shadow transition-all hover:bg-primary-700'>
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
                            <button
                                type='button'
                                disabled={isQueryParamEmpty()}
                                className="btn btn-neutral ms-4 mt-4"
                                onClick={handleReset}
                            >
                                Reset
                            </button>
                            <button
                                type='button'
                                className="btn btn-neutral ms-4 mt-4"
                                onClick={handleReload}
                            >
                                Reload
                            </button>
                        </div>
                    </>}
                    header={<>
                        <th className="px-3 py-2">ID</th>
                        <TableHeading
                            name="env"
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                            sortChanged={sortChanged}
                        >
                            Env
                        </TableHeading>
                        <TableHeading
                            name="type"
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                            sortChanged={sortChanged}
                        >
                            Type
                        </TableHeading>
                        <TableHeading
                            name="message"
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                            sortChanged={sortChanged}
                        >
                            Message
                        </TableHeading>
                        <TableHeading
                            name="timestamp"
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                            sortChanged={sortChanged}
                        >
                            Logged At
                        </TableHeading>
                    </>}
                >
                    {data && data.data.map((item: any, index: number) => (
                        <tr key={index}>
                            <td className="px-3 py-2 max-w-[8vw] overflow-hidden">{index + 1}</td>
                            <td className="px-3 py-2 max-w-[8vw] overflow-hidden">{capitalizeFirstLetter(item.env)}</td>
                            <td className="px-3 py-2 max-w-[8vw] overflow-hidden">{item.type}</td>
                            <td className="px-3 py-2 max-w-[8vw] overflow-hidden">{item.message}</td>
                            <td className="px-3 py-2 max-w-[8vw] overflow-hidden">{convertDateToLocaleString(item.timestamp) + ' (' + item.timestamp.split(' ')[1] + ')'}</td>
                        </tr>
                    ))}
                </DataTable>
            </div>
        </AuthenticatedLayout>
    );
}
