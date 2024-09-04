import BreadCrumbs from "./BreadCrumbs";
import { PropsWithChildren } from "react";

export default function ResponsiveHeader({ children }: PropsWithChildren<{}>) {
    return (
        <div className="flex lg:justify-between justify-start items-center lg:flex-row flex-col">
            <h2 className="font-semibold text-xl leading-tight">
                <BreadCrumbs />
            </h2>
            <div className="flex items-center gap-4 lg:mt-0 mt-3">
                {children}
            </div>
        </div>
    );
}
