export interface DashboardStat {
  label: string;
  value: number;
  trend?: { value: number; isPositive: boolean };
}

export interface RecentLead {
  id: string;
  customerName: string;
  service: string;
  location: string;
  requestedAt: string;
  status: 'new' | 'contacted';
}

export interface RecentReview {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  service: string;
  createdAt: string;
}

export const dashboardStats: DashboardStat[] = [
  { label: 'Active Service Listings', value: 3 },
  { label: 'New Leads', value: 5, trend: { value: 12, isPositive: true } },
  { label: 'Unread Messages', value: 2 },
  { label: 'Average Rating', value: 4.6, trend: { value: 4, isPositive: true } },
];

export const recentLeads: RecentLead[] = [
  {
    id: 'lead-1',
    customerName: 'Wanjiru Kamau',
    service: 'House moving',
    location: 'Lower Kabete, Kiambu County',
    requestedAt: '2026-07-13T09:20:00.000Z',
    status: 'new',
  },
  {
    id: 'lead-2',
    customerName: 'Brian Otieno',
    service: 'Office relocation',
    location: 'Westlands, Nairobi',
    requestedAt: '2026-07-12T15:45:00.000Z',
    status: 'new',
  },
  {
    id: 'lead-3',
    customerName: 'Amina Hassan',
    service: 'Single item delivery',
    location: 'Kasarani, Nairobi',
    requestedAt: '2026-07-11T11:05:00.000Z',
    status: 'contacted',
  },
];

export const recentReviews: RecentReview[] = [
  {
    id: 'review-1',
    customerName: 'Peter Mwangi',
    rating: 5,
    comment: 'Very professional team, moved everything without a scratch.',
    service: 'House moving',
    createdAt: '2026-07-10T08:00:00.000Z',
  },
  {
    id: 'review-2',
    customerName: 'Faith Njeri',
    rating: 4,
    comment: 'Good service, arrived a bit late but handled items with care.',
    service: 'Office relocation',
    createdAt: '2026-07-08T13:30:00.000Z',
  },
];
