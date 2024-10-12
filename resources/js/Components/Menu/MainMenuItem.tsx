import can from "@/utils/permission";
import trans from "@/utils/translate";
import { Link } from "@inertiajs/react";
import classNames from "classnames";

type MainMenuItemProps = {
  link: string;
  name: string;
  translate: string;
  parameter: string | null;
  permission?: string[];
  active_routes?: string[];
};

export default function MainMenuItem({
  link,
  name,
  translate,
  parameter,
  permission,
  active_routes,
}: MainMenuItemProps) {
  if (permission && !can(permission)) return null;

  const isActive = active_routes?.includes(route().current() as string);

  const textClasses = classNames({
    "text-white": isActive,
    "text-indigo-200 group-hover:text-white": !isActive,
  });

  const getUri = () =>
    !link || link === "#" ? "#" : route(link, parameter || undefined);

  return (
    <div>
      <Link href={getUri()} className="flex items-center group py-3 space-x-3">
        <div className={textClasses}>{`> ${trans(translate, name)}`}</div>
      </Link>
    </div>
  );
}
