import { useForm } from "@inertiajs/react";
import { useRef } from "react";
import TextInput from "@/Components/Form/TextInput";
import FieldGroup from "@/Components/Form/FieldGroup";
import LoadingButton from "@/Components/Button/LoadingButton";

export default function UpdatePasswordForm({
  className = "",
}: {
  className?: string;
}) {
  const passwordInput = useRef<HTMLInputElement>(null);
  const currentPasswordInput = useRef<HTMLInputElement>(null);

  const { data, setData, errors, put, reset, processing } = useForm({
    current_password: "",
    password: "",
    password_confirmation: "",
  });

  const updatePassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    put(route("password.update"), {
      preserveScroll: true,
      onSuccess: () => reset(),
      onError: (errors) => {
        if (errors.password) {
          reset("password", "password_confirmation");
          passwordInput.current?.focus();
        }

        if (errors.current_password) {
          reset("current_password");
          currentPasswordInput.current?.focus();
        }
      },
    });
  };

  return (
    <section className={className}>
      <header>
        <h2 className="text-lg font-medium text-gray-900">Update Password</h2>

        <p className="mt-1 text-sm text-gray-600">
          Ensure your account is using a long, random password to stay secure.
        </p>
      </header>

      <form onSubmit={updatePassword}>
        <div className="grid gap-6 mt-4 mb-4">
          <FieldGroup
            label="Current Password"
            name="current_password"
            error={errors.current_password}
          >
            <TextInput
              name="current_password"
              type="password"
              error={errors.current_password}
              value={data.current_password}
              onChange={(e) => setData("current_password", e.target.value)}
              autoComplete="current_password"
              disabled={processing}
            />
          </FieldGroup>

          <FieldGroup
            label="New Password"
            name="password"
            error={errors.password}
          >
            <TextInput
              type="password"
              error={errors.password}
              value={data.password}
              onChange={(e) => setData("password", e.target.value)}
              autoComplete="new-password"
              disabled={processing}
            />
          </FieldGroup>

          <FieldGroup
            label="Confirm Password"
            name="password_confirmation"
            error={errors.password_confirmation}
          >
            <TextInput
              type="password"
              error={errors.password_confirmation}
              value={data.password_confirmation}
              onChange={(e) => setData("password_confirmation", e.target.value)}
              autoComplete="new-password"
              disabled={processing}
            />
          </FieldGroup>
        </div>

        <LoadingButton
          type="submit"
          className="btn-indigo"
          loading={processing}
        >
          Update Password
        </LoadingButton>
      </form>
    </section>
  );
}
