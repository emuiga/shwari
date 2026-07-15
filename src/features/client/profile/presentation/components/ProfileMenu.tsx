'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { ChevronDownIcon } from '@/components/icons';

interface ProfileMenuProps {
  avatarSrc: string;
}

const MENU_ITEMS = [
  { label: 'Profile', href: '/profile' },
  { label: 'Settings', href: '/settings' },
  { label: 'Help Center', href: '/help-center' },
];

export default function ProfileMenu({ avatarSrc }: ProfileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="flex items-center gap-1.5"
      >
        <div className="relative ml-1 h-9 w-9">
          <Image
            src={avatarSrc}
            alt="User avatar"
            fill
            sizes="36px"
            className="rounded-full object-cover"
          />
          <Image
            src="/icons/verified.png"
            alt="Verified"
            width={18}
            height={18}
            className="absolute -bottom-1 -left-1 rounded-full border-2 border-white"
          />
        </div>
        <ChevronDownIcon
          className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-10 cursor-default"
          />
          <div className="absolute right-0 z-20 mt-2 w-48 rounded-xl border border-gray-100 bg-white py-1.5 shadow-lg">
            {MENU_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
              >
                {item.label}
              </Link>
            ))}
            <div className="my-1.5 border-t border-gray-100" />
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-50"
            >
              Log out
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
