'use client';

import Link from 'next/link';
import React, { FormEvent, useState } from 'react';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDone, setIsDone] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const redirectTo = `${window.location.origin}/reset-password`;

            await fetch('/api/auth/request-password-reset', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, redirectTo }),
            });

            setIsDone(true);
        } catch {
            setError('Could not send reset email right now. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Reset Password
                    </h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Enter your email and we will send a reset link.
                    </p>
                </div>

                {isDone ? (
                    <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-700 p-6 bg-white dark:bg-gray-800">
                        <p className="text-sm text-gray-700 dark:text-gray-200">
                            If an account exists for this email, a reset link has been sent.
                        </p>
                        <Link
                            href="/login"
                            className="inline-flex text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400"
                        >
                            Back to login
                        </Link>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                Email address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                className="mt-1 block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                                placeholder="you@example.com"
                            />
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
                            {isSubmitting ? 'Sending reset link...' : 'Send reset link'}
                        </button>

                        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                            <Link
                                href="/login"
                                className="text-blue-600 hover:text-blue-500 dark:text-blue-400"
                            >
                                Back to login
                            </Link>
                        </p>
                    </form>
                )}
            </div>
        </div>
    );
}
