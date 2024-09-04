import Pagination from './Pagination';
import { PropsWithChildren } from 'react';

export default function DataTable({
    links,
    header,
    search,
    children,
}: PropsWithChildren<{ links: any, header: any, search?: any, addon_header?: any, children: any }>) {
    return (
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            {search && (
                <>
                    <div className="flex justify-start">
                        {search}
                    </div>
                </>
            )}
            <div className="p-6 text-gray-900">
                <div className="overflow-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                        {header && (
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b-2 border-gray-500">
                                <tr className="text-nowrap">
                                    {header}
                                </tr>
                            </thead>
                        )}
                        <tbody>
                            {children}
                        </tbody>
                        {header && (
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b-2 border-gray-500">
                                <tr className="text-nowrap">
                                    {header}
                                </tr>
                            </thead>
                        )}
                    </table>
                </div>
                <Pagination links={links} />
            </div>
        </div>
    )
}
