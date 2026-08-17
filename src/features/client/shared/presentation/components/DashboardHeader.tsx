'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PlusIcon } from '@/components/icons';
import MaskIcon from '@/components/MaskIcon';
import ProfileMenu from '@/features/client/profile/presentation/components/ProfileMenu';
import { DEFAULT_AVATAR, getRandomAvatar } from '@/lib/avatars';

export default function DashboardHeader() {
  const [avatarSrc, setAvatarSrc] = useState(DEFAULT_AVATAR);
  const pathname = usePathname() ?? '';

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- randomize only after mount to avoid SSR/CSR mismatch
    setAvatarSrc(getRandomAvatar());
  }, []);

  return (
    <header className="flex items-center justify-end border-b border-border-soft bg-white px-6 py-4">
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="Create"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-subtle hover:bg-surface-muted"
        >
          <PlusIcon className="h-4 w-4" />
        </button>
        <Link
          href="/saved-providers"
          aria-label="Saved"
          className={`flex h-9 w-9 items-center justify-center rounded-full border ${
            pathname.startsWith('/saved-providers')
              ? 'border-primary-subtle bg-primary-subtle text-primary-strong'
              : 'border-border text-subtle hover:bg-surface-muted'
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
              ? 'border-primary-subtle bg-primary-subtle text-primary-strong'
              : 'border-border text-subtle hover:bg-surface-muted'
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
          className="relative flex h-9 w-9 items-center justify-center rounded-full border border-border text-subtle hover:bg-surface-muted"
        >
          <MaskIcon
            label="Notifications"
            maskClassName="[mask-image:url('/icons/notification.png')] [-webkit-mask-image:url('/icons/notification.png')]"
            className="h-4 w-4"
          />
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-danger text-[10px] font-semibold text-white">
            2
          </span>
        </button>

        <ProfileMenu avatarSrc={avatarSrc} />
      </div>
    </header>
  );
}
