'use client';

import { notFound } from 'next/navigation';
import ProviderHeader from '@/features/provider/shared/presentation/components/ProviderHeader';
import BackButton from '@/components/ui/BackButton';
import SectionHeader from '@/components/ui/SectionHeader';
import DetailField from '@/components/ui/DetailField';
import ServiceImageGallery from '@/components/ServiceImageGallery';
import ServiceReviewsPanel from '@/features/provider/shared/presentation/components/ServiceReviewsPanel';
import { useServiceListings } from '@/features/provider/service-listing/presentation/context/ServiceListingsContext';
import { mockLeads } from '@/features/provider/leads/presentation/lib/mockLeads';
import type { ServiceReview } from '@/features/provider/shared/presentation/lib/mockReviews';

interface LeadReviewPageProps {
  leadId: string;
}

export default function LeadReviewPage({ leadId }: LeadReviewPageProps) {
  const { getById } = useServiceListings();

  const lead = mockLeads.find((item) => item.id === leadId);
  if (!lead) {
    notFound();
  }

  const listing = getById(lead.serviceListingId);
  if (!listing) {
    notFound();
  }

  const reviews: ServiceReview[] = lead.review
    ? [
        {
          id: `${lead.id}-review`,
          customerName: lead.customerName,
          rating: lead.review.rating,
          date: lead.review.date,
          comment: lead.review.comment,
        },
      ]
    : [];

  return (
    <div className="min-h-screen w-full bg-white lg:bg-transparent">
      <ProviderHeader />
      <main className="px-4 py-6 sm:px-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h1 className="page-title truncate">Completed Order #{lead.orderId}</h1>
          <BackButton href="/leads" className="shrink-0" />
        </div>

        <div className="grid gap-6 lg:grid-cols-[3fr_2fr]">
          <div>
            <ServiceImageGallery images={listing.images ?? []} alt={listing.categoryName ?? 'Service'} />

            <div className="mt-6 border-b border-border-soft">
              <h2 className="text-sm font-semibold text-ink">Review ({reviews.length})</h2>
            </div>
            <ServiceReviewsPanel reviews={reviews} />
          </div>

          <div className="space-y-4">
            <SectionHeader title="Order Details" />
            <DetailField label="Customer" value={lead.customerName} />
            <DetailField label="Service" value={lead.service} />
            <DetailField label="Moving Date" value={lead.movingDate} />
            <DetailField label="Time" value={`${lead.startTime} to ${lead.endTime}`} />
            <DetailField label="From" value={lead.fromLocation} />
            <DetailField label="To" value={lead.toLocation} />
          </div>
        </div>
      </main>
    </div>
  );
}
