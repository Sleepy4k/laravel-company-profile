import trans from "@/utils/translate";
import { Children, PropsWithChildren } from "react";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";

export default function ActionPopOver({ children }: PropsWithChildren) {
  const isChildrenEmpty =
    Children.count(children) === 0 || Children.toArray(children).length === 0;

  return (
    <Popover className="relative">
      <PopoverButton>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          aria-hidden="true"
          className="pointer-events-none w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
          ></path>
        </svg>
      </PopoverButton>
      <PopoverPanel anchor="bottom" className="rounded-md bg-white">
        {children}

        {isChildrenEmpty && (
          <div className="block px-4 py-2 text-sm text-neutral-700">
            <div className="flex flex-row">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 h-5 w-5 shrink-0 text-neutral-500"
              >
                <path
                  d="M19 5L5 19M5.00001 5L19 19"
                  stroke="#000000"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
              <span className="mt-0.5">
                {trans("popover.empty.action", "No action available")}
              </span>
            </div>
          </div>
        )}
      </PopoverPanel>
    </Popover>
  );
}
