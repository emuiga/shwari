'use client';

import { useRouter } from 'next/navigation';
import AuthLayout from '@/features/auth/presentation/components/AuthLayout';
import PasswordField from '@/features/auth/presentation/components/PasswordField';

export default function AdminLoginPage() {
  const router = useRouter();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // TODO: wire up real admin authentication once the auth APIs are available
    router.push('/admin/dashboard');
  }

  return (
    <AuthLayout>
      <h1 className="text-xl font-bold text-ink">Admin Login</h1>
      <p className="mt-1 text-sm text-subtle">Sign in with your Movvapp admin credentials.</p>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-body">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your admin email"
            className="w-full rounded-control border border-border-strong bg-white px-3 py-2 text-sm text-ink placeholder:text-faint focus:border-primary"
          />
        </div>

        <PasswordField label="Password" placeholder="Enter your password" />

        <button
          type="submit"
          className="w-full rounded-control bg-primary py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-strong"
        >
          Continue to admin dashboard
        </button>
      </form>
    </AuthLayout>
  );
}
