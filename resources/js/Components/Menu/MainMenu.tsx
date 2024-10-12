import { DashboardMenu } from "@/types";
import { usePage } from "@inertiajs/react";
import MainMenuParent from "./MainMenuParent";

interface MainMenuProps {
  className?: string;
}

export default function MainMenu({ className }: MainMenuProps) {
  const menus: DashboardMenu[] = usePage<{ menus: DashboardMenu[] }>().props
    .menus;
  const defaultClassName =
    "lg:overflow-x-hidden overflow-x-scroll lg:max-h-screen md:max-h-screen max-h-[calc(100vh-15rem)]";
  const mergedClassName = className
    ? ` ${className} ${defaultClassName}`
    : defaultClassName;

  return (
    <div className={mergedClassName}>
      <div className="lg:w-screen w-full">
        {menus.map((menu, index) => (
          <MainMenuParent
            key={index}
            name={menu.name}
            translate={menu.meta.translation_key}
            child={menu.child}
          />
        ))}
      </div>
    </div>
  );
}
