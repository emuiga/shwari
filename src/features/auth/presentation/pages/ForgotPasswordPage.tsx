'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import AuthLayout from '@/features/auth/presentation/components/AuthLayout';
import BackButton from '@/features/auth/presentation/components/BackButton';
import { forgotPassword } from '@/features/auth/data/authApi';
import { emailSchema } from '@/features/auth/presentation/lib/validation';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const canContinue = email.trim() !== '';

  if (submitted) {
    return (
      <AuthLayout>
        <BackButton onClick={() => setSubmitted(false)} />

        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-ink">
              Check your email
            </h2>
            <p className="text-sm text-subtle">
              If an account exists for{' '}
              <span className="font-medium text-body">{email}</span>,
              we&apos;ve sent a link to reset your password. The link expires
              in 30 minutes.
            </p>
          </div>

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
      <BackButton onClick={() => router.back()} />

      <form
        className="space-y-4"
        onSubmit={async (event) => {
          event.preventDefault();
          if (!canContinue) return;

          const validation = emailSchema.safeParse(email);
          if (!validation.success) {
            setEmailError(validation.error.issues[0]?.message ?? 'Enter a valid email address');
            return;
          }
          setEmailError(null);
          setSubmitting(true);
          await forgotPassword({ identifier: validation.data }).catch(() => null);
          setSubmitting(false);
          setSubmitted(true);
        }}
      >
        <div>
          <h2 className="text-lg font-semibold text-ink">
            Forgot Password
          </h2>
          <p className="text-sm text-subtle">
            Enter your registered email and we&apos;ll send you a link to
            reset your password.
          </p>
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-1 block text-sm font-medium text-body"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setEmailError(null);
            }}
            className={`w-full rounded-control border bg-white px-3 py-2 text-sm text-ink placeholder:text-faint ${
              emailError
                ? 'border-danger focus:border-red-500'
                : 'border-border-strong focus:border-primary'
            }`}
          />
          {emailError && <p className="mt-1 text-xs text-danger">{emailError}</p>}
        </div>

        <button
          type="submit"
          disabled={!canContinue || submitting}
          className="w-full rounded-control bg-primary py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-strong disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting ? 'Sending…' : 'Send Reset Link'}
        </button>
      </form>
    </AuthLayout>
  );
}
