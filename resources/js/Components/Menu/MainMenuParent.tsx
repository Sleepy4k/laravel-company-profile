import { DashboardMenu } from "@/types";
import MainMenuItem from "./MainMenuItem";
import trans from "@/utils/translate";

interface MainMenuItemProps {
  name: string;
  translate: string;
  child: DashboardMenu[];
}

export default function MainMenuParent({
  name,
  translate,
  child,
}: MainMenuItemProps) {
  if (child && child.length < 1) return null;

  return (
    <div className="mb-4">
      <div className="flex items-center group py-3 space-x-3">
        <div className="text-white">{trans(translate, name)}</div>
      </div>
      <div className="ml-4">
        {child.map((menu, index) => (
          <MainMenuItem
            key={index}
            name={menu.name}
            translate={menu.meta.translation_key}
            link={menu.meta.route}
            permission={menu.meta.permission}
            parameter={menu.meta.parameters}
            active_routes={menu.meta.active_routes}
          />
        ))}
      </div>
    </div>
  );
}
