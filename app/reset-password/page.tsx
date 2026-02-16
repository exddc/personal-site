'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { FormEvent, Suspense, useMemo, useState } from 'react';

const MIN_PASSWORD_LENGTH = 8;

function ResetPasswordPageContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const token = useMemo(() => searchParams.get('token') ?? '', [searchParams]);
    const linkError = useMemo(
        () => searchParams.get('error') ?? '',
        [searchParams],
    );

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);

        if (!token) {
            setError('This reset link is invalid or expired.');
            return;
        }

        if (password.length < MIN_PASSWORD_LENGTH) {
            setError(`Password must be at least ${MIN_PASSWORD_LENGTH} characters.`);
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ newPassword: password, token }),
            });

            const data = (await response.json().catch(() => null)) as
                | { status?: boolean; message?: string }
                | null;

            if (!response.ok || !data?.status) {
                setError(data?.message ?? 'Could not reset password. The link may be expired.');
                return;
            }

            router.push('/login?reset=success');
            router.refresh();
        } catch {
            setError('Could not reset password right now. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const showInvalidLink = !token || linkError === 'INVALID_TOKEN';

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Set New Password
                    </h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Choose a new password for your account.
                    </p>
                </div>

                {showInvalidLink ? (
                    <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-700 p-6 bg-white dark:bg-gray-800">
                        <p className="text-sm text-red-600 dark:text-red-400">
                            This reset link is invalid or expired.
                        </p>
                        <Link
                            href="/forgot-password"
                            className="inline-flex text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400"
                        >
                            Request a new reset link
                        </Link>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                        <div className="space-y-4">
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    New password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    minLength={MIN_PASSWORD_LENGTH}
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                    className="mt-1 block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                                    placeholder="••••••••"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="confirmPassword"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    Confirm password
                                </label>
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    minLength={MIN_PASSWORD_LENGTH}
                                    value={confirmPassword}
                                    onChange={(event) => setConfirmPassword(event.target.value)}
                                    className="mt-1 block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="p-3 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-lg">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {isSubmitting ? 'Updating password...' : 'Update password'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={null}>
            <ResetPasswordPageContent />
        </Suspense>
    );
}
