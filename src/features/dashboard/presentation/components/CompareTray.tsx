'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCompare } from '@/features/dashboard/presentation/context/CompareContext';

export default function CompareTray() {
  const router = useRouter();
  const { compareServices, removeFromCompare, clearCompare } = useCompare();

  if (compareServices.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-30 w-72 rounded-2xl border border-gray-200 bg-white p-4 shadow-xl">
      <p className="text-sm font-semibold text-gray-900">Compare Services</p>

      <div className="mt-3 flex gap-2">
        {compareServices.map((service) => (
          <div key={service.id} className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg">
            <Image src={service.image} alt={service.title} fill sizes="56px" className="object-cover" />
            <button
              type="button"
              aria-label={`Remove ${service.title} from comparison`}
              onClick={() => removeFromCompare(service.id)}
              className="absolute right-0.5 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-black/60 text-[10px] leading-none text-white"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => router.push('/compare')}
        className="mt-4 w-full rounded-md bg-green-500 py-2 text-sm font-semibold text-white hover:bg-green-600"
      >
        Compare {compareServices.length} Service{compareServices.length > 1 ? 's' : ''}
      </button>
      <button
        type="button"
        onClick={clearCompare}
        className="mt-2 w-full rounded-md border border-gray-200 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
      >
        Remove all
      </button>
    </div>
  );
}
