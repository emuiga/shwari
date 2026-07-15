export type LeadStatus = 'pending' | 'active' | 'completed';

export interface LeadReview {
  rating: number;
  date: string;
  comment: string;
}

export interface Lead {
  id: string;
  customerName: string;
  avatarSrc: string;
  memberSince: string;
  service: string;
  requestedAt: string;
  fromLocation: string;
  toLocation: string;
  description: string;
  status: LeadStatus;
  movingDate: string;
  startTime: string;
  endTime: string;
  serviceListingId: string;
  orderId: string;
  review?: LeadReview;
}

const AVATARS = ['/icons/avatars/bear.png', '/icons/avatars/cat.png', '/icons/avatars/meerkat.png', '/icons/avatars/panda.png'];

export const mockLeads: Lead[] = [
  {
    id: 'lead-1',
    customerName: 'Sally',
    avatarSrc: AVATARS[0],
    memberSince: '1yr+ on Movvapp',
    service: 'Residential Moving',
    requestedAt: '24/07/2026',
    fromLocation: 'Kamulu',
    toLocation: 'Lower Kabete',
    description: 'I need professional movers to be moved from kamulu',
    status: 'pending',
    movingDate: '16/06/2027',
    startTime: '2:00PM',
    endTime: '4:00PM',
    serviceListingId: 'listing-1',
    orderId: '47566881',
  },
  {
    id: 'lead-2',
    customerName: 'Sally',
    avatarSrc: AVATARS[1],
    memberSince: '1yr+ on Movvapp',
    service: 'Residential Moving',
    requestedAt: '24/07/2026',
    fromLocation: 'Kamulu',
    toLocation: 'Lower Kabete',
    description: 'I need professional movers to be moved from kamulu',
    status: 'pending',
    movingDate: '18/06/2027',
    startTime: '9:00AM',
    endTime: '11:00AM',
    serviceListingId: 'listing-2',
    orderId: '47566882',
  },
  {
    id: 'lead-3',
    customerName: 'Sally',
    avatarSrc: AVATARS[2],
    memberSince: '1yr+ on Movvapp',
    service: 'Residential Moving',
    requestedAt: '24/07/2026',
    fromLocation: 'Kamulu',
    toLocation: 'Lower Kabete',
    description: 'I need professional movers to be moved from kamulu',
    status: 'pending',
    movingDate: '20/06/2027',
    startTime: '1:00PM',
    endTime: '3:00PM',
    serviceListingId: 'listing-3',
    orderId: '47566883',
  },
  {
    id: 'lead-4',
    customerName: 'Brian Otieno',
    avatarSrc: AVATARS[3],
    memberSince: '2yrs+ on Movvapp',
    service: 'Office Relocation',
    requestedAt: '20/07/2026',
    fromLocation: 'Westlands',
    toLocation: 'Upper Hill',
    description: 'Relocating a small office, about 15 desks and IT equipment.',
    status: 'active',
    movingDate: '22/07/2026',
    startTime: '8:00AM',
    endTime: '12:00PM',
    serviceListingId: 'listing-2',
    orderId: '47566887',
  },
  {
    id: 'lead-5',
    customerName: 'Faith Njeri',
    avatarSrc: AVATARS[0],
    memberSince: '6mo+ on Movvapp',
    service: 'Single Item Delivery',
    requestedAt: '10/07/2026',
    fromLocation: 'Kasarani',
    toLocation: 'Ngara',
    description: 'Need a fridge delivered and installed the same day.',
    status: 'completed',
    movingDate: '11/07/2026',
    startTime: '10:00AM',
    endTime: '11:00AM',
    serviceListingId: 'listing-1',
    orderId: '47566893',
    review: {
      rating: 5,
      date: 'Jul 2026',
      comment: 'The fridge was delivered and installed exactly on time. Very careful with the item, great service!',
    },
  },
];
