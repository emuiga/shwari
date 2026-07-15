'use client';

import Link from 'next/link';
import ProviderHeader from '@/features/provider/shared/presentation/components/ProviderHeader';
import StatCard from '@/features/provider/dashboard/presentation/components/StatCard';
import EmptyState from '@/features/provider/shared/presentation/components/EmptyState';
import { StarIcon } from '@/components/icons';
import { useServiceListings } from '@/features/provider/service-listing/presentation/context/ServiceListingsContext';
import { getCategoryById } from '@/features/provider/service-listing/presentation/lib/serviceCategories';
import { recentLeads, recentReviews } from '@/features/provider/dashboard/presentation/lib/mockDashboardData';

function formatRelativeDate(isoDate: string): string {
  const diffMs = Date.now() - new Date(isoDate).getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays <= 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  return `${diffDays} days ago`;
}

export default function ProviderDashboardPage() {
  const { listings } = useServiceListings();
  const unreadMessages = 2;

  const stats = [
    { label: 'Active Service Listings', value: listings.length },
    { label: 'New Leads', value: recentLeads.filter((lead) => lead.status === 'new').length, trend: { value: 12, isPositive: true } },
    { label: 'Unread Messages', value: unreadMessages },
    { label: 'Average Rating', value: '4.6', trend: { value: 4, isPositive: true } },
  ];

  return (
    <div className="min-h-screen w-full bg-gray-50 lg:bg-transparent">
      <ProviderHeader />
      <main className="px-4 py-6 sm:px-6">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="page-title">Dashboard</h1>
            <p className="page-subtitle">
              {new Date().toLocaleDateString('en-KE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <StatCard key={stat.label} label={stat.label} value={stat.value} trend={stat.trend} />
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Recent Leads</h2>
              <Link href="/provider/leads" className="text-xs font-semibold text-green-600 hover:underline">
                View all
              </Link>
            </div>

            {recentLeads.length === 0 ? (
              <EmptyState className="mt-4 border-0 py-10" title="No leads yet" description="New customer requests will show up here." />
            ) : (
              <ul className="mt-4 divide-y divide-gray-100">
                {recentLeads.map((lead) => (
                  <li key={lead.id} className="flex items-start justify-between gap-3 py-3">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{lead.customerName}</p>
                      <p className="text-xs text-gray-500">
                        {lead.service} · {lead.location}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                          lead.status === 'new' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'
                        }`}
                      >
                        {lead.status === 'new' ? 'New' : 'Contacted'}
                      </span>
                      <span className="text-[11px] text-gray-400">{formatRelativeDate(lead.requestedAt)}</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Recent Reviews</h2>
              <Link href="/provider/service-listing" className="text-xs font-semibold text-green-600 hover:underline">
                View all
              </Link>
            </div>

            {recentReviews.length === 0 ? (
              <EmptyState className="mt-4 border-0 py-10" title="No reviews yet" description="Customer reviews will show up here once you complete jobs." />
            ) : (
              <ul className="mt-4 divide-y divide-gray-100">
                {recentReviews.map((review) => (
                  <li key={review.id} className="py-3">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-gray-900">{review.customerName}</p>
                      <span className="flex items-center gap-1 text-xs font-semibold text-amber-500">
                        <StarIcon className="h-3.5 w-3.5" />
                        {review.rating.toFixed(1)}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">{review.comment}</p>
                    <p className="mt-1 text-[11px] text-gray-400">
                      {review.service} · {formatRelativeDate(review.createdAt)}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        <section className="mt-8">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Service Listings</h2>
            <Link href="/provider/service-listing" className="text-xs font-semibold text-green-600 hover:underline">
              Manage listings
            </Link>
          </div>

          {listings.length === 0 ? (
            <EmptyState
              className="mt-4"
              title="You don't have any active Service Listings"
              description="Create a service listing to enable customers to discover your company."
              actionLabel="Create a New Service"
              actionHref="/provider/service-listing/new"
            />
          ) : (
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {listings.slice(0, 3).map((listing) => (
                <div key={listing.id} className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                  <p className="text-sm font-semibold text-gray-900">{getCategoryById(listing.categoryId)?.label ?? 'Service'}</p>
                  <p className="mt-1 text-xs text-gray-500">{listing.serviceAreas.slice(0, 2).join(', ')}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
