import CloseButton from "@/Components/Button/CloseButton";
import LoadingButton from "@/Components/Button/LoadingButton";
import FieldGroup from "@/Components/Form/FieldGroup";
import TextInput from "@/Components/Form/TextInput";
import Modal from "@/Components/Modal/Modal";

type IDeleteData = {
  uuid: any;
  key: string;
  group: string;
};

type ConfirmationProps = {
  isFailed?: boolean;
  loadingState: boolean;
  confirmingTranslateDeletion: boolean;
  translateDeleteData: IDeleteData | null;
  closeModal: () => void;
  handleDeleteTranslate: (e: any) => void;
};

export default function Confirmation({
  isFailed,
  loadingState,
  confirmingTranslateDeletion,
  translateDeleteData,
  closeModal,
  handleDeleteTranslate,
}: ConfirmationProps) {
  return (
    <Modal show={confirmingTranslateDeletion} onClose={closeModal}>
      <CloseButton onClick={closeModal} color="green" />
      <form className="p-6" onSubmit={handleDeleteTranslate}>
        <h2 className="text-lg font-medium text-gray-900">
          Are you sure you want to delete "{translateDeleteData?.key}" translate?
        </h2>

        <p className="mt-1 text-sm text-gray-600">
          Once you delete this translate, all of its resources and data will be
          permanently deleted. Please enter this translate key (
          <b>{`${translateDeleteData?.group}.${translateDeleteData?.key}`}</b>)
          to confirm you would like to permanently delete this translate.
        </p>

        <div className="mt-6">
          <FieldGroup
            label="Key"
            name="key"
            error={isFailed ? "Failed to removed translate" : ""}
          >
            <TextInput
              name="key"
              autoComplete="key"
              placeholder="Translate Key"
              error={isFailed ? "Failed to removed translate" : ""}
            />
          </FieldGroup>
        </div>

        <div className="mt-6 flex justify-end">
          <LoadingButton className="ms-3 text-red-600" loading={loadingState}>
            Delete Translate
          </LoadingButton>
        </div>
      </form>
    </Modal>
  );
}
