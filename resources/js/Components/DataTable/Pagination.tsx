import { HTMLAttributes } from "react";
import { Link } from "@inertiajs/react";

export default function Pagination({
    links,
    ...props
}: HTMLAttributes<HTMLParagraphElement> & { links: any }) {
    return (
        <nav className="text-center mt-4">
            {links.map((link: any) => {
                if (!link.url || link.active || link.url === null) {
                    return (
                        <span
                            key={link.label}
                            className={
                                "inline-block py-2 px-3 rounded-lg text-gray-500 dark:text-gray-300 text-xs " +
                                (link.active ? "bg-gray-950 " : " ") +
                                (!link.url
                                    ? "!text-gray-500 cursor-not-allowed "
                                    : "hover:bg-gray-950")
                            }
                        >
                            <span
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        </span>
                    );
                } else
                    return (
                        <Link
                            preserveScroll
                            href={link.url || ""}
                            key={link.label}
                            disabled={
                                !link.url || link.active || link.url === null
                            }
                            className={
                                "inline-block py-2 px-3 rounded-lg text-gray-500 dark:text-gray-300 text-xs " +
                                (link.active ? "bg-gray-950 " : " ") +
                                (!link.url
                                    ? "!text-gray-500 cursor-not-allowed "
                                    : "hover:bg-gray-950")
                            }
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    );
            })}
        </nav>
    );
}
