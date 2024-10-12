import { useState, useEffect, useMemo, useRef, forwardRef } from "react";
import { usePage, router } from "@inertiajs/react";
import usePrevious from "react-use/lib/usePrevious";
import pickBy from "lodash/pickBy";
import TextInput from "@/Components/Form/TextInput";
import { QueryParams } from "@/types";
import { debounce } from "lodash";

export default function FilterBar() {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const SearchInput = forwardRef<HTMLInputElement, any>((props, ref) => (
    <TextInput ref={ref} {...props} />
  ));

  const queryParams =
    usePage<{ queryParams: QueryParams }>().props.queryParams || {};

  const isQueryParamEmpty = () => {
    return !queryParams || Object.keys(queryParams).length === 0;
  };

  const [values, setValues] = useState({
    search: queryParams.search || "",
  });

  const prevValues = usePrevious(values);

  function reset() {
    setValues({
      search: "",
    });

    if (isQueryParamEmpty()) return;

    router.get(
      route(route().current() as string, route().routeParams),
      {},
      {
        replace: true,
        preserveState: true,
      }
    );
  }

  useEffect(() => {
    // https://reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state
    if (prevValues) {
      const query = Object.keys(pickBy(values)).length ? pickBy(values) : {};

      router.get(
        route(route().current() as string, route().routeParams),
        query,
        {
          replace: true,
          preserveState: true,
        }
      );
    }
  }, [values]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const name = e.target.name;
    const value = e.target.value;

    setValues((values) => ({
      ...values,
      [name]: value,
    }));
  }

  const debouncedResults = useMemo(() => {
    return debounce(handleChange, 300);
  }, []);

  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  });

  return (
    <div className="flex items-center w-full max-w-md mr-4">
      <div className="relative flex bg-white rounded shadow">
        <SearchInput
          ref={searchInputRef}
          name="search"
          placeholder="Search…"
          autoComplete="off"
          defaultValue={values.search}
          onChange={debouncedResults}
          className="border-0 rounded-l-none focus:ring-2"
        />
      </div>
      <button
        type="button"
        onClick={reset}
        className="ml-3 text-sm text-gray-600 hover:text-gray-700 focus:text-indigo-700 focus:outline-none"
      >
        Reset
      </button>
    </div>
  );
}
