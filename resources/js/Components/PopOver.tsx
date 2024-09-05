import { PropsWithChildren } from 'react';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';

export default function PopOver({ children }: PropsWithChildren) {
    return (
        <Popover className="relative">
            <PopoverButton>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="pointer-events-none w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"></path></svg>
            </PopoverButton>
            <PopoverPanel anchor="bottom" className="rounded-md bg-white dark:bg-neutral-800">
                {children}
            </PopoverPanel>
        </Popover>
    );
}
