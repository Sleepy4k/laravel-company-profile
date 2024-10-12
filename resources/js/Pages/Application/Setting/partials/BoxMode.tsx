import ActionPopOver from "@/Components/PopOver/Action";
import { Link } from "@inertiajs/react";

export default function BoxMode({
  data,
  mode,
  deleteSetting,
}: {
  data: any;
  mode: string | null;
  deleteSetting: Function;
}) {
  if (mode == null || mode !== "box") return null;

  return (
    <div className="max-w-full flex overflow-x-auto">
      <div className="flex justify-start pb-4 mb-2 space-x-8">
        {data &&
          data.map((item: any, col: number) => (
            <div
              key={col}
              className="inline-flex h-[calc(100vh-22rem)] max-w-[18rem] overflow-hidden flex-col overflow-x-hidden overflow-y-hidden rounded-lg bg-neutral-400/40 align-top shadow"
            >
              <div className="px-3 py-2.5">
                <div className="flex lg:flex-row flex-col items-center">
                  <h5 className="font-medium text-neutral-800 text-sm">
                    {item.name}
                  </h5>
                </div>
                <div className="flex lg:flex-row flex-col items-center text-sm">
                  <span className="text-neutral-600">{item.description}</span>
                  <span className="mx-1 text-neutral-900">-</span>
                  <span className="text-neutral-700">
                    {item.settings.length} setting
                  </span>
                </div>
              </div>
              <div className="overflow-x-hidden overflow-y-auto">
                {item &&
                  item.settings.length > 0 &&
                  item.settings.map((setting: any, row: number) => (
                    <div
                      key={row}
                      className="m-3 overflow-hidden whitespace-normal rounded-md bg-white shadow"
                    >
                      <div className="button-hidden group px-4 py-2">
                        <div className="flex">
                          <div className="flex-grow overflow-hidden text-ellipsis whitespace-nowrap">
                            <Link
                              href={route("application.show", setting.uuid)}
                              className="overflow-hidden text-ellipsis whitespace-nowrap text-sm font-medium text-neutral-900 focus:outline-none hover:text-neutral-500"
                            >
                              <h3>
                                {setting.name} ({setting.key})
                              </h3>
                            </Link>
                            <div className="mt-1 flex text-sm">
                              <p className="text-neutral-500">
                                {setting.value || "-"}
                              </p>
                            </div>
                            <p className="mt-1 text-xs text-neutral-700">
                              Last update {setting.updated_at || "-"}
                            </p>
                          </div>
                          <div className="ms-2">
                            <div className="flex flex-col items-center space-y-1">
                              <ActionPopOver>
                                <Link
                                  href={route("application.show", setting.uuid)}
                                  className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                                >
                                  <div className="flex flex-row">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth="1.5"
                                      stroke="currentColor"
                                      aria-hidden="true"
                                      className="mr-2 h-5 w-5 shrink-0 text-neutral-500 group-hover:text-neutral-600"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                      ></path>
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                      ></path>
                                    </svg>
                                    <span className="mt-0.5">View</span>
                                  </div>
                                </Link>
                                <Link
                                  href={route("application.edit", setting.uuid)}
                                  className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                                >
                                  <div className="flex flex-row">
                                    <svg
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                      strokeWidth="1.5"
                                      stroke="currentColor"
                                      aria-hidden="true"
                                      className="mr-2 h-5 w-5 shrink-0 text-neutral-500 group-hover:text-neutral-600 fill-current"
                                    >
                                      <path
                                        d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z"
                                        stroke="#ffffff"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      ></path>
                                      <path
                                        d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13"
                                        stroke="#ffffff"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      ></path>
                                    </svg>
                                    <span className="mt-0.5">Edit</span>
                                  </div>
                                </Link>
                                <button
                                  type="button"
                                  onClick={() => deleteSetting(setting)}
                                  className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                                >
                                  <div className="flex flex-row">
                                    <svg
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                      strokeWidth="1.5"
                                      stroke="currentColor"
                                      aria-hidden="true"
                                      className="mr-2 h-5 w-5 shrink-0 text-neutral-500 group-hover:text-neutral-600 fill-current"
                                    >
                                      <path
                                        d="M10 12L14 16M14 12L10 16M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6"
                                        stroke="#ffffff"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      ></path>
                                    </svg>
                                    <span className="mt-0.5">Delete</span>
                                  </div>
                                </button>
                              </ActionPopOver>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
