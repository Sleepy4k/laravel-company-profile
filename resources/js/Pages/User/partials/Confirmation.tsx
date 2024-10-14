import CloseButton from "@/Components/Button/CloseButton";
import LoadingButton from "@/Components/Button/LoadingButton";
import FieldGroup from "@/Components/Form/FieldGroup";
import TextInput from "@/Components/Form/TextInput";
import Modal from "@/Components/Modal/Modal";

type IDeleteData = {
  uuid: any;
  name: string;
  email: string;
};

type ConfirmationProps = {
  isFailed?: boolean;
  loadingState: boolean;
  confirmingUserDeletion: boolean;
  userDeleteData: IDeleteData | null;
  closeModal: () => void;
  handleDeleteUser: (e: any) => void;
};

export default function Confirmation({
  isFailed,
  loadingState,
  confirmingUserDeletion,
  userDeleteData,
  closeModal,
  handleDeleteUser,
}: ConfirmationProps) {
  return (
    <Modal show={confirmingUserDeletion} onClose={closeModal}>
      <CloseButton onClick={closeModal} color="green" />
      <form className="p-6" onSubmit={handleDeleteUser}>
        <h2 className="text-lg font-medium text-gray-900">
          Are you sure you want to delete {userDeleteData?.name} user?
        </h2>

        <p className="mt-1 text-sm text-gray-600">
          Once you delete this user, all of its resources and data will be
          permanently deleted. Please enter this user email (
          <b>{userDeleteData?.email}</b>) to confirm you would like to
          permanently delete this user.
        </p>

        <div className="mt-6">
          <FieldGroup
            label="Email"
            name="email"
            error={isFailed ? "Failed to removed user" : ""}
          >
            <TextInput
              name="email"
              autoComplete="email"
              placeholder="User Email"
              error={isFailed ? "Failed to removed user" : ""}
            />
          </FieldGroup>
        </div>

        <div className="mt-6 flex justify-end">
          <LoadingButton className="ms-3 text-red-600" loading={loadingState}>
            Delete User
          </LoadingButton>
        </div>
      </form>
    </Modal>
  );
}
