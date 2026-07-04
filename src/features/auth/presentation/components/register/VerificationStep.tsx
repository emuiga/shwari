'use client';

import OtpCodeInput from '@/features/auth/presentation/components/OtpCodeInput';
import { useResendTimer } from '@/features/auth/presentation/hooks/useResendTimer';
import { maskEmail, maskPhone } from '@/features/auth/presentation/lib/maskContact';

interface VerificationStepProps {
  email: string;
  phone: string;
  code: string[];
  onCodeChange: (code: string[]) => void;
  onPrevious: () => void;
  onVerify: () => void;
}

export default function VerificationStep({
  email,
  phone,
  code,
  onCodeChange,
  onPrevious,
  onVerify,
}: VerificationStepProps) {
  const { remaining, canResend, reset } = useResendTimer(30);
  const canVerify = code.every((digit) => digit !== '');

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">
          Verification code
        </h2>
        <p className="text-sm text-gray-500">
          Enter the secure code sent to your email{' '}
          <span className="font-medium text-gray-700">
            {maskEmail(email)}
          </span>{' '}
          and phone number{' '}
          <span className="font-medium text-gray-700">
            {maskPhone(phone)}
          </span>
        </p>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-gray-700">
          Enter secure code
        </p>
        <OtpCodeInput value={code} onChange={onCodeChange} />
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
          onClick={onPrevious}
          className="w-full rounded-md border border-green-500 py-2.5 text-sm font-semibold text-green-600 transition-colors hover:bg-green-50"
        >
          Previous
        </button>
        <button
          type="button"
          disabled={!canVerify}
          onClick={onVerify}
          className="w-full rounded-md bg-green-500 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Verify Secure Code
        </button>
      </div>
    </div>
  );
}
