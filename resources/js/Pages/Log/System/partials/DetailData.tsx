import CloseButton from "@/Components/Button/CloseButton";
import FieldGroup from "@/Components/Form/FieldGroup";
import TextArea from "@/Components/Form/TextArea";
import TextInput from "@/Components/Form/TextInput";
import Modal from "@/Components/Modal/Modal";
import { convertDateToLocaleString, makeRowsFromContent } from "@/utils/parse";

type SystemLogData = {
  env: string;
  type: string;
  message: string;
  timestamp: string;
};

type DetailDataProps = {
  isShow: boolean;
  data: SystemLogData | null;
  closeModal: () => void;
};

export default function DetailData({
  data,
  isShow,
  closeModal,
}: DetailDataProps) {
  return (
    <Modal show={isShow} onClose={closeModal}>
      <CloseButton onClick={closeModal} color="green" />
      <div className="p-6">
        <div className="grid gap-8 lg:grid-cols-1">
          <FieldGroup label="Environment" name="env">
            <TextInput disabled name="env" placeholder="-" value={data?.env} />
          </FieldGroup>

          <FieldGroup label="Type" name="type">
            <TextInput
              disabled
              name="type"
              placeholder="-"
              value={data?.type}
            />
          </FieldGroup>

          <FieldGroup label="Message" name="message">
            <TextArea
              disabled
              name="message"
              rows={makeRowsFromContent(data?.message || "-") - 10}
              value={data?.message}
            />
          </FieldGroup>

          <FieldGroup label="Logged At" name="logged_at">
            <TextInput
              disabled
              name="logged_at"
              placeholder="-"
              value={
                convertDateToLocaleString(data?.timestamp || "-") +
                " (" +
                data?.timestamp.split(" ")[1] +
                ")"
              }
            />
          </FieldGroup>
        </div>
      </div>
    </Modal>
  );
}
