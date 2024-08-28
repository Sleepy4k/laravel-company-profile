interface MenuProps {
    step: number;
}

export default function Menu({ step }: MenuProps) {
    return (
        <nav>
            <ol className="divide-y divide-neutral-300 rounded-md border border-neutral-300 md:flex md:divide-y-0">
                <li className="relative md:flex md:flex-1">
                    <a href="#" className="pointer-events-none flex items-center px-6 py-4 text-sm font-medium">
                        <span
                            className={ (step == 1 ? 'border-2 border-primary-600' : 'bg-primary-600') + ' flex h-10 w-10 shrink-0 items-center justify-center rounded-full' }>
                            { step > 1 ? (
                                <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            ) : (
                                <span className="text-primary-600">01</span>
                            )}
                        </span>
                        <span className="ml-4 text-sm font-medium text-primary-600">Requirements</span>
                    </a>

                    <div className="absolute top-0 right-0 hidden h-full w-5 md:block" aria-hidden="true">
                        <svg className="h-full w-full text-neutral-300" viewBox="0 0 22 80" fill="none" preserveAspectRatio="none">
                            <path d="M0 -2L20 40L0 82" vectorEffect="non-scaling-stroke" stroke="currentcolor" strokeLinejoin="round" />
                        </svg>
                    </div>
                </li>

                <li className="relative md:flex md:flex-1">
                    <a href="#" className="group pointer-events-none flex items-center">
                        <span className="flex items-center px-6 py-4 text-sm font-medium">
                            <span
                                className={ (step == 2 ? 'border-2 border-primary-600' : (step > 2 ? 'bg-primary-600' : 'border-2 border-neutral-300')) + ' flex h-10 w-10 shrink-0 items-center justify-center rounded-full' }>
                                { step > 2 ? (
                                    <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <span className={ step < 2 ? 'text-neutral-500' : 'text-primary-600' }>02</span>
                                )}
                            </span>
                            <span className="ml-4 text-sm font-medium text-neutral-500">Permissions</span>
                        </span>
                    </a>

                    <div className="absolute top-0 right-0 hidden h-full w-5 md:block" aria-hidden="true">
                        <svg className="h-full w-full text-neutral-300" viewBox="0 0 22 80" fill="none" preserveAspectRatio="none">
                            <path d="M0 -2L20 40L0 82" vectorEffect="non-scaling-stroke" stroke="currentcolor" strokeLinejoin="round" />
                        </svg>
                    </div>
                </li>


                <li className="relative md:flex md:flex-1">
                    <a href="#" className="group pointer-events-none flex items-center">
                        <span className="flex items-center px-6 py-4 text-sm font-medium">
                            <span
                                className={ (step == 3 ? 'border-2 border-primary-600' : (step > 3 ? 'bg-primary-600' : 'border-2 border-neutral-300')) + ' flex h-10 w-10 shrink-0 items-center justify-center rounded-full' }>
                                { step > 3 ? (
                                    <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <span className={ step < 3 ? 'text-neutral-500' : 'text-primary-600' }>03</span>
                                )}
                            </span>
                            <span className="ml-4 text-sm font-medium text-neutral-500">Setup</span>
                        </span>
                    </a>

                    <div className="absolute top-0 right-0 hidden h-full w-5 md:block" aria-hidden="true">
                        <svg className="h-full w-full text-neutral-300" viewBox="0 0 22 80" fill="none" preserveAspectRatio="none">
                            <path d="M0 -2L20 40L0 82" vectorEffect="non-scaling-stroke" stroke="currentcolor" strokeLinejoin="round" />
                        </svg>
                    </div>
                </li>


                <li className="relative md:flex md:flex-1">
                    <a href="#" className="group pointer-events-none flex items-center">
                        <span className="flex items-center px-6 py-4 text-sm font-medium">
                            <span
                                className={ (step == 4 ? 'border-2 border-primary-600' : (step > 4 ? 'bg-primary-600' : 'border-2 border-neutral-300')) + ' flex h-10 w-10 shrink-0 items-center justify-center rounded-full' }>
                                { step > 4 ? (
                                    <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <span className={ step < 4 ? 'text-neutral-500' : 'text-primary-600' }>04</span>
                                )}
                            </span>
                            <span className="ml-4 text-sm font-medium text-neutral-500">User</span>
                        </span>
                    </a>

                    <div className="absolute top-0 right-0 hidden h-full w-5 md:block" aria-hidden="true">
                        <svg className="h-full w-full text-neutral-300" viewBox="0 0 22 80" fill="none" preserveAspectRatio="none">
                            <path d="M0 -2L20 40L0 82" vectorEffect="non-scaling-stroke" stroke="currentcolor" strokeLinejoin="round" />
                        </svg>
                    </div>
                </li>

                <li className="relative md:flex md:flex-1">
                    <a href="#" className="group pointer-events-none flex items-center">
                        <span className="flex items-center px-6 py-4 text-sm font-medium">
                            <span
                                className={ (step == 5 ? 'border-2 border-primary-600' : (step > 5 ? 'bg-primary-600' : 'border-2 border-neutral-300')) + ' flex h-10 w-10 shrink-0 items-center justify-center rounded-full' }>
                                { step > 5 ? (
                                    <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <span className={ step < 5 ? 'text-neutral-500' : 'text-primary-600' }>05</span>
                                )}
                            </span>
                            <span className="ml-4 text-sm font-medium text-neutral-500">Finish</span>
                        </span>
                    </a>
                </li>
            </ol>
        </nav>
    );
}
