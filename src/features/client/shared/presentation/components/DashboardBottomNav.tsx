'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BookmarkIcon,
  ChatIcon,
  ClipboardIcon,
  CompassIcon,
  StarIcon,
} from '@/components/icons';

const BOTTOM_NAV_ITEMS = [
  { label: 'Explore', href: '/dashboard', icon: CompassIcon },
  { label: 'Requests', href: '/service-requests', icon: ClipboardIcon },
  { label: 'Saved', href: '/saved-providers', icon: BookmarkIcon },
  { label: 'Messages', href: '/messages', icon: ChatIcon },
  { label: 'Reviews', href: '/my-reviews', icon: StarIcon },
];

export default function DashboardBottomNav() {
  const pathname = usePathname() ?? '';

  return (
    <nav className="fixed bottom-0 left-0 z-40 grid w-full grid-cols-5 border-t border-gray-100 bg-white pb-[env(safe-area-inset-bottom)] lg:hidden">
      {BOTTOM_NAV_ITEMS.map((item) => {
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
            <span className="w-full truncate px-0.5 text-center leading-tight">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
