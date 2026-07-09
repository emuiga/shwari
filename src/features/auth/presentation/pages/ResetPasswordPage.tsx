'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';
import AuthLayout from '@/features/auth/presentation/components/AuthLayout';
import BackButton from '@/features/auth/presentation/components/BackButton';
import PasswordField from '@/features/auth/presentation/components/PasswordField';
import PasswordRequirements from '@/features/auth/presentation/components/PasswordRequirements';
import { PASSWORD_RULES } from '@/features/auth/presentation/lib/passwordRules';

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const resetToken = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const passwordsMatch = password.length > 0 && password === confirmPassword;
  const allRulesPass = PASSWORD_RULES.every((rule) => rule.test(password));
  const canContinue = allRulesPass && passwordsMatch;

  if (!resetToken) {
    return (
      <AuthLayout>
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Link expired or invalid
            </h2>
            <p className="text-sm text-gray-500">
              This password reset link may have expired or is invalid.
              Please request a new one.
            </p>
          </div>

          <Link
            href="/forgot-password"
            className="block w-full rounded-md bg-green-500 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-green-600"
          >
            Request New Link
          </Link>

          <Link
            href="/login"
            className="block w-full rounded-md border border-green-500 py-2.5 text-center text-sm font-semibold text-green-600 transition-colors hover:bg-green-50"
          >
            Back to Sign In
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
            <h2 className="text-lg font-semibold text-gray-900">
              Password reset successful
            </h2>
            <p className="text-sm text-gray-500">
              Your password has been reset. You can now log in with your new
              password.
            </p>
          </div>

          <Link
            href="/login"
            className="block w-full rounded-md bg-green-500 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-green-600"
          >
            Go to Login
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
            Reset Password
          </h2>
          <p className="text-sm text-gray-500">
            Please make sure your password meets the requirements.
          </p>
        </div>

        <PasswordField
          label="New Password"
          placeholder="Enter new password"
          value={password}
          onChange={setPassword}
        />

        <PasswordField
          label="Confirm Password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={setConfirmPassword}
        />

        <PasswordRequirements
          password={password}
          passwordsMatch={passwordsMatch}
        />

        <button
          type="submit"
          disabled={!canContinue}
          className="w-full rounded-md bg-green-500 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Reset Password
        </button>
      </form>
    </AuthLayout>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={null}>
      <ResetPasswordForm />
    </Suspense>
  );
}
