import { useState } from "react";
import { Link, router, usePage } from "@inertiajs/react";
import { PageProps } from "@/types";
import { ChevronDown } from "lucide-react";
import Modal from "../Modal/Modal";
import CloseButton from "../Button/CloseButton";
import LoadingButton from "../Button/LoadingButton";
import { capitalizeFirstLetter } from "@/utils/parse";

export default function BottomHeader() {
  const { auth } = usePage<PageProps>().props;
  const [menuOpened, setMenuOpened] = useState(false);
  const [confirmingLogout, setConfirmingLogout] = useState(false);

  const closeModal = () => setConfirmingLogout(false);

  const handleLogout = () => {
    setConfirmingLogout(false);
    router.delete(route("logout"), {
      replace: true,
    });
  };

  return (
    <>
      <div className="flex items-center justify-between w-full p-4 text-sm bg-white border-b md:py-0 md:px-12 d:text-md">
        <div className="lg:block hidden mt-1 mr-4">
          {auth.user.name}{" "}
          {auth.user.role
            ? "(" + capitalizeFirstLetter(auth.user.role) + ")"
            : ""}
        </div>
        <div className="lg:hidden block mt-1 mr-4">{auth.user.name}</div>
        <div className="relative">
          <div
            className="flex items-center cursor-pointer select-none group"
            onClick={() => setMenuOpened(true)}
          >
            <div className="mr-1 text-gray-800 whitespace-nowrap group-hover:text-indigo-600 focus:text-indigo-600">
              <span>{auth.user.email}</span>
            </div>
            <ChevronDown
              size={20}
              className="text-gray-800 group-hover:text-indigo-600"
            />
          </div>
          <div className={menuOpened ? "" : "hidden"}>
            <div className="absolute top-0 right-0 left-auto z-30 py-2 mt-8 text-sm whitespace-nowrap bg-white rounded shadow-xl">
              <Link
                href={route("profile.edit")}
                className="block px-6 py-2 hover:bg-indigo-600 hover:text-white"
                onClick={() => setMenuOpened(false)}
              >
                My Profile
              </Link>
              <button
                onClick={() => setConfirmingLogout(true)}
                className="block w-full px-6 py-2 text-left focus:outline-none hover:bg-indigo-600 hover:text-white"
              >
                Logout
              </button>
            </div>
            <div
              onClick={() => {
                setMenuOpened(false);
              }}
              className="fixed inset-0 z-20 bg-black opacity-25"
            ></div>
          </div>
        </div>
      </div>

      <Modal show={confirmingLogout} onClose={closeModal}>
        <CloseButton onClick={closeModal} color="green" />
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900">
            Are you sure you want to logout
          </h2>

          <p className="mt-1 text-sm text-gray-600">
            Once you logout, you will be redirected to login page. And all
            unsaved progress will be lost. Are you sure you want to logout?
          </p>

          <div className="mt-6 flex justify-end">
            <LoadingButton
              onClick={handleLogout}
              className="ms-3 text-red-600"
              loading={false}
            >
              Logout
            </LoadingButton>
          </div>
        </div>
      </Modal>
    </>
  );
}
