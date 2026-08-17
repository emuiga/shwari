'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';
import AuthLayout from '@/features/auth/presentation/components/AuthLayout';
import BackButton from '@/features/auth/presentation/components/BackButton';
import OtpCodeInput from '@/features/auth/presentation/components/OtpCodeInput';
import { useResendTimer } from '@/features/auth/presentation/hooks/useResendTimer';
import { ApiError, resendLoginMfa, verifyLoginMfa } from '@/features/auth/data/authApi';
import { consumePendingName } from '@/features/auth/data/pendingProfile';
import { updateMyProfile } from '@/features/auth/data/usersApi';

function OtpVerificationForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const challengeId = searchParams.get('challengeId');
  const maskedEmail = searchParams.get('maskedEmail');
  const identifier = searchParams.get('identifier');

  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(false);
  const { remaining, canResend, reset } = useResendTimer(30);
  const canVerify = challengeId !== null && code.every((digit) => digit !== '');

  async function handleVerify() {
    if (!challengeId) return;
    setError(null);
    setVerifying(true);

    try {
      await verifyLoginMfa({ challengeId, code: code.join('') });

      const pendingName = identifier ? consumePendingName(identifier) : null;
      if (pendingName) {
        await updateMyProfile({ fullName: pendingName }).catch(() => null);
      }

      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Something went wrong. Please try again.');
      setVerifying(false);
    }
  }

  async function handleResend() {
    if (!challengeId) return;
    reset();
    await resendLoginMfa({ challengeId }).catch(() => null);
  }

  if (!challengeId) {
    return (
      <AuthLayout>
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-ink">Nothing to verify</h2>
          <p className="text-sm text-subtle">
            Please sign in again to receive a new verification code.
          </p>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <BackButton onClick={() => router.back()} />

      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-ink">
            Verification Code
          </h2>
          <p className="text-sm text-subtle">
            Enter the secure code sent to{' '}
            <span className="font-medium text-body">
              {maskedEmail ?? 'your registered email'}
            </span>
          </p>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium text-body">
            Enter secure code
          </p>
          <OtpCodeInput length={6} value={code} onChange={setCode} />
          {error && <p className="mt-2 text-xs text-danger">{error}</p>}
          <p className="mt-2 text-xs text-subtle">
            Have not received secure code?{' '}
            <button
              type="button"
              disabled={!canResend}
              onClick={handleResend}
              className="font-semibold text-body underline decoration-gray-300 underline-offset-2 hover:text-ink disabled:cursor-not-allowed disabled:text-faint disabled:no-underline"
            >
              Resend{!canResend && ` (${remaining}s)`}
            </button>
          </p>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="w-full rounded-control border border-primary py-2.5 text-sm font-semibold text-primary-strong transition-colors hover:bg-primary-subtle"
          >
            Previous
          </button>
          <button
            type="button"
            disabled={!canVerify || verifying}
            onClick={handleVerify}
            className="w-full rounded-control bg-primary py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-strong disabled:cursor-not-allowed disabled:opacity-50"
          >
            {verifying ? 'Verifying…' : 'Verify Secure Code'}
          </button>
        </div>
      </div>
    </AuthLayout>
  );
}

export default function OtpVerificationPage() {
  return (
    <Suspense fallback={null}>
      <OtpVerificationForm />
    </Suspense>
  );
}
