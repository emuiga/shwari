import Link from 'next/link';

interface AuthTabsProps {
  active: 'login' | 'register';
}

export default function AuthTabs({ active }: AuthTabsProps) {
  return (
    <div className="flex gap-1 rounded-lg border border-border bg-surface-muted p-1 text-sm">
      <Link
        href="/login"
        className={`flex-1 rounded-control py-2 text-center transition-all ${
          active === 'login'
            ? 'bg-white font-semibold text-ink shadow'
            : 'font-medium text-faint hover:text-body'
        }`}
      >
        Login
      </Link>
      <Link
        href="/register"
        className={`flex-1 rounded-control py-2 text-center transition-all ${
          active === 'register'
            ? 'bg-white font-semibold text-ink shadow'
            : 'font-medium text-faint hover:text-body'
        }`}
      >
        Registration
      </Link>
    </div>
  );
}
