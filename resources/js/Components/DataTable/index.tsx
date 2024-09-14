import Pagination from './Pagination';
import { PropsWithChildren } from 'react';

export default function DataTable({
    links,
    header,
    search,
    children,
}: PropsWithChildren<{ links: any, header: any, search?: any, addon_header?: any, children: any }>) {
    const THeadBox = () => (
        <thead className="text-xs text-gray-700 dark:text-white uppercase bg-gray-50 dark:bg-gray-900 border-b-2 border-gray-500">
            <tr className="text-nowrap">
                {header}
            </tr>
        </thead>
    );

    return (
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            {search && <div className="flex justify-start">
                {search}
            </div>}
            <div className="p-6 text-gray-900">
                <div className="overflow-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        {header && <THeadBox />}
                        <tbody>
                            {children}
                        </tbody>
                        {header && <THeadBox />}
                    </table>
                </div>
                <Pagination links={links} />
            </div>
        </div>
    )
}
