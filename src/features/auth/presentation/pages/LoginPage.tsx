'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AuthLayout from '@/features/auth/presentation/components/AuthLayout';
import AuthTabs from '@/features/auth/presentation/components/AuthTabs';
import PasswordField from '@/features/auth/presentation/components/PasswordField';

export default function LoginPage() {
  const router = useRouter();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // TODO: wire up real authentication once the auth APIs are available
    router.push('/dashboard');
  }

  return (
    <AuthLayout>
      <AuthTabs active="login" />

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
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
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-green-500 focus:outline-none"
          />
        </div>

        <PasswordField label="Password" placeholder="Enter your password" />

        <div className="text-right">
          <Link
            href="/forgot-password"
            className="text-sm font-semibold text-gray-700 underline decoration-gray-300 underline-offset-2 hover:text-gray-900"
          >
            Forgot your password?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-green-500 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-green-600"
        >
          Continue to login
        </button>
      </form>
    </AuthLayout>
  );
}
