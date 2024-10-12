import CloseButton from "@/Components/Button/CloseButton";
import LoadingButton from "@/Components/Button/LoadingButton";
import FieldGroup from "@/Components/Form/FieldGroup";
import TextInput from "@/Components/Form/TextInput";
import Modal from "@/Components/Modal/Modal";

type IDeleteData = {
  uuid: any;
  key: string;
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
          Are you sure you want to delete {settingDeleteData?.name} setting?
        </h2>

        <p className="mt-1 text-sm text-gray-600">
          Once you delete this setting, all of its resources and data will be
          permanently deleted. Please enter this setting key (
          <b>{settingDeleteData?.key}</b>) to confirm you would like to
          permanently delete this setting.
        </p>

        <div className="mt-6">
          <FieldGroup
            label="Key"
            name="key"
            error={isFailed ? "Failed to removed setting" : ""}
          >
            <TextInput
              name="key"
              autoComplete="key"
              placeholder="Setting Name"
              error={isFailed ? "Failed to removed setting" : ""}
            />
          </FieldGroup>
        </div>

        <div className="mt-6 flex justify-end">
          <LoadingButton className="ms-3 text-red-600" loading={loadingState}>
            Delete Setting
          </LoadingButton>
        </div>
      </form>
    </Modal>
  );
}
