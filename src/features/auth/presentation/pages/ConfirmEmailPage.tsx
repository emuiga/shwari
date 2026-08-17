'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';
import AuthLayout from '@/features/auth/presentation/components/AuthLayout';
import PasswordField from '@/features/auth/presentation/components/PasswordField';
import PasswordRequirements from '@/features/auth/presentation/components/PasswordRequirements';
import { PASSWORD_RULES } from '@/features/auth/presentation/lib/passwordRules';
import { ApiError, confirmEmail } from '@/features/auth/data/authApi';

function ConfirmEmailForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const passwordsMatch = password.length > 0 && password === confirmPassword;
  const allRulesPass = PASSWORD_RULES.every((rule) => rule.test(password));
  const canContinue = allRulesPass && passwordsMatch;

  if (!token) {
    return (
      <AuthLayout>
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-ink">
              Link expired or invalid
            </h2>
            <p className="text-sm text-subtle">
              This confirmation link may have expired or is invalid. Please
              register again to receive a new one.
            </p>
          </div>

          <Link
            href="/register"
            className="block w-full rounded-control bg-primary py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-primary-strong"
          >
            Back to Register
          </Link>
        </div>
      </AuthLayout>
    );
  }

  if (submitted) {
    return (
      <AuthLayout>
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-ink">
              Account confirmed
            </h2>
            <p className="text-sm text-subtle">
              Your email is confirmed and your password is set. You can now
              log in.
            </p>
          </div>

          <Link
            href="/login"
            className="block w-full rounded-control bg-primary py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-primary-strong"
          >
            Go to Login
          </Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <form
        className="space-y-4"
        onSubmit={async (event) => {
          event.preventDefault();
          if (!canContinue) return;
          setSubmitting(true);
          setError(null);
          try {
            await confirmEmail({ token, password });
            setSubmitted(true);
          } catch (err) {
            setError(err instanceof ApiError ? err.message : 'Something went wrong. Please try again.');
            setSubmitting(false);
          }
        }}
      >
        <div>
          <h2 className="text-lg font-semibold text-ink">
            Confirm your email
          </h2>
          <p className="text-sm text-subtle">
            Set a password to finish creating your account.
          </p>
        </div>

        <PasswordField
          label="Password"
          placeholder="Enter a password"
          value={password}
          onChange={setPassword}
        />

        <PasswordField
          label="Confirm Password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={setConfirmPassword}
        />

        <PasswordRequirements
          password={password}
          passwordsMatch={passwordsMatch}
        />

        {error && <p className="text-sm text-danger">{error}</p>}

        <button
          type="submit"
          disabled={!canContinue || submitting}
          className="w-full rounded-control bg-primary py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-strong disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting ? 'Confirming…' : 'Confirm and set password'}
        </button>
      </form>
    </AuthLayout>
  );
}

export default function ConfirmEmailPage() {
  return (
    <Suspense fallback={null}>
      <ConfirmEmailForm />
    </Suspense>
  );
}
