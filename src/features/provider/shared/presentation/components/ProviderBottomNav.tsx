'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PROVIDER_NAV_ITEMS } from '@/features/provider/shared/presentation/lib/providerNav';

export default function ProviderBottomNav() {
  const pathname = usePathname() ?? '';

  return (
    <nav className="fixed bottom-0 left-0 z-40 grid w-full grid-cols-5 border-t border-border-soft bg-white pb-[env(safe-area-inset-bottom)] lg:hidden">
      {PROVIDER_NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex min-w-0 flex-col items-center gap-0.5 py-2 text-[10px] font-medium ${
              isActive ? 'text-primary-strong' : 'text-subtle'
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
