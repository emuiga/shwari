import Image from 'next/image';
import { ContactIcon, PhoneIcon } from '@/features/dashboard/presentation/components/icons';
import type { ServiceProvider } from '@/features/dashboard/presentation/lib/mockServices';

interface ProviderPanelProps {
  provider: ServiceProvider;
}

export default function ProviderPanel({ provider }: ProviderPanelProps) {
  return (
    <div className="rounded-2xl border border-gray-200 p-4">
      <div className="flex items-center gap-3">
        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
          <Image src={provider.avatar} alt={provider.name} fill sizes="40px" className="object-cover" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <p className="text-sm font-semibold text-gray-900">{provider.name}</p>
            {provider.verified && (
              <span className="flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-[11px] font-medium text-green-600">
                <Image src="/icons/verified.png" alt="" width={12} height={12} />
                Verified
              </span>
            )}
          </div>
          <p className="text-xs text-gray-500">{provider.memberSince}</p>
          <p className="text-xs text-gray-500">{provider.hours}</p>
        </div>
      </div>

      <button
        type="button"
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-green-500 py-2.5 text-sm font-semibold text-white hover:bg-green-600"
      >
        <ContactIcon className="h-4 w-4" />
        Message
      </button>
      <button
        type="button"
        className="mt-2 flex w-full items-center justify-center gap-2 rounded-md border border-green-500 py-2.5 text-sm font-semibold text-green-600 hover:bg-green-50"
      >
        <PhoneIcon className="h-4 w-4" />
        Show Contact
      </button>
    </div>
  );
}
