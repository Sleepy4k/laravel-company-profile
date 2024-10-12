import CloseButton from "@/Components/Button/CloseButton";
import LoadingButton from "@/Components/Button/LoadingButton";
import FieldGroup from "@/Components/Form/FieldGroup";
import TextInput from "@/Components/Form/TextInput";
import Modal from "@/Components/Modal/Modal";

type IDeleteData = {
  uuid: any;
  name: string;
};

type ConfirmationProps = {
  isFailed?: boolean;
  loadingState: boolean;
  confirmingPermissionDeletion: boolean;
  permissionDeleteData: IDeleteData | null;
  closeModal: () => void;
  handleDeletePermission: (e: any) => void;
};

export default function Confirmation({
  isFailed,
  loadingState,
  confirmingPermissionDeletion,
  permissionDeleteData,
  closeModal,
  handleDeletePermission,
}: ConfirmationProps) {
  return (
    <Modal show={confirmingPermissionDeletion} onClose={closeModal}>
      <CloseButton onClick={closeModal} color="green" />
      <form className="p-6" onSubmit={handleDeletePermission}>
        <h2 className="text-lg font-medium text-gray-900">
          Are you sure you want to delete {permissionDeleteData?.name} permission?
        </h2>

        <p className="mt-1 text-sm text-gray-600">
          Once you delete this permission, all of its resources and data will be
          permanently deleted. Please enter this permission name (
          <b>{permissionDeleteData?.name}</b>) to confirm you would like to
          permanently delete this permission.
        </p>

        <div className="mt-6">
          <FieldGroup
            label="Name"
            name="name"
            error={isFailed ? "Failed to removed permission" : ""}
          >
            <TextInput
              name="name"
              autoComplete="name"
              placeholder="Permission Name"
              error={isFailed ? "Failed to removed permission" : ""}
            />
          </FieldGroup>
        </div>

        <div className="mt-6 flex justify-end">
          <LoadingButton className="ms-3 text-red-600" loading={loadingState}>
            Delete Permission
          </LoadingButton>
        </div>
      </form>
    </Modal>
  );
}
