import { getServiceById } from '@/features/dashboard/presentation/lib/mockServices';

export interface MyReview {
  id: string;
  serviceId: string;
  serviceTitle: string;
  serviceImage: string;
  providerName: string;
  rating: number;
  date: string;
  comment: string;
}

function buildReview(
  id: string,
  serviceId: string,
  rating: number,
  date: string,
  comment: string,
): MyReview {
  const service = getServiceById(serviceId);
  return {
    id,
    serviceId,
    serviceTitle: service?.title ?? 'Moving service',
    serviceImage: service?.image ?? '/images/moving-service.png',
    providerName: service?.provider.name ?? 'Shwari Movers',
    rating,
    date,
    comment,
  };
}

export const myReviews: MyReview[] = [
  buildReview(
    'my-rvw-1',
    'res-1',
    5,
    'Jan 2026',
    'The crew was on time and handled everything with care. Would book again for my next move.',
  ),
  buildReview(
    'my-rvw-2',
    'res-2',
    4,
    'Nov 2025',
    'Good communication throughout and fair pricing. Arrived a little later than scheduled but got the job done well.',
  ),
];
