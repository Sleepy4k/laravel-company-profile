import MainLayout from '@/Layouts/MainLayout';
import DeleteUserForm from './partials/DeleteUserForm';
import UpdatePasswordForm from './partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './partials/UpdateProfileInformationForm';

function Edit() {
  return (
    <div className='py-6'>
      <div className='max-w-7xl sm:px-6 lg:px-8 space-y-6'>
        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
          <UpdateProfileInformationForm className="max-w-xl" />
        </div>

        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
          <UpdatePasswordForm className="max-w-xl" />
        </div>

        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
          <DeleteUserForm className="max-w-xl" />
        </div>
      </div>
    </div>
  );
}

/**
 * Persistent Layout (Inertia.js)
 *
 * [Learn more](https://inertiajs.com/pages#persistent-layouts)
 */
Edit.layout = (page: React.ReactNode) => (
  <MainLayout title="Profile" children={page} />
);

export default Edit;
