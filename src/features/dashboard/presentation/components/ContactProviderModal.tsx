import Image from 'next/image';
import { PhoneIcon, XIcon } from '@/features/dashboard/presentation/components/icons';
import type { ServiceProvider } from '@/features/dashboard/presentation/lib/mockServices';

interface ContactProviderModalProps {
  provider: ServiceProvider;
  onClose: () => void;
}

export default function ContactProviderModal({ provider, onClose }: ContactProviderModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="fixed inset-0 cursor-default"
      />
      <div className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-lg">
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-300 hover:text-gray-500"
        >
          <XIcon className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
            <Image src={provider.avatar} alt={provider.name} fill sizes="48px" className="object-cover" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">{provider.name}</p>
            <p className="text-xs text-gray-500">{provider.hours}</p>
          </div>
        </div>

        <div className="mt-5 flex items-center gap-3 rounded-md bg-gray-50 px-4 py-3">
          <PhoneIcon className="h-4 w-4 text-green-600" />
          <span className="text-sm font-medium text-gray-900">+254 700 123 456</span>
        </div>

        <a
          href="tel:+254700123456"
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-green-500 py-2.5 text-sm font-semibold text-white hover:bg-green-600"
        >
          <PhoneIcon className="h-4 w-4" />
          Call now
        </a>
      </div>
    </div>
  );
}
