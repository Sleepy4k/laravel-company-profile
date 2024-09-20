import { ButtonHTMLAttributes } from "react";

export default function CustomButton({
    className = "",
    disabled,
    children,
    ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...props}
            className={
                `dark:disabled:text-gray-400 dark:disabled:bg-gray-500 dark:bg-white dark:text-gray-800 dark:hover:bg-white dark:focus:bg-white ${
                    disabled && "opacity-45"
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
