'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ProviderHeader from '@/features/provider/shared/presentation/components/ProviderHeader';
import BusinessOverview from '@/features/provider/shared/presentation/components/BusinessOverview';
import BusinessProfileForm from '@/features/provider/shared/presentation/components/BusinessProfileForm';
import AvailabilityManager from '@/features/provider/shared/presentation/components/AvailabilityManager';
import PortfolioManager from '@/features/provider/shared/presentation/components/PortfolioManager';
import ProviderReviewsList from '@/features/provider/reviews/presentation/components/ProviderReviewsList';
import { useIsAvailableNow } from '@/features/provider/shared/presentation/hooks/useIsAvailableNow';
import type {
  PortfolioItem,
  ProviderAvailability,
  ProviderProfile,
  ProviderReview,
} from '@/features/provider/shared/data/types';

type Tab = 'overview' | 'availability' | 'portfolio' | 'reviews';

const TABS: { id: Tab; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'availability', label: 'Availability' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'reviews', label: 'Reviews' },
];

const TAB_IDS = TABS.map((item) => item.id);

interface CompanyProfilePageProps {
  profile: ProviderProfile | null;
  availability: ProviderAvailability[];
  portfolio: PortfolioItem[];
  reviews: ProviderReview[];
}

export default function CompanyProfilePage({ profile, availability, portfolio, reviews }: CompanyProfilePageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestedTab = searchParams.get('tab');
  const initialTab = (TAB_IDS as string[]).includes(requestedTab ?? '') ? (requestedTab as Tab) : 'overview';

  const [tab, setTabState] = useState<Tab>(initialTab);
  const [currentProfile, setCurrentProfile] = useState(profile);

  function setTab(next: Tab) {
    setTabState(next);
    router.replace(`/company-profile?tab=${next}`, { scroll: false });
  }
  const [isEditingOverview, setIsEditingOverview] = useState(false);
  const isAvailable = useIsAvailableNow(availability, currentProfile?.operatingHours);

  return (
    <div className="min-h-screen w-full bg-white lg:bg-transparent">
      <ProviderHeader />

      <main className="px-4 py-6 sm:px-6">
        <h1 className="page-title">Company Profile</h1>
        <p className="page-subtitle">Manage your business details, availability, and portfolio.</p>

        <div className="mt-5 flex gap-1 rounded-control border border-border bg-surface-muted p-1">
          {TABS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={`flex-1 rounded-control py-2 text-sm font-semibold transition-colors ${
                tab === item.id ? 'bg-primary-subtle text-primary-emphasis shadow-sm' : 'text-subtle hover:text-body'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="mt-5 rounded-card border border-border bg-white p-5">
          {tab === 'overview' &&
            (isEditingOverview ? (
              <BusinessProfileForm
                profile={currentProfile}
                onCancel={() => setIsEditingOverview(false)}
                onSaved={(updated) => {
                  setCurrentProfile(updated);
                  setIsEditingOverview(false);
                }}
              />
            ) : (
              <BusinessOverview
                profile={currentProfile}
                isAvailable={isAvailable}
                onEdit={() => setIsEditingOverview(true)}
              />
            ))}
          {tab === 'availability' && <AvailabilityManager initialSlots={availability} />}
          {tab === 'portfolio' && <PortfolioManager initialItems={portfolio} />}
          {tab === 'reviews' && <ProviderReviewsList reviews={reviews} />}
        </div>
      </main>
    </div>
  );
}
