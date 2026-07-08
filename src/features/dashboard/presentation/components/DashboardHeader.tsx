'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PlusIcon } from '@/features/dashboard/presentation/components/icons';
import MaskIcon from '@/features/dashboard/presentation/components/MaskIcon';
import ProfileMenu from '@/features/dashboard/presentation/components/ProfileMenu';
import { getRandomAvatar } from '@/features/dashboard/presentation/lib/avatars';

export default function DashboardHeader() {
  const avatarSrc = getRandomAvatar();
  const pathname = usePathname() ?? '';

  return (
    <header className="flex items-center justify-end border-b border-gray-100 bg-white px-6 py-4">
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="Create"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50"
        >
          <PlusIcon className="h-4 w-4" />
        </button>
        <Link
          href="/saved-providers"
          aria-label="Saved"
          className={`flex h-9 w-9 items-center justify-center rounded-full border ${
            pathname.startsWith('/saved-providers')
              ? 'border-green-100 bg-green-50 text-green-600'
              : 'border-gray-200 text-gray-500 hover:bg-gray-50'
          }`}
        >
          <MaskIcon
            label="Saved"
            maskClassName="[mask-image:url('/icons/bookmark.png')] [-webkit-mask-image:url('/icons/bookmark.png')]"
            className="h-4 w-4"
          />
        </Link>
        <Link
          href="/messages"
          aria-label="Messages"
          className={`flex h-9 w-9 items-center justify-center rounded-full border ${
            pathname.startsWith('/messages')
              ? 'border-green-100 bg-green-50 text-green-600'
              : 'border-gray-200 text-gray-500 hover:bg-gray-50'
          }`}
        >
          <MaskIcon
            label="Messages"
            maskClassName="[mask-image:url('/icons/send.png')] [-webkit-mask-image:url('/icons/send.png')]"
            className="h-4 w-4"
          />
        </Link>
        <button
          type="button"
          aria-label="Notifications"
          className="relative flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50"
        >
          <MaskIcon
            label="Notifications"
            maskClassName="[mask-image:url('/icons/notification.png')] [-webkit-mask-image:url('/icons/notification.png')]"
            className="h-4 w-4"
          />
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-semibold text-white">
            2
          </span>
        </button>

        <ProfileMenu avatarSrc={avatarSrc} />
      </div>
    </header>
  );
}
