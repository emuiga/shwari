export interface ServiceReview {
  id: string;
  customerName: string;
  rating: number;
  date: string;
  comment: string;
  response?: {
    providerName: string;
    verified: boolean;
    date: string;
  };
}

export const mockServiceReviews: ServiceReview[] = [
  {
    id: 'review-1',
    customerName: 'Karim',
    rating: 4,
    date: 'Jan 2026',
    comment:
      'The owner is humble and his team members are very competent and timely. Huge truck that can fit almost any household. 10/10',
  },
  {
    id: 'review-2',
    customerName: 'Sally',
    rating: 4,
    date: 'Jan 2026',
    comment:
      'The owner is humble and his team members are very competent and timely. Huge truck that can fit almost any household. 10/10',
    response: {
      providerName: 'Shwari Movers',
      verified: true,
      date: 'Jan 2026',
    },
  },
  {
    id: 'review-3',
    customerName: 'Brian Otieno',
    rating: 5,
    date: 'Dec 2025',
    comment: 'Arrived on time, wrapped every item with care, and the pricing was exactly as quoted. Highly recommend.',
  },
];
