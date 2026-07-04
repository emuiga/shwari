import Link from 'next/link';

interface AuthTabsProps {
  active: 'login' | 'register';
}

export default function AuthTabs({ active }: AuthTabsProps) {
  return (
    <div className="flex gap-1 rounded-lg border border-gray-200 bg-gray-100 p-1 text-sm">
      <Link
        href="/login"
        className={`flex-1 rounded-md py-2 text-center transition-all ${
          active === 'login'
            ? 'bg-white font-semibold text-gray-900 shadow'
            : 'font-medium text-gray-400 hover:text-gray-600'
        }`}
      >
        Login
      </Link>
      <Link
        href="/register"
        className={`flex-1 rounded-md py-2 text-center transition-all ${
          active === 'register'
            ? 'bg-white font-semibold text-gray-900 shadow'
            : 'font-medium text-gray-400 hover:text-gray-600'
        }`}
      >
        Registration
      </Link>
    </div>
  );
}
