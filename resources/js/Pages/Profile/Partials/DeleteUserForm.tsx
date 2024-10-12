import CloseButton from "@/Components/Button/CloseButton";
import DeleteButton from "@/Components/Button/DeleteButton";
import LoadingButton from "@/Components/Button/LoadingButton";
import Modal from "@/Components/Modal/Modal";
import { useForm } from "@inertiajs/react";
import { useRef, useState } from "react";
import TextInput from "@/Components/Form/TextInput";
import FieldGroup from "@/Components/Form/FieldGroup";

export default function DeleteUserForm({
  className = "",
}: {
  className?: string;
}) {
  const [confirmingUserDeletion, setConfirmingUserDeletion] =
    useState<boolean>(false);
  const passwordInput = useRef<HTMLInputElement>(null);

  const {
    setData,
    delete: destroy,
    processing,
    reset,
    errors,
  } = useForm({
    password: "",
  });

  const confirmUserDeletion = () => {
    setConfirmingUserDeletion(true);
  };

  const closeModal = () => {
    setConfirmingUserDeletion(false);
    reset("password");
  };

  const deleteUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    destroy(route("profile.destroy"), {
      preserveScroll: true,
      onError: () => passwordInput.current?.focus(),
      onFinish: () => closeModal(),
    });
  };

  return (
    <section className={`space-y-6 ${className}`}>
      <header>
        <h2 className="text-lg font-medium text-gray-900">Delete Account</h2>

        <p className="mt-1 text-sm text-gray-600">
          Once your account is deleted, all of its resources and data will be
          permanently deleted. Before deleting your account, please download any
          data or information that you wish to retain.
        </p>
      </header>

      <DeleteButton onDelete={confirmUserDeletion}>Delete Account</DeleteButton>

      <Modal show={confirmingUserDeletion} onClose={closeModal}>
        <CloseButton onClick={closeModal} color="green" />
        <form onSubmit={deleteUser} className="p-6">
          <h2 className="text-lg font-medium text-gray-900">
            Are you sure you want to delete your account?
          </h2>

          <p className="mt-1 text-sm text-gray-600">
            Once your account is deleted, all of its resources and data will be
            permanently deleted. Please enter your password to confirm you would
            like to permanently delete your account.
          </p>

          <div className="mt-6">
            <FieldGroup
              label="Password"
              name="password"
              error={errors.password}
            >
              <TextInput
                name="password"
                type="password"
                error={errors.password}
                onChange={(e) => setData("password", e.target.value)}
                autoComplete="password"
                disabled={processing}
                ref={passwordInput}
                placeholder="Password"
              />
            </FieldGroup>
          </div>

          <div className="mt-6 flex justify-end">
            <LoadingButton className="ms-3 text-red-600" loading={processing}>
              Delete Account
            </LoadingButton>
          </div>
        </form>
      </Modal>
    </section>
  );
}
