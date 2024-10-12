import React, { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";
import Logo from "@/Components/Logo/Logo";
import LoadingButton from "@/Components/Button/LoadingButton";
import TextInput from "@/Components/Form/TextInput";
import FieldGroup from "@/Components/Form/FieldGroup";
import AuthLayout from "@/Layouts/AuthLayout";
import { Link } from "@inertiajs/react";
import FlashMessages from "@/Components/Messages/FlashMessages";
import { PageProps } from "@/types";
import trans from "@/utils/translate";

type LoginPageProps = PageProps<{
  rateLimiter: {
    max_attempts: number;
    attempts: number;
    remaining: number;
    reset_at: number;
  };
}>;

function LoginPage({ rateLimiter }: LoginPageProps) {
  const [unlockedAt, setUnlockedAt] = useState<number>(rateLimiter.reset_at);
  const { data, setData, errors, post, reset, processing } = useForm({
    email: "",
    password: "",
  });

  useEffect(() => {
    setUnlockedAt(rateLimiter.reset_at);
  }, [rateLimiter]);

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setUnlockedAt((prev) => {
        if (prev === 1) {
          rateLimiter.remaining = rateLimiter.max_attempts;
          rateLimiter.attempts = 0;
          clearInterval(timeInterval);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timeInterval);
  }, [rateLimiter]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    post(route("login"));
  }

  return (
    <div className="w-full max-w-md">
      <Logo className="justify-center" height={50} logocolor='text-red-800 fill-current' />
      <div className="mt-5">
        <FlashMessages />
      </div>
      <form
        onSubmit={handleSubmit}
        className="mt-8 overflow-hidden bg-white rounded-lg shadow-xl"
      >
        <div className="px-10 py-12">
          <h1 className="text-3xl font-bold text-center">
            {trans("page.login.welcome", "Welcome Back!")}
          </h1>
          <div className="w-24 mx-auto mt-6 border-b-2" />
          <div className="grid gap-6">
            <FieldGroup
              label={trans("page.login.input.email", "Email")}
              name="email"
              error={errors.email}
            >
              <TextInput
                name="email"
                type="email"
                error={errors.email}
                value={data.email}
                onChange={(e) => setData("email", e.target.value)}
                autoComplete="username"
                disabled={rateLimiter.remaining === 0 || processing}
              />
            </FieldGroup>

            <FieldGroup
              label={trans("page.login.input.password", "Password")}
              name="password"
              error={errors.password}
            >
              <TextInput
                type="password"
                error={errors.password}
                value={data.password}
                onChange={(e) => setData("password", e.target.value)}
                autoComplete="current-password"
                disabled={rateLimiter.remaining === 0 || processing}
              />
            </FieldGroup>
          </div>

          {rateLimiter.remaining > 0 && rateLimiter.remaining < 4 && (
            <div className="mt-6 text-sm text-red-500">
              {trans("page.login.alert.lock_warning", "Warning", [
                rateLimiter.remaining,
              ])}
            </div>
          )}
        </div>
        <div className="flex items-center justify-between px-10 py-4 bg-gray-100 border-t border-gray-200">
          <Link className="hover:underline" href="/" tabIndex={-1}>
            {trans("form.button.back", "Back")}
          </Link>
          {rateLimiter.remaining === 0 ? (
            <div className="text-red-500">
              {trans("page.login.alert.locked_out", "Locked Out", [unlockedAt])}
            </div>
          ) : (
            <LoadingButton
              type="submit"
              loading={processing}
              className="btn-indigo"
            >
              {trans("page.login.button.submit", "Login")}
            </LoadingButton>
          )}
        </div>
      </form>
    </div>
  );
}

/**
 * Persistent Layout (Inertia.js)
 *
 * [Learn more](https://inertiajs.com/pages#persistent-layouts)
 */
LoginPage.layout = (page: React.ReactNode) => (
  <AuthLayout title="Login" children={page} />
);

export default LoginPage;
