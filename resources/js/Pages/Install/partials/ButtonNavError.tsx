export default function ButtonNavError() {
  return (
    <div className="-m-7 mt-6 rounded-b border-t border-warning-100 bg-warning-50 py-7 px-10 text-right">
      <div className="flex">
        <div className="shrink-0">
          <svg
            className="h-5 w-5 text-warning-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-warning-800">
            You need to fix the requirements in order to continue with the
            installation.
          </h3>
        </div>
      </div>
    </div>
  );
}
