'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import AuthLayout from '@/features/auth/presentation/components/AuthLayout';
import BackButton from '@/features/auth/presentation/components/BackButton';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const canContinue = email.trim() !== '';

  if (submitted) {
    return (
      <AuthLayout>
        <BackButton onClick={() => setSubmitted(false)} />

        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Check your email
            </h2>
            <p className="text-sm text-gray-500">
              If an account exists for{' '}
              <span className="font-medium text-gray-700">{email}</span>,
              we&apos;ve sent a link to reset your password. The link expires
              in 30 minutes.
            </p>
          </div>

          <Link
            href="/login"
            className="block w-full rounded-md bg-green-500 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-green-600"
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
        onSubmit={(event) => {
          event.preventDefault();
          if (canContinue) setSubmitted(true);
        }}
      >
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Forgot Password
          </h2>
          <p className="text-sm text-gray-500">
            Enter your registered email and we&apos;ll send you a link to
            reset your password.
          </p>
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-green-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={!canContinue}
          className="w-full rounded-md bg-green-500 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Send Reset Link
        </button>
      </form>
    </AuthLayout>
  );
}
