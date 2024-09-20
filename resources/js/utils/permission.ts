import { usePage } from "@inertiajs/react";

export default function can(permission: string) {
    const auth: any = usePage().props?.auth;
    const permissions: string[] = auth?.user?.permissions;

    if (permission && !permissions.includes(permission)) return false;

    return true;
}
