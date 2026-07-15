'use client';

import type { ComponentType } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronLeftIcon, ChevronRightIcon } from '@/components/icons';
import { useSidebar } from '@/lib/context/SidebarContext';
import { PROVIDER_NAV_ITEMS, PROVIDER_PROFILE_NAV_ITEMS } from '@/features/provider/shared/presentation/lib/providerNav';

export default function ProviderSidebar() {
  const { isOpen, toggle } = useSidebar();
  const pathname = usePathname() ?? '';

  return (
    <aside
      className={`fixed left-0 top-0 z-40 hidden h-screen shrink-0 flex-col border-r border-gray-100 bg-white transition-all duration-300 lg:flex ${
        isOpen ? 'w-60' : 'w-[72px]'
      }`}
    >
      <div className={`flex items-center gap-2 px-4 py-5 ${!isOpen && 'justify-center'}`}>
        <Image src="/images/moving-truck-green.png" alt="" width={28} height={28} />
        {isOpen && <span className="font-heading text-lg font-bold text-gray-900">Movvapp</span>}
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-2">
        {PROVIDER_NAV_ITEMS.map((item) => (
          <SidebarLink key={item.href} item={item} isOpen={isOpen} pathname={pathname} />
        ))}

        <p className={`mt-6 px-3 pb-1 text-xs font-semibold text-gray-400 ${!isOpen && 'text-center'}`}>
          {isOpen ? 'Profile' : '—'}
        </p>
        {PROVIDER_PROFILE_NAV_ITEMS.map((item) => (
          <SidebarLink key={item.href} item={item} isOpen={isOpen} pathname={pathname} />
        ))}
      </nav>

      <button
        type="button"
        onClick={toggle}
        aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
        className="absolute -right-3 top-16 flex h-6 w-6 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-sm hover:bg-gray-50"
      >
        {isOpen ? <ChevronLeftIcon className="h-3.5 w-3.5" /> : <ChevronRightIcon className="h-3.5 w-3.5" />}
      </button>
    </aside>
  );
}

interface SidebarLinkProps {
  item: { label: string; href: string; icon: ComponentType<{ className?: string }> };
  isOpen: boolean;
  pathname: string;
}

function SidebarLink({ item, isOpen, pathname }: SidebarLinkProps) {
  const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
  const Icon = item.icon;

  return (
    <div className="relative">
      {isActive && <span className="absolute right-0 top-0 bottom-0 w-0.5 rounded-full bg-green-600" />}
      <Link
        href={item.href}
        title={isOpen ? undefined : item.label}
        className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
          isActive ? 'bg-green-50 text-green-600' : 'text-gray-600 hover:bg-gray-50'
        } ${!isOpen && 'justify-center'}`}
      >
        <Icon className="h-[18px] w-[18px] shrink-0" />
        {isOpen && <span className="truncate">{item.label}</span>}
      </Link>
    </div>
  );
}
