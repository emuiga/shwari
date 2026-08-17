'use client';

import Link from 'next/link';
import { useState } from 'react';
import AuthLayout from '@/features/auth/presentation/components/AuthLayout';
import AuthTabs from '@/features/auth/presentation/components/AuthTabs';
import ProgressBar from '@/features/auth/presentation/components/ProgressBar';
import AccountTypeStep from '@/features/auth/presentation/components/register/AccountTypeStep';
import AccountDetailsStep, {
  type AccountDetails,
} from '@/features/auth/presentation/components/register/AccountDetailsStep';
import { ApiError, register, resendConfirmation } from '@/features/auth/data/authApi';
import { savePendingName } from '@/features/auth/data/pendingProfile';
import type { PrimaryRole } from '@/features/auth/data/types';
import { fieldErrorsFrom, registerDetailsSchema } from '@/features/auth/presentation/lib/validation';

export type AccountType = 'provider' | 'customer';

const TOTAL_STEPS = 2;

const PRIMARY_ROLE_BY_ACCOUNT_TYPE: Record<AccountType, PrimaryRole> = {
  provider: 'SERVICE_PROVIDER',
  customer: 'CUSTOMER',
};

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [accountType, setAccountType] = useState<AccountType | null>(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [details, setDetails] = useState<AccountDetails>({
    name: '',
    email: '',
    phone: '',
  });
  const [detailsErrors, setDetailsErrors] = useState<Partial<Record<keyof AccountDetails, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [registered, setRegistered] = useState(false);
  const [resendState, setResendState] = useState<'idle' | 'sending' | 'sent'>('idle');

  const goToStep = (next: number) => setStep(Math.min(Math.max(next, 1), TOTAL_STEPS));

  async function handleSubmitDetails() {
    if (!accountType) return;

    const validation = registerDetailsSchema.safeParse(details);
    if (!validation.success) {
      setDetailsErrors(fieldErrorsFrom(validation.error));
      return;
    }
    setDetailsErrors({});
    setSubmitting(true);
    setError(null);

    try {
      await register({
        email: validation.data.email,
        phone: validation.data.phone,
        primaryRole: PRIMARY_ROLE_BY_ACCOUNT_TYPE[accountType],
      });
      savePendingName(validation.data.email, validation.data.name);
      setRegistered(true);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleResendConfirmation() {
    setResendState('sending');
    await resendConfirmation({ email: details.email }).catch(() => null);
    setResendState('sent');
  }

  if (registered) {
    return (
      <AuthLayout>
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-ink">
              Check your email
            </h2>
            <p className="text-sm text-subtle">
              We&apos;ve sent a confirmation link to{' '}
              <span className="font-medium text-body">{details.email}</span>.
              Open it to confirm your account and set your password.
            </p>
          </div>

          <button
            type="button"
            disabled={resendState !== 'idle'}
            onClick={handleResendConfirmation}
            className="w-full rounded-control border border-primary py-2.5 text-sm font-semibold text-primary-strong transition-colors hover:bg-primary-subtle disabled:cursor-not-allowed disabled:opacity-50"
          >
            {resendState === 'sent' ? 'Confirmation link resent' : 'Resend confirmation email'}
          </button>

          <Link
            href="/login"
            className="block w-full rounded-control bg-primary py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-primary-strong"
          >
            Back to Login
          </Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <AuthTabs active="register" />

      <div className="mt-6 space-y-6">
        <ProgressBar step={step} totalSteps={TOTAL_STEPS} />

        {step === 1 && (
          <AccountTypeStep
            accountType={accountType}
            acceptedTerms={acceptedTerms}
            onSelectAccountType={setAccountType}
            onToggleTerms={setAcceptedTerms}
            onContinue={() => goToStep(2)}
          />
        )}

        {step === 2 && (
          <div className="space-y-4">
            <AccountDetailsStep
              details={details}
              errors={detailsErrors}
              onChange={(next) => {
                setDetails(next);
                setDetailsErrors({});
              }}
              onContinue={handleSubmitDetails}
            />
            {error && <p className="text-sm text-danger">{error}</p>}
            {submitting && <p className="text-sm text-subtle">Creating your account…</p>}
          </div>
        )}
      </div>
    </AuthLayout>
  );
}
