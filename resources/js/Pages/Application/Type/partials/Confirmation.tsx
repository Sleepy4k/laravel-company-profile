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
  confirmingSettingDeletion: boolean;
  settingDeleteData: IDeleteData | null;
  closeModal: () => void;
  handleDeleteSetting: (e: any) => void;
};

export default function Confirmation({
  isFailed,
  loadingState,
  confirmingSettingDeletion,
  settingDeleteData,
  closeModal,
  handleDeleteSetting,
}: ConfirmationProps) {
  return (
    <Modal show={confirmingSettingDeletion} onClose={closeModal}>
      <CloseButton onClick={closeModal} color="green" />
      <form className="p-6" onSubmit={handleDeleteSetting}>
        <h2 className="text-lg font-medium text-gray-900">
          Are you sure you want to delete {settingDeleteData?.name} setting
          type?
        </h2>

        <p className="mt-1 text-sm text-gray-600">
          Once you delete this setting type, all of its resources and data will
          be permanently deleted. Please enter this setting type key (
          <b>{settingDeleteData?.name}</b>) to confirm you would like to
          permanently delete this setting type.
        </p>

        <div className="mt-6">
          <FieldGroup
            label="Name"
            name="name"
            error={isFailed ? "Failed to removed setting type" : ""}
          >
            <TextInput
              name="name"
              autoComplete="name"
              placeholder="Setting Type Name"
              error={isFailed ? "Failed to removed setting type" : ""}
            />
          </FieldGroup>
        </div>

        <div className="mt-6 flex justify-end">
          <LoadingButton className="ms-3 text-red-600" loading={loadingState}>
            Delete Setting Type
          </LoadingButton>
        </div>
      </form>
    </Modal>
  );
}
