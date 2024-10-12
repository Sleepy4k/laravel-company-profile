import { PageProps } from "@/types";
import { useEffect, useState } from "react";
import { Link, router } from "@inertiajs/react";
import TableMode from "./partials/TableMode";
import BoxMode from "./partials/BoxMode";
import MainLayout from "@/Layouts/MainLayout";
import Confirmation from "./partials/Confirmation";

type IDeleteData = {
  uuid: any;
  key: string;
  name: string;
};

function Home({
  data,
}: PageProps<{ data: any }>) {
  const [failed, setFailed] = useState(false);
  const [mode, setMode] = useState<"table" | "box" | null>(null);
  const [settingDeleteData, setSettingDeleteData] =
    useState<IDeleteData | null>(null);
  const [confirmingSettingDeletion, setConfirmingSettingDeletion] =
    useState(false);

  useEffect(() => {
    // Get mode from url, if last url is /application/mode then set mode to box
    const url = window.location.href;
    const mode = url.split("/")[url.split("/").length - 1].split("?")[0];

    mode === "box" ? setMode("box") : setMode("table");
  }, []);

  const handleChangeMode = () => {
    router.visit(
      route("application.index", {
        displayMode: mode == "box" ? "table" : "box",
      })
    );
  };

  const deleteSetting = (data: any) => {
    setConfirmingSettingDeletion(true);
    setSettingDeleteData(data);
  };

  const closeModal = () => setConfirmingSettingDeletion(false);

  const handleDeleteSetting = (e: any) => {
    e.preventDefault();

    const key = e.target.key.value;

    // check if key is empty
    if (!key) {
      setFailed(true);
      return;
    }

    // Check if key is not same with setting key
    if (key !== settingDeleteData?.key) {
      setFailed(true);
      return;
    }

    // Delete setting here
    router.delete(route("application.destroy", settingDeleteData?.uuid || 0), {
      preserveScroll: true,
      onSuccess: () => {
        closeModal();
      },
      onError: () => {
        closeModal();
        setFailed(true);
      },
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6 lg:flex-row flex-col">
        <h1 className="mb-8 text-3xl font-bold">
          <Link
            href={route(route().current() as string, route().routeParams)}
            className="text-indigo-600 hover:text-indigo-700"
          >
            Settings
          </Link>
          <span className="font-medium text-indigo-600"> /</span>{" "}
          {mode == "box" ? "Kanban" : "Table"}
        </h1>
        <div className="flex items-center lg:gap-5 gap-1 lg:flex-row flex-col">
          <button
            type="button"
            onClick={handleChangeMode}
            className="btn btn-indigo focus:outline-none"
          >
            Switch to {mode == "box" ? "Table" : "Kanban"} Mode
          </button>
        </div>
      </div>

      <TableMode data={data} mode={mode} />

      <BoxMode data={data} mode={mode} deleteSetting={deleteSetting} />

      <Confirmation
        isFailed={failed}
        loadingState={false}
        confirmingSettingDeletion={confirmingSettingDeletion}
        settingDeleteData={settingDeleteData}
        closeModal={closeModal}
        handleDeleteSetting={handleDeleteSetting}
      />
    </div>
  );
}

/**
 * Persistent Layout (Inertia.js)
 *
 * [Learn more](https://inertiajs.com/pages#persistent-layouts)
 */
Home.layout = (page: React.ReactNode) => (
  <MainLayout title="Setting" children={page} />
);

export default Home;
