import { User } from "@/types";
import NavLink from "@/Components/NavLink";
import Dropdown from "@/Components/Dropdown";
import { Head, Link, usePage } from "@inertiajs/react";
import BreadCrumbs from "./../Components/BreadCrumbs";
import ApplicationLogo from "@/Components/ApplicationLogo";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { useState, PropsWithChildren, ReactNode } from "react";

export default function Authenticated({
    header,
    title,
    className = "",
    children,
}: PropsWithChildren<{
    title: string;
    header?: ReactNode;
    className?: string;
}>) {
    const auth: any = usePage().props?.auth;
    const user: User = auth?.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <Head title={title} />

            <nav className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800 dark:text-gray-200" />
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink
                                    permission="dashboard.index"
                                    href={route("dashboard.index")}
                                    active={route().current("dashboard.index")}
                                >
                                    Dashboard
                                </NavLink>
                                <NavLink
                                    permission="gallery.index"
                                    href={route("dashboard.index")}
                                    active={route().current("dashboard.index")}
                                >
                                    Gallery
                                </NavLink>
                                <NavLink
                                    permission="blog.index"
                                    href={route("dashboard.index")}
                                    active={route().current("dashboard.index")}
                                >
                                    Blog
                                </NavLink>
                                <NavLink
                                    permission="rbac.index"
                                    href={route("rbac.index")}
                                    active={
                                        route().current("rbac.index") ||
                                        route().current("rbac.roles.index") ||
                                        route().current(
                                            "rbac.permissions.index"
                                        )
                                    }
                                >
                                    RBAC
                                </NavLink>
                                <NavLink
                                    permission="application.index"
                                    href={route("application.index", {
                                        displayMode: "table",
                                    })}
                                    active={
                                        route().current("application.index", {
                                            displayMode: "table",
                                        }) ||
                                        route().current("application.index", {
                                            displayMode: "box",
                                        }) ||
                                        route().current(
                                            "application.type.index"
                                        )
                                    }
                                >
                                    Application
                                </NavLink>
                                <NavLink
                                    permission="translate.index"
                                    href={route("translate.index", {
                                        displayMode: "table",
                                    })}
                                    active={
                                        route().current("translate.index", {
                                            displayMode: "table",
                                        }) ||
                                        route().current("translate.index", {
                                            displayMode: "box",
                                        }) ||
                                        route().current(
                                            "translate.language.index"
                                        )
                                    }
                                >
                                    Translate
                                </NavLink>
                                <NavLink
                                    permission="log.index"
                                    href={route("log.index")}
                                    active={
                                        route().current("log.index") ||
                                        route().current("log.auth.index") ||
                                        route().current("log.model.index") ||
                                        route().current("log.system.index") ||
                                        route().current("log.query.index")
                                    }
                                >
                                    Log
                                </NavLink>
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ms-6">
                            <div className="ms-3 relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                {user.name}

                                                <svg
                                                    className="ms-2 -me-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route("profile.edit")}
                                        >
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                type="button"
                                title='Toggle "showingNavigationDropdown"'
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState
                                    )
                                }
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-900 focus:text-gray-500 dark:focus:text-gray-400 transition duration-150 ease-in-out"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? "block" : "hidden") +
                        " sm:hidden"
                    }
                >
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink
                            href={route("dashboard.index")}
                            active={route().current("dashboard.index")}
                        >
                            Dashboard
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route("dashboard.index")}
                            active={route().current("dashboard.index")}
                        >
                            Gallery
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route("dashboard.index")}
                            active={route().current("dashboard.index")}
                        >
                            Blog
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route("application.index", {
                                displayMode: "table",
                            })}
                            active={
                                route().current("application.index", {
                                    displayMode: "table",
                                }) ||
                                route().current("application.index", {
                                    displayMode: "box",
                                }) ||
                                route().current("application.type.index")
                            }
                        >
                            Application
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route("translate.index", {
                                displayMode: "table",
                            })}
                            active={
                                route().current("translate.index", {
                                    displayMode: "table",
                                }) ||
                                route().current("translate.index", {
                                    displayMode: "box",
                                }) ||
                                route().current("translate.language.index")
                            }
                        >
                            Translate
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route("log.index")}
                            active={
                                route().current("log.index") ||
                                route().current("log.auth.index") ||
                                route().current("log.system.index") ||
                                route().current("log.model.index") ||
                                route().current("log.query.index")
                            }
                        >
                            Log
                        </ResponsiveNavLink>
                    </div>

                    <div className="pt-4 pb-1 border-t border-gray-200 dark:border-gray-600">
                        <div className="px-4">
                            <div className="font-medium text-base text-gray-800 dark:text-gray-200">
                                {user.name}
                            </div>
                            <div className="font-medium text-sm text-gray-500">
                                {user.email}
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route("profile.edit")}>
                                Profile
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route("logout")}
                                as="button"
                            >
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header ? (
                <header className="bg-white dark:bg-gray-800 shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            ) : (
                <header className="bg-white dark:bg-gray-800 shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center">
                            <BreadCrumbs />
                        </div>
                    </div>
                </header>
            )}

            <main className={`py-12 ${className}`}>{children}</main>
        </div>
    );
}
