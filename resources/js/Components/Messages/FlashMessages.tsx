import { useState, useEffect } from "react";
import { usePage } from "@inertiajs/react";
import { PageProps } from "@/types";
import Alert from "@/Components/Alert/Alert";
import trans from "@/utils/translate";

export default function FlashedMessages() {
  const [visible, setVisible] = useState(true);
  const { flash, errors } = usePage<PageProps>().props;
  const formErrors = Object.keys(errors).length;

  useEffect(() => {
    setVisible(true);
  }, [flash, errors]);

  return (
    <>
      {flash.success && visible && (
        <Alert
          variant="success"
          message={flash.success}
          onClose={() => setVisible(false)}
        />
      )}
      {flash.error && visible && (
        <Alert
          variant="error"
          message={flash.error}
          onClose={() => setVisible(false)}
        />
      )}
      {formErrors > 0 && visible && (
        <Alert
          variant="error"
          message={trans(
            "error.flash.message",
            "There was an error processing your request.",
            [formErrors]
          )}
          onClose={() => setVisible(false)}
        />
      )}
    </>
  );
}
