export default function ChangeDisplayMode({
    onChange,
    checked,
}: {
    onChange: () => void;
    checked: boolean;
}) {
    return (
        <label className="swap swap-rotate relative lg:py-2 py-1 lg:px-3 px-1 rounded light:shadow transition-all">
            <input
                type="checkbox"
                title="change mode for display data"
                className="hidden"
                onChange={onChange}
                checked={checked}
            />
            <svg
                className="swap-off fill-current text-gray-300"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 512 512"
            >
                <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
            </svg>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                width="32"
                height="32"
                className="swap-on inline-block stroke-current text-gray-300"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                ></path>
            </svg>
        </label>
    );
}
