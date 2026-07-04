'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import AuthLayout from '@/features/auth/presentation/components/AuthLayout';
import BackButton from '@/features/auth/presentation/components/BackButton';
import OtpCodeInput from '@/features/auth/presentation/components/OtpCodeInput';
import { useResendTimer } from '@/features/auth/presentation/hooks/useResendTimer';
import { maskEmail, maskPhone } from '@/features/auth/presentation/lib/maskContact';

const PLACEHOLDER_EMAIL = 'steve@gmail.com';
const PLACEHOLDER_PHONE = '0700000000';

export default function OtpVerificationPage() {
  const router = useRouter();
  const [code, setCode] = useState(['', '', '', '']);
  const { remaining, canResend, reset } = useResendTimer(30);
  const canVerify = code.every((digit) => digit !== '');

  return (
    <AuthLayout>
      <BackButton onClick={() => router.back()} />

      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Verification Code
          </h2>
          <p className="text-sm text-gray-500">
            Enter the secure code sent to your email{' '}
            <span className="font-medium text-gray-700">
              {maskEmail(PLACEHOLDER_EMAIL)}
            </span>{' '}
            and phone number{' '}
            <span className="font-medium text-gray-700">
              {maskPhone(PLACEHOLDER_PHONE)}
            </span>
          </p>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium text-gray-700">
            Enter secure code
          </p>
          <OtpCodeInput value={code} onChange={setCode} />
          <p className="mt-2 text-xs text-gray-500">
            Have not received secure code?{' '}
            <button
              type="button"
              disabled={!canResend}
              onClick={reset}
              className="font-semibold text-gray-700 underline decoration-gray-300 underline-offset-2 hover:text-gray-900 disabled:cursor-not-allowed disabled:text-gray-400 disabled:no-underline"
            >
              Resend{!canResend && ` (${remaining}s)`}
            </button>
          </p>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="w-full rounded-md border border-green-500 py-2.5 text-sm font-semibold text-green-600 transition-colors hover:bg-green-50"
          >
            Previous
          </button>
          <button
            type="button"
            disabled={!canVerify}
            className="w-full rounded-md bg-green-500 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Verify Secure Code
          </button>
        </div>
      </div>
    </AuthLayout>
  );
}
