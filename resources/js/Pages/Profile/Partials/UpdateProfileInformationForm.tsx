import { Auth } from "@/types";
import { useForm, usePage } from "@inertiajs/react";
import TextInput from "@/Components/Form/TextInput";
import FieldGroup from "@/Components/Form/FieldGroup";
import LoadingButton from "@/Components/Button/LoadingButton";
import { capitalizeFirstLetter } from "@/utils/parse";

export default function UpdateProfileInformationForm({
  className = "",
}: {
  className?: string;
}) {
  const user = usePage<{ auth: Auth }>().props.auth.user;

  const { data, setData, patch, errors, processing } = useForm({
    name: user.name,
    email: user.email,
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    patch(route("profile.update"));
  };

  return (
    <section className={className}>
      <header>
        <h2 className="text-lg font-medium text-gray-900">
          Profile Information
        </h2>

        <p className="mt-1 text-sm text-gray-600">
          Update your account's profile information and email address.
        </p>
      </header>

      <form onSubmit={submit} className="mt-6 space-y-6">
        <FieldGroup label="Name" name="name" error={errors.name}>
          <TextInput
            name="name"
            value={data.name}
            onChange={(e) => setData("name", e.target.value)}
            required
            autoComplete="name"
          />
        </FieldGroup>

        <FieldGroup label="Email" name="email" error={errors.email}>
          <TextInput
            name="email"
            type="email"
            value={data.email}
            onChange={(e) => setData("email", e.target.value)}
            required
            autoComplete="email"
          />
        </FieldGroup>

        <FieldGroup
          label="Role (readonly)"
          name="display_role"
          error={errors.email}
        >
          <TextInput
            disabled
            name="display_role"
            value={capitalizeFirstLetter(user.role || "user")}
          />
        </FieldGroup>

        <LoadingButton
          type="submit"
          className="btn-indigo"
          loading={processing}
        >
          Update Profile
        </LoadingButton>
      </form>
    </section>
  );
}
