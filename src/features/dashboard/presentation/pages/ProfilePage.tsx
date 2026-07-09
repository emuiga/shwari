'use client';

import Image from 'next/image';
import Link from 'next/link';
import DashboardHeader from '@/features/dashboard/presentation/components/DashboardHeader';
import { defaultProfile } from '@/features/dashboard/presentation/lib/settings';
import { myReviews } from '@/features/dashboard/presentation/lib/myReviews';

export default function ProfilePage() {
  return (
    <div className="min-h-screen w-full bg-white">
      <DashboardHeader />

      <main className="mx-auto max-w-3xl px-6 py-6">
        <h1 className="text-xl font-bold text-gray-900">Profile</h1>

        <div className="mt-6 rounded-2xl border border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16 overflow-hidden rounded-full">
              <Image src={defaultProfile.avatar} alt="" fill sizes="64px" className="object-cover" />
            </div>
            <div>
              <p className="text-base font-semibold text-gray-900">{defaultProfile.name}</p>
              <p className="text-sm text-gray-500">{defaultProfile.email}</p>
              <p className="text-sm text-gray-500">{defaultProfile.phone}</p>
            </div>
          </div>

          <Link
            href="/settings"
            className="mt-5 inline-block rounded-md border border-green-500 px-5 py-2 text-sm font-semibold text-green-600 hover:bg-green-50"
          >
            Edit profile
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 p-4 text-center">
            <p className="text-2xl font-bold text-gray-900">{myReviews.length}</p>
            <p className="mt-1 text-xs text-gray-500">Reviews written</p>
          </div>
          <div className="rounded-2xl border border-gray-200 p-4 text-center">
            <p className="text-2xl font-bold text-gray-900">1yr+</p>
            <p className="mt-1 text-xs text-gray-500">On Movvapp</p>
          </div>
          <div className="rounded-2xl border border-gray-200 p-4 text-center">
            <p className="text-2xl font-bold text-gray-900">Nairobi</p>
            <p className="mt-1 text-xs text-gray-500">Location</p>
          </div>
        </div>
      </main>
    </div>
  );
}
