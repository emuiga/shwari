'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ChevronDownIcon } from '@/components/icons';
import { DEFAULT_AVATAR, getRandomAvatar } from '@/lib/avatars';
import { logout } from '@/features/auth/data/authApi';
import { useActiveRole } from '@/features/auth/presentation/context/ActiveRoleContext';
import { useSwitchProfile } from '@/features/auth/presentation/hooks/useSwitchProfile';

const MENU_ITEMS = [
  { label: 'Profile', href: '/profile' },
  { label: 'Company Profile', href: '/company-profile' },
  { label: 'Subscriptions', href: '/subscriptions' },
];

export default function ProviderProfileMenu() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [avatarSrc, setAvatarSrc] = useState(DEFAULT_AVATAR);
  const { memberships } = useActiveRole();
  const { switchTo, switching, error } = useSwitchProfile();
  const canSwitchToCustomer = memberships.includes('CUSTOMER');

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- randomize only after mount to avoid SSR/CSR mismatch
    setAvatarSrc(getRandomAvatar());
  }, []);

  return (
    <div className="relative">
      <button type="button" onClick={() => setIsOpen((open) => !open)} className="flex items-center gap-1.5">
        <div className="relative ml-1 h-9 w-9">
          <Image src={avatarSrc} alt="User avatar" fill sizes="36px" className="rounded-full object-cover" />
          <Image
            src="/icons/verified.png"
            alt="Verified"
            width={18}
            height={18}
            className="absolute -bottom-1 -left-1 rounded-full border-2 border-white"
          />
        </div>
        <ChevronDownIcon className={`h-4 w-4 text-faint transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-10 cursor-default"
          />
          <div className="absolute right-0 z-20 mt-2 w-48 rounded-xl border border-border-soft bg-white py-1.5 shadow-lg">
            {MENU_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block w-full px-4 py-2 text-left text-sm text-body hover:bg-surface-muted"
              >
                {item.label}
              </Link>
            ))}
            {canSwitchToCustomer && (
              <>
                <div className="my-1.5 border-t border-border-soft" />
                <button
                  type="button"
                  disabled={switching}
                  onClick={() => switchTo('CUSTOMER')}
                  className="block w-full px-4 py-2 text-left text-sm text-body hover:bg-surface-muted disabled:opacity-50"
                >
                  {switching ? 'Switching…' : 'Switch to Customer'}
                </button>
                {error && <p className="px-4 pb-1 text-xs text-danger">{error}</p>}
              </>
            )}
            <div className="my-1.5 border-t border-border-soft" />
            <button
              type="button"
              onClick={async () => {
                setIsOpen(false);
                await logout();
                router.push('/login');
              }}
              className="block w-full px-4 py-2 text-left text-sm text-danger hover:bg-surface-muted"
            >
              Log out
            </button>
          </div>
        </>
      )}
    </div>
  );
}
