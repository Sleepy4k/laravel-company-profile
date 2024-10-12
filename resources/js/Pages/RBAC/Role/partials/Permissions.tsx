import Modal from "@/Components/Modal/Modal";

type PermissionsProps = {
  isDisabled?: boolean;
  showModal: boolean;
  closeModal: () => void;
  permissions: any;
  handlePermissionChange?: (e: any) => void;
  currentPermissions: any;
};

export default function Permissions({
  isDisabled = false,
  showModal,
  closeModal,
  permissions,
  handlePermissionChange = () => {},
  currentPermissions,
}: PermissionsProps) {
  const handleInputChange = (e: any) => {
    if (isDisabled) return;

    handlePermissionChange(e);
  };

  return (
    <Modal show={showModal} onClose={closeModal}>
      <div className="p-6 max-h-[calc(100vh-10rem)] overflow-y-auto">
        {permissions.map((data: any) => (
          <>
            <label
              htmlFor={data.group}
              className="block mt-5 mb-2 text-sm font-medium text-gray-700"
            >
              {data.group.toUpperCase()}
            </label>
            <div className="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {data.permissions.map((permission: any) => (
                <>
                  {currentPermissions.includes(permission.name) && isDisabled && (
                    <div key={permission.id} className="flex items-center">
                      <input
                        checked
                        disabled
                        id={`permission-${permission.uuid}`}
                        type="checkbox"
                        name="permissions[]"
                        value={permission.name}
                        className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-600 rounded"
                      />
                      <label
                        htmlFor={`permission-${permission.uuid}`}
                        className="ml-2 block text-sm text-gray-900"
                      >
                        {permission.name}
                      </label>
                    </div>
                  )}

                  {!isDisabled && (
                    <div key={permission.id} className="flex items-center">
                      <input
                        id={`permission-${permission.uuid}`}
                        type="checkbox"
                        name="permissions[]"
                        value={permission.name}
                        onChange={handleInputChange}
                        className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-600 rounded"
                        {...(currentPermissions.includes(
                          permission.name
                      ) && { checked: true })}
                      />
                      <label
                        htmlFor={`permission-${permission.uuid}`}
                        className="ml-2 block text-sm text-gray-900"
                      >
                        {permission.name}
                      </label>
                    </div>
                  )}
                </>
              ))}
            </div>
          </>
        ))}
      </div>
    </Modal>
  );
}
