'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { ChevronDownIcon } from '@/components/icons';
import { getRandomAvatar } from '@/lib/avatars';

export default function AdminProfileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [avatarSrc] = useState(getRandomAvatar);

  return (
    <div className="relative">
      <button type="button" onClick={() => setIsOpen((open) => !open)} className="flex items-center gap-1.5">
        <div className="relative ml-1 h-9 w-9">
          <Image src={avatarSrc} alt="Admin avatar" fill sizes="36px" className="rounded-full object-cover" />
        </div>
        <ChevronDownIcon className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
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
            <Link
              href="/admin/login"
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
