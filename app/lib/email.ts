import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;
const resendFromEmail =
    process.env.RESEND_FROM_EMAIL ?? 'litecms@updates.timoweiss.me';
const resendClient = resendApiKey ? new Resend(resendApiKey) : null;
const isProduction = process.env.NODE_ENV === 'production';

export type PasswordResetEmailPurpose = 'reset' | 'invite';

type SendPasswordResetEmailInput = {
    to: string;
    url: string;
    recipientName?: string | null;
    purpose?: PasswordResetEmailPurpose;
};

function getSubject(purpose: PasswordResetEmailPurpose) {
    return purpose === 'invite'
        ? 'You were invited to LiteCMS'
        : 'Reset your LiteCMS password';
}

function getIntro(purpose: PasswordResetEmailPurpose, recipientName?: string | null) {
    const greeting = recipientName ? `Hi ${recipientName},` : 'Hi,';
    const message =
        purpose === 'invite'
            ? 'You were invited to access LiteCMS. Use the secure link below to set your password and sign in.'
            : 'Use the secure link below to reset your LiteCMS password.';

    return { greeting, message };
}

export async function sendPasswordResetEmail({
    to,
    url,
    recipientName,
    purpose = 'reset',
}: SendPasswordResetEmailInput) {
    if (!resendClient) {
        if (isProduction) {
            throw new Error(
                'RESEND_API_KEY is required in production to send password reset emails.',
            );
        }

        console.warn(
            '[auth] RESEND_API_KEY is not set. Falling back to console logging password reset link.',
        );
        console.log('\n========================================');
        console.log('🔐 PASSWORD RESET LINK');
        console.log('========================================');
        console.log(`Email: ${to}`);
        console.log(`Purpose: ${purpose}`);
        console.log(`Reset URL: ${url}`);
        console.log('========================================\n');
        return;
    }

    const { greeting, message } = getIntro(purpose, recipientName);

    await resendClient.emails.send({
        from: `LiteCMS <${resendFromEmail}>`,
        to,
        subject: getSubject(purpose),
        html: `
<p>${greeting}</p>
<p>${message}</p>
<p>
  <a href="${url}" style="display:inline-block;background:#2563eb;color:#ffffff;padding:12px 20px;border-radius:8px;text-decoration:none;font-weight:600;">
    ${purpose === 'invite' ? 'Set Password' : 'Reset Password'}
  </a>
</p>
<p>If the button does not work, copy and paste this URL into your browser:</p>
<p><a href="${url}">${url}</a></p>
<p>If you did not request this, you can ignore this email.</p>
`.trim(),
        text: `${greeting}\n\n${message}\n\n${url}\n\nIf you did not request this, you can ignore this email.`,
    });
}
