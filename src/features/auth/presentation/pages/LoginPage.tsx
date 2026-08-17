'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AuthLayout from '@/features/auth/presentation/components/AuthLayout';
import AuthTabs from '@/features/auth/presentation/components/AuthTabs';
import PasswordField from '@/features/auth/presentation/components/PasswordField';
import { ApiError, login } from '@/features/auth/data/authApi';
import { fieldErrorsFrom, loginSchema } from '@/features/auth/presentation/lib/validation';

export default function LoginPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ identifier?: string; password?: string }>({});
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const validation = loginSchema.safeParse({ identifier, password });
    if (!validation.success) {
      setFieldErrors(fieldErrorsFrom(validation.error));
      return;
    }
    setFieldErrors({});
    setSubmitting(true);

    try {
      const challenge = await login(validation.data);
      const params = new URLSearchParams({
        mode: 'login',
        challengeId: challenge.challengeId,
        maskedEmail: challenge.maskedEmail,
        identifier: validation.data.identifier,
      });
      router.push(`/verify-otp?${params.toString()}`);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Something went wrong. Please try again.');
      setSubmitting(false);
    }
  }

  return (
    <AuthLayout>
      <AuthTabs active="login" />

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="identifier"
            className="mb-1 block text-sm font-medium text-body"
          >
            Email or phone
          </label>
          <input
            id="identifier"
            type="text"
            placeholder="Enter your registered email or phone"
            value={identifier}
            onChange={(event) => {
              setIdentifier(event.target.value);
              setFieldErrors((prev) => ({ ...prev, identifier: undefined }));
            }}
            className={`w-full rounded-control border bg-white px-3 py-2 text-sm text-ink placeholder:text-faint ${
              fieldErrors.identifier
                ? 'border-danger focus:border-red-500'
                : 'border-border-strong focus:border-primary'
            }`}
          />
          {fieldErrors.identifier && (
            <p className="mt-1 text-xs text-danger">{fieldErrors.identifier}</p>
          )}
        </div>

        <div>
          <PasswordField
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChange={(value) => {
              setPassword(value);
              setFieldErrors((prev) => ({ ...prev, password: undefined }));
            }}
          />
          {fieldErrors.password && (
            <p className="mt-1 text-xs text-danger">{fieldErrors.password}</p>
          )}
        </div>

        {error && <p className="text-sm text-danger">{error}</p>}

        <div className="text-right">
          <Link
            href="/forgot-password"
            className="text-sm font-semibold text-body underline decoration-gray-300 underline-offset-2 hover:text-ink"
          >
            Forgot your password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={submitting || !identifier || !password}
          className="w-full rounded-control bg-primary py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-strong disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting ? 'Signing in…' : 'Continue to login'}
        </button>
      </form>
    </AuthLayout>
  );
}
