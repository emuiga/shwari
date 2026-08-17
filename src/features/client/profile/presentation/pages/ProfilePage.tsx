'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import DashboardHeader from '@/features/client/shared/presentation/components/DashboardHeader';
import ProviderHeader from '@/features/provider/shared/presentation/components/ProviderHeader';
import StatCard from '@/features/provider/dashboard/presentation/components/StatCard';
import { defaultProfile } from '@/features/client/profile/presentation/lib/settings';
import { myReviews } from '@/features/client/reviews/presentation/lib/myReviews';
import { useActiveRole } from '@/features/auth/presentation/context/ActiveRoleContext';
import { ApiError } from '@/features/auth/data/authApi';
import { updateMyProfile } from '@/features/auth/data/usersApi';
import BusinessProfileForm from '@/features/provider/shared/presentation/components/BusinessProfileForm';
import AvailabilityStatus from '@/features/provider/shared/presentation/components/AvailabilityStatus';
import VerificationBadge from '@/features/provider/shared/presentation/components/VerificationBadge';
import { useIsAvailableNow } from '@/features/provider/shared/presentation/hooks/useIsAvailableNow';
import { formatDayGroupLabel, formatHoursRange, groupOperatingHours } from '@/features/provider/shared/presentation/lib/operatingHours';
import StarRating from '@/features/provider/shared/presentation/components/StarRating';
import type { UserProfile } from '@/features/auth/data/types';
import type {
  ProviderAnalytics,
  ProviderAvailability,
  ProviderProfile,
  ProviderReview,
  ProviderService,
} from '@/features/provider/shared/data/types';

interface ProfilePageProps {
  initialProfile: UserProfile | null;
  providerProfile: ProviderProfile | null;
  services: ProviderService[];
  availability: ProviderAvailability[];
  analytics: ProviderAnalytics | null;
  reviews: ProviderReview[];
}

function avatarSrcFor(avatarUrl: string | null | undefined, fallback: string) {
  if (avatarUrl && avatarUrl.startsWith('/')) return avatarUrl;
  return fallback;
}

export default function ProfilePage({
  initialProfile,
  providerProfile: initialProviderProfile,
  services,
  availability,
  analytics,
  reviews,
}: ProfilePageProps) {
  const { role } = useActiveRole();
  const isProvider = role === 'SERVICE_PROVIDER';

  const [providerProfile, setProviderProfile] = useState(initialProviderProfile);
  const [isEditingBusiness, setIsEditingBusiness] = useState(false);
  const isAvailable = useIsAvailableNow(availability, providerProfile?.operatingHours);

  const [name, setName] = useState(initialProfile?.fullName || defaultProfile.name);
  const [isEditing, setIsEditing] = useState(false);
  const [nameDraft, setNameDraft] = useState(name);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const email = initialProfile?.email || defaultProfile.email;
  const phone = initialProfile?.phone || defaultProfile.phone;

  function startEditing() {
    setNameDraft(name);
    setError(null);
    setIsEditing(true);
  }

  async function saveName() {
    const trimmed = nameDraft.trim();
    if (!trimmed) {
      setError('Name cannot be empty.');
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const updated = await updateMyProfile({ fullName: trimmed });
      setName(updated.fullName || trimmed);
      setIsEditing(false);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen w-full bg-white lg:bg-[#F5FFF9]">
      {isProvider ? <ProviderHeader /> : <DashboardHeader />}

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <h1 className="page-title">Profile</h1>
        <p className="page-subtitle">Your account overview.</p>

        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <div className="rounded-card border border-border bg-white p-4 lg:sticky lg:top-6">
              <div className="flex flex-col items-center text-center">
                <div className="relative h-20 w-20 overflow-hidden rounded-full">
                  <Image
                    src={avatarSrcFor(initialProfile?.avatarUrl, defaultProfile.avatar)}
                    alt=""
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
                {isEditing ? (
                  <input
                    type="text"
                    value={nameDraft}
                    onChange={(event) => setNameDraft(event.target.value)}
                    placeholder="Your name"
                    className="mt-4 w-full rounded-control border border-border-strong px-3 py-1.5 text-center text-sm font-semibold text-ink focus:border-primary"
                  />
                ) : (
                  <p className="mt-4 text-base font-semibold text-ink">{name}</p>
                )}
                <p className="mt-1 text-sm text-subtle">{email}</p>
                <p className="text-sm text-subtle">{phone}</p>
                <span className="mt-3 inline-block rounded-full bg-primary-subtle px-2.5 py-1 text-xs font-semibold text-primary-emphasis">
                  {isProvider ? 'Service Provider' : 'Customer'}
                </span>
                {isProvider && (
                  <div className="mt-2">
                    <AvailabilityStatus isAvailable={isAvailable} />
                  </div>
                )}
              </div>

              {!isProvider && (
                <>
                  {error && <p className="mt-3 text-xs text-danger">{error}</p>}

                  <div className="mt-5">
                    {isEditing ? (
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setIsEditing(false);
                            setError(null);
                          }}
                          disabled={saving}
                          className="flex-1 rounded-control border border-border-strong py-2 text-sm font-semibold text-body hover:border-danger hover:bg-danger-soft hover:text-danger disabled:opacity-50"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={saveName}
                          disabled={saving}
                          className="flex-1 rounded-control bg-primary py-2 text-sm font-semibold text-white hover:bg-primary-strong disabled:opacity-50"
                        >
                          {saving ? 'Saving…' : 'Save'}
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={startEditing}
                        className="block w-full rounded-control border border-primary py-2 text-center text-sm font-semibold text-primary-strong hover:bg-primary-subtle"
                      >
                        Edit profile
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="space-y-4 lg:col-span-2">
            {isProvider ? (
              <>
                <section className="rounded-card border border-border bg-white p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-ink">Business</p>
                    <div className="flex items-center gap-2">
                      {providerProfile?.verificationStatus && (
                        <VerificationBadge status={providerProfile.verificationStatus} />
                      )}
                      {!isEditingBusiness && (
                        <button
                          type="button"
                          onClick={() => setIsEditingBusiness(true)}
                          className="rounded-control border border-primary px-3 py-1.5 text-xs font-semibold text-primary-strong hover:bg-primary-subtle"
                        >
                          Edit
                        </button>
                      )}
                      <Link href="/company-profile" className="text-xs font-semibold text-body hover:underline">
                        Manage company profile →
                      </Link>
                    </div>
                  </div>

                  {isEditingBusiness ? (
                    <BusinessProfileForm
                      profile={providerProfile}
                      onCancel={() => setIsEditingBusiness(false)}
                      onSaved={(updated) => {
                        setProviderProfile(updated);
                        setIsEditingBusiness(false);
                      }}
                    />
                  ) : (
                    <>
                      {providerProfile?.businessName ? (
                        <>
                          <p className="mt-2 text-base font-semibold text-ink">{providerProfile.businessName}</p>
                          {providerProfile.description && (
                            <p className="mt-1 text-sm text-subtle">{providerProfile.description}</p>
                          )}
                          {providerProfile.latitude != null && providerProfile.longitude != null && (
                            <p className="mt-2 text-xs text-faint">
                              Location: {providerProfile.latitude.toFixed(4)}, {providerProfile.longitude.toFixed(4)}
                            </p>
                          )}
                        </>
                      ) : (
                        <p className="mt-2 text-sm text-subtle">
                          You haven&apos;t set up your business profile yet.
                        </p>
                      )}

                      {(availability.length > 0 || providerProfile?.operatingHours) && (
                        <div className="mt-4 border-t border-border-soft pt-4">
                          <div className="flex items-center justify-between">
                            <p className="text-xs font-semibold uppercase tracking-wide text-faint">Availability</p>
                            <AvailabilityStatus isAvailable={isAvailable} />
                          </div>
                          {providerProfile?.operatingHours && Object.keys(providerProfile.operatingHours).length > 0 && (
                            <ul className="mt-2 space-y-1.5">
                              {groupOperatingHours(providerProfile.operatingHours).map((group) => (
                                <li key={group.days[0]} className="flex justify-between text-sm text-body">
                                  <span>{formatDayGroupLabel(group.days)}</span>
                                  <span className="font-medium text-ink">{formatHoursRange(group.range)}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </section>

                <section className="rounded-card border border-border bg-white p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-ink">Services ({services.length})</p>
                    <Link href="/service-listing" className="text-xs font-semibold text-primary-strong hover:underline">
                      View all
                    </Link>
                  </div>

                  {services.length === 0 ? (
                    <p className="mt-2 text-sm text-subtle">No services listed yet.</p>
                  ) : (
                    <div className="mt-4 flex flex-wrap gap-3">
                      {services.slice(0, 3).map((service) => (
                        <div key={service.id} className="w-full rounded-control border border-border-soft p-3 sm:w-56">
                          <p className="text-sm font-semibold text-ink">{service.categoryName}</p>
                          {(service.priceFrom != null || service.priceTo != null) && (
                            <p className="mt-1 text-xs text-subtle">
                              KES {service.priceFrom?.toLocaleString()} – {service.priceTo?.toLocaleString()}
                            </p>
                          )}
                          <span
                            className={`mt-2 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                              service.active ? 'bg-primary-subtle text-primary-emphasis' : 'bg-surface-muted text-subtle'
                            }`}
                          >
                            {service.active ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </section>

                <section className="rounded-card border border-border bg-white p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-ink">Reviews ({reviews.length})</p>
                    <Link href="/reviews" className="text-xs font-semibold text-primary-strong hover:underline">
                      View all
                    </Link>
                  </div>

                  {reviews.length === 0 ? (
                    <p className="mt-2 text-sm text-subtle">No reviews yet.</p>
                  ) : (
                    <ul className="mt-4 space-y-3">
                      {reviews.slice(0, 3).map((review) => (
                        <li key={review.id} className="rounded-control border border-border-soft p-3">
                          <div className="flex items-center justify-between gap-2">
                            <p className="text-sm font-semibold text-ink">{review.customerName ?? 'Anonymous customer'}</p>
                            <StarRating rating={review.rating} />
                          </div>
                          {review.comment && <p className="mt-1 truncate text-xs text-subtle">{review.comment}</p>}
                        </li>
                      ))}
                    </ul>
                  )}
                </section>

                <section className="rounded-card border border-border bg-white p-4">
                  <p className="text-sm font-semibold text-ink">Analytics</p>
                  <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <StatCard label="Profile Views" value={analytics?.profileViews ?? 0} />
                    <StatCard label="Search Impressions" value={analytics?.searchImpressions ?? 0} />
                    <StatCard label="Inquiries Received" value={analytics?.inquiriesReceived ?? 0} />
                  </div>
                  {analytics?.periodSummary?.note && (
                    <p className="mt-3 text-xs text-faint">{analytics.periodSummary.note}</p>
                  )}
                </section>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                <div className="rounded-card border border-border p-4 text-center">
                  <p className="text-2xl font-bold text-ink">{myReviews.length}</p>
                  <p className="mt-1 text-xs text-subtle">Reviews written</p>
                </div>
                <div className="rounded-card border border-border p-4 text-center">
                  <p className="text-2xl font-bold text-ink">1yr+</p>
                  <p className="mt-1 text-xs text-subtle">On Movvapp</p>
                </div>
                <div className="rounded-card border border-border p-4 text-center">
                  <p className="text-2xl font-bold text-ink">Nairobi</p>
                  <p className="mt-1 text-xs text-subtle">Location</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
