'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ADMIN_NAV_ITEMS } from '@/features/admin/shared/presentation/lib/adminNav';

export default function AdminBottomNav() {
  const pathname = usePathname() ?? '';

  return (
    <nav className="fixed bottom-0 left-0 z-40 grid w-full grid-cols-1 border-t border-gray-100 bg-white pb-[env(safe-area-inset-bottom)] lg:hidden">
      {ADMIN_NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex min-w-0 flex-col items-center gap-0.5 py-2 text-[10px] font-medium ${
              isActive ? 'text-green-600' : 'text-gray-500'
            }`}
          >
            <Icon className="h-5 w-5 shrink-0" />
            <span className="w-full truncate px-0.5 text-center leading-tight">{item.shortLabel}</span>
          </Link>
        );
      })}
    </nav>
  );
}
