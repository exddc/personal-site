'use client';

import React, { FormEvent, useState } from 'react';

const MIN_PASSWORD_LENGTH = 8;

type ChangePasswordError = {
    error?: { message?: string } | string;
    message?: string;
};

function resolveErrorMessage(payload: ChangePasswordError | null) {
    if (!payload) {
        return null;
    }

    if (typeof payload.error === 'string' && payload.error.length > 0) {
        return payload.error;
    }

    if (payload.error && typeof payload.error === 'object') {
        const message = payload.error.message;
        if (typeof message === 'string' && message.length > 0) {
            return message;
        }
    }

    if (typeof payload.message === 'string' && payload.message.length > 0) {
        return payload.message;
    }

    return null;
}

export default function AdminAccountPage() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);
        setSuccess(null);

        if (newPassword.length < MIN_PASSWORD_LENGTH) {
            setError(`Das Passwort muss mindestens ${MIN_PASSWORD_LENGTH} Zeichen haben.`);
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('Die neuen Passwörter stimmen nicht überein.');
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch('/api/auth/change-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    currentPassword,
                    newPassword,
                    revokeOtherSessions: false,
                }),
            });

            const payload = (await response.json().catch(() => null)) as ChangePasswordError | null;

            if (!response.ok) {
                setError(
                    resolveErrorMessage(payload) ??
                        'Das Passwort konnte nicht geändert werden. Bitte prüfe dein aktuelles Passwort.',
                );
                return;
            }

            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
            setSuccess('Dein Passwort wurde erfolgreich geändert.');
        } catch {
            setError('Das Passwort konnte gerade nicht geändert werden. Bitte versuche es erneut.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-8">
            <header className="border-b border-neutral-200 h-16 px-8 flex items-center shrink-0">
                <div>
                    <h1 className="text-2xl font-light tracking-tight text-neutral-900">Konto</h1>
                    <p className="mt-1 text-sm text-neutral-500">Passwort für deinen Login aktualisieren.</p>
                </div>
            </header>

            <div className="px-8 pb-12">
                <section className="max-w-xl border border-neutral-200 bg-white p-6">
                    <h2 className="text-lg font-medium text-neutral-900">Passwort ändern</h2>

                    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                        <label className="block">
                            <span className="block text-sm font-medium text-neutral-700 mb-1">
                                Aktuelles Passwort
                            </span>
                            <input
                                type="password"
                                autoComplete="current-password"
                                value={currentPassword}
                                onChange={(event) => setCurrentPassword(event.target.value)}
                                required
                                className="w-full px-3 py-2 border border-neutral-200 rounded text-sm focus:outline-none focus:border-neutral-400"
                            />
                        </label>

                        <label className="block">
                            <span className="block text-sm font-medium text-neutral-700 mb-1">
                                Neues Passwort
                            </span>
                            <input
                                type="password"
                                autoComplete="new-password"
                                minLength={MIN_PASSWORD_LENGTH}
                                value={newPassword}
                                onChange={(event) => setNewPassword(event.target.value)}
                                required
                                className="w-full px-3 py-2 border border-neutral-200 rounded text-sm focus:outline-none focus:border-neutral-400"
                            />
                        </label>

                        <label className="block">
                            <span className="block text-sm font-medium text-neutral-700 mb-1">
                                Neues Passwort bestätigen
                            </span>
                            <input
                                type="password"
                                autoComplete="new-password"
                                minLength={MIN_PASSWORD_LENGTH}
                                value={confirmPassword}
                                onChange={(event) => setConfirmPassword(event.target.value)}
                                required
                                className="w-full px-3 py-2 border border-neutral-200 rounded text-sm focus:outline-none focus:border-neutral-400"
                            />
                        </label>

                        {(error || success) && (
                            <div
                                className={`border px-4 py-3 text-sm ${
                                    error
                                        ? 'border-red-200 bg-red-50 text-red-700'
                                        : 'border-green-200 bg-green-50 text-green-700'
                                }`}
                            >
                                {error ?? success}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="inline-flex items-center px-3 py-1.5 text-sm bg-neutral-900 text-white rounded hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Passwort wird geändert...' : 'Passwort ändern'}
                        </button>
                    </form>
                </section>
            </div>
        </div>
    );
}
