import { Link } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { capitalizeFirstLetter } from "@/utils/parse";

export default function BreadCrumbs() {
    const [breadcrumbs, setBreadcrumbs] = useState<string[]>([]);

    useEffect(() => {
        setBreadcrumbs(window.location.pathname.split('/').filter(Boolean));
    }, []);

    return (
        <div className="breadcrumbs font-semibold lg:text-sm text-xs dark:text-gray-400 leading-tight">
            <ul>
                {breadcrumbs.map((breadcrumb, index) => {
                    const isFirst = index === 0;
                    const isNameNotWord = typeof breadcrumb !== 'string' || !/^[a-zA-Z]+$/.test(breadcrumb);
                    const name = isNameNotWord ? breadcrumb : capitalizeFirstLetter(breadcrumb);

                    return (
                        <li key={index} className="inline">
                            {isFirst ? (
                                <Link href={route('dashboard.index')}>{name}</Link>
                            ) : (
                                <span>{name}</span>
                            )}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
