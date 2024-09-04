import { Link } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function BreadCrumbs() {
    const [breadcrumbs, setBreadcrumbs] = useState<string[]>([]);

    useEffect(() => {
        setBreadcrumbs(window.location.pathname.split('/').filter(Boolean));
    }, []);

    return (
        <div className="breadcrumbs font-semibold lg:text-sm text-xs leading-tight">
            <ul>
                {breadcrumbs.map((breadcrumb, index) => {
                    const isFirst = index === 0;
                    const isNameNotWord = typeof breadcrumb !== 'string' || !/^[a-zA-Z]+$/.test(breadcrumb);
                    const name = isNameNotWord ? breadcrumb : breadcrumb.charAt(0).toUpperCase() + breadcrumb.slice(1);

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
