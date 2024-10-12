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
  group: string;
};

function Home({
  data,
}: PageProps<{ data: any }>) {
  const [failed, setFailed] = useState(false);
  const [mode, setMode] = useState<"table" | "box" | null>(null);
  const [translateDeleteData, setTranslateDeleteData] =
    useState<IDeleteData | null>(null);
  const [confirmingTranslateDeletion, setConfirmingTranslateDeletion] =
    useState(false);

  useEffect(() => {
    // Get mode from url, if last url is /application/mode then set mode to box
    const url = window.location.href;
    const mode = url.split("/")[url.split("/").length - 1].split("?")[0];

    mode === "box" ? setMode("box") : setMode("table");
  }, []);

  const handleChangeMode = () => {
    router.visit(
      route("translate.index", {
        displayMode: mode == "box" ? "table" : "box",
      })
    );
  };

  const deleteTranslate = (data: any) => {
    setConfirmingTranslateDeletion(true);
    setTranslateDeleteData(data);
  };

  const closeModal = () => setConfirmingTranslateDeletion(false);

  const handleDeleteTranslate = (e: any) => {
    e.preventDefault();

    const key = e.target.key.value;

    // check if key is empty
    if (!key) {
      setFailed(true);
      return;
    }

    // Check if key is not same with translate key
    if (key !== `${translateDeleteData?.group}.${translateDeleteData?.key}`) {
      setFailed(true);
      return;
    }

    // Delete translate here
    router.delete(route("translate.destroy", translateDeleteData?.uuid || 0), {
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
            Translate
          </Link>
          <span className="font-medium text-indigo-600"> /</span>{" "}
          {mode == "box" ? "Kanban" : "Table"}
        </h1>
        <div className="flex items-center lg:gap-5 gap-1 lg:flex-row flex-col">
          <Link
            href={route('translate.language.index')}
            className="btn btn-indigo focus:outline-none"
          >
            Change Language
          </Link>
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

      <BoxMode data={data} mode={mode} deleteTranslate={deleteTranslate} />

      <Confirmation
        isFailed={failed}
        loadingState={false}
        confirmingTranslateDeletion={confirmingTranslateDeletion}
        translateDeleteData={translateDeleteData}
        closeModal={closeModal}
        handleDeleteTranslate={handleDeleteTranslate}
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
  <MainLayout title="Translate" children={page} />
);

export default Home;
