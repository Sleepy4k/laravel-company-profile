import { PageProps } from '@/types';
import trans from '@/utils/translate';
import alert from '@/utils/sweet.alert';
import { FormEventHandler, useEffect, useState } from 'react';
import { Link, useForm } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';

interface CurrentPageProps extends PageProps {
    status?: string;
    rateLimiter: {
        max_attempts: number;
        attempts: number;
        remaining: number;
        reset_at: number;
    };
}

export default function Login({ status, rateLimiter }: CurrentPageProps) {
    const [unlockedAt, setUnlockedAt] = useState<number>(rateLimiter.reset_at);
    const langList = {
        'proccessing': trans('page.login.alert.proccessing'),
        'success': trans('page.login.alert.success'),
        'error': trans('page.login.alert.error'),
    };
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
    });

    useEffect(() => {
        setUnlockedAt(rateLimiter.reset_at);
    }, [rateLimiter]);

    useEffect(() => {
        const timeInterval = setInterval(() => {
            setUnlockedAt((prev) => {
                if (prev === 1) {
                    rateLimiter.remaining = rateLimiter.max_attempts;
                    rateLimiter.attempts = 0;
                    clearInterval(timeInterval);
                    return 0;
                }

                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timeInterval);
    }, [rateLimiter]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (rateLimiter.remaining === 0) {
            alert.fire({
                title: 'Whoops!',
                text: 'You are locked out. Please try again later.',
                icon: 'error',
            });

            return;
        }

        post(route('login'), {
            onProgress: () => {
                alert.fire({
                    title: langList.proccessing,
                    icon: 'info',
                    showConfirmButton: false,
                    allowOutsideClick: false,
                });
            },
            onSuccess: () => {
                alert.fire({
                    title: langList.success,
                    icon: 'success',
                });
            },
            onError: () => {
                alert.fire({
                    title: 'Whoops!',
                    text: langList.error,
                    icon: 'error',
                });
            },
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout title="Log in">
            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <form onSubmit={submit} className='mt-4'>
                <div>
                    <InputLabel htmlFor="email" value={ trans('page.login.input.email') } />

                    <TextInput
                        required
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value={ trans('page.login.input.password') } />

                    <TextInput
                        required
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
                    {rateLimiter.remaining === 0 ? (
                        <PrimaryButton className="ms-4 mt-2 mb-4" disabled>
                            Locked out
                        </PrimaryButton>
                    ) : (
                        <PrimaryButton className="ms-4 mt-2 mb-4" disabled={processing}>
                            { trans('page.login.button.submit') }
                        </PrimaryButton>
                    )}
                </div>

                {/* Add warning for x attempts login */}
                {rateLimiter.remaining > 0 && rateLimiter.remaining < 4 && (
                    <div className="mt-4">
                        <p className="text-sm text-red-600">
                            {`Warning: You have ${rateLimiter.remaining} login attempts remaining before you are locked out.`}
                        </p>
                    </div>
                )}

                {/* Inform about reset lockdown at */}
                {rateLimiter.remaining === 0 && (
                    <div className="mt-4">
                        <p className="text-sm text-red-600">
                            {`You are locked out. Please try again in ${unlockedAt} ${unlockedAt > 1 ? 'seconds' : 'second'}.`}
                        </p>
                    </div>
                )}
            </form>
        </GuestLayout>
    );
}
