import { PageProps } from '@/types';
import alert from '@/utils/sweet.alert';
import { FormEventHandler } from 'react';
import { useForm } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Login({ status }: PageProps<{ status?: string }>) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'), {
            onProgress: () => {
                alert.fire({
                    title: 'Logging in...',
                    icon: 'info',
                    showConfirmButton: false,
                    allowOutsideClick: false,
                });
            },
            onSuccess: () => {
                alert.fire({
                    title: 'Logged in!',
                    icon: 'success',
                });
            },
            onError: () => {
                alert.fire({
                    title: 'Whoops!',
                    text: 'Something went wrong.',
                    icon: 'error',
                });
            },
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout title="Log in">
            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        Log in
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
