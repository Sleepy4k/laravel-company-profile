import { Auth } from "@/types";
import { usePage } from "@inertiajs/react";

export default function can(permission: string[]) {
  const permissions = usePage<{ auth: Auth }>().props.auth.user.permissions;
  if (!permissions) return false;

  return permission.some((p) => permissions.includes(p));
}
