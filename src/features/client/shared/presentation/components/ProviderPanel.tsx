'use client';

import Image from 'next/image';
import { useState } from 'react';
import { PaperPlaneIcon, PhoneIcon } from '@/components/icons';
import ContactProviderModal from '@/features/client/shared/presentation/components/ContactProviderModal';
import type { ServiceProvider } from '@/features/client/shared/presentation/lib/mockServices';

interface ProviderPanelProps {
  provider: ServiceProvider;
}

export default function ProviderPanel({ provider }: ProviderPanelProps) {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div className="rounded-card border border-border p-4">
      {isContactOpen && (
        <ContactProviderModal provider={provider} onClose={() => setIsContactOpen(false)} />
      )}

      <div className="flex items-center gap-3">
        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
          <Image src={provider.avatar} alt={provider.name} fill sizes="40px" className="object-cover" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <p className="text-sm font-semibold text-ink">{provider.name}</p>
            {provider.verified && (
              <span className="flex items-center gap-1 rounded-full bg-primary-subtle px-2 py-0.5 text-[11px] font-medium text-primary-strong">
                <Image src="/icons/verified.png" alt="" width={12} height={12} />
                Verified
              </span>
            )}
          </div>
          <p className="text-xs text-subtle">{provider.memberSince}</p>
          <p className="text-xs text-subtle">{provider.hours}</p>
        </div>
      </div>

      <a
        href="/messages"
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-control bg-primary py-2.5 text-sm font-semibold text-white hover:bg-primary-strong"
      >
        <PaperPlaneIcon className="h-4 w-4" />
        Message
      </a>
      <button
        type="button"
        onClick={() => setIsContactOpen(true)}
        className="mt-2 flex w-full items-center justify-center gap-2 rounded-control border border-primary py-2.5 text-sm font-semibold text-primary-strong hover:bg-primary-subtle"
      >
        <PhoneIcon className="h-4 w-4" />
        Show Contact
      </button>
    </div>
  );
}
