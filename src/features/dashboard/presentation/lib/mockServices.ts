export interface ServiceProvider {
  name: string;
  avatar: string;
  verified: boolean;
  memberSince: string;
  hours: string;
}

export interface ServiceReview {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
}

export interface MovingService {
  id: string;
  title: string;
  description: string;
  price: number;
  locations: string[];
  image: string;
  images: string[];
  categories: string[];
  rating: number;
  reviewCount: number;
  provider: ServiceProvider;
  reviews: ServiceReview[];
}

export interface ServiceSection {
  id: string;
  title: string;
  services: MovingService[];
}

const CARD_IMAGE = '/images/moving-service.png';

const DEFAULT_PROVIDER: ServiceProvider = {
  name: 'Shwari Movers',
  avatar: '/icons/avatars/bear.png',
  verified: true,
  memberSince: '1yr+ on Movvapp',
  hours: 'Open 9:00AM - 5:00PM',
};

const DEFAULT_REVIEWS: ServiceReview[] = [
  {
    id: 'rvw-1',
    name: 'Tracy Mwangi',
    avatar: '/icons/avatars/cat.png',
    rating: 5,
    date: 'Jan 2026',
    comment:
      'Excellent service from start to finish. The movers arrived on time, handled my furniture carefully, and finished the move much faster than I expected. Highly recommended.',
  },
  {
    id: 'rvw-2',
    name: 'Mercy Wanjiku',
    avatar: '/icons/avatars/panda.png',
    rating: 5,
    date: 'Dec 2025',
    comment:
      'Very professional team. They wrapped all my fragile items properly and nothing was damaged during the move. Communication was great throughout the process.',
  },
  {
    id: 'rvw-3',
    name: 'Clement Otieno',
    avatar: '/icons/avatars/bear.png',
    rating: 4,
    date: 'Nov 2025',
    comment:
      'The crew was polite, hardworking, and organized. They arrived a little later than scheduled, but they made up for it with efficient service and careful handling of everything.',
  },
  {
    id: 'rvw-4',
    name: 'Byron Onderi',
    avatar: '/icons/avatars/meerkat.png',
    rating: 5,
    date: 'Oct 2025',
    comment:
      'Moved from Kilimani to Ruaka with zero stress. The pricing was fair, the truck was clean, and the team even helped arrange the furniture after unloading. Would definitely hire them again.',
  },
];

const DEFAULT_CATEGORIES = [
  'House moving',
  'Apartment moving',
  'Specialised item moving',
  'Single item delivery',
];

export const serviceSections: ServiceSection[] = [
  {
    id: 'residential-moving',
    title: 'Residential Moving Services',
    services: [
      {
        id: 'res-1',
        title: 'Residential Moving',
        description: 'Residential Moving',
        price: 22000,
        locations: ['Kasarani, Nairobi', 'Mwiki, Nairobi', 'Ngara, Nairobi'],
        image: CARD_IMAGE,
        images: [CARD_IMAGE],
        categories: DEFAULT_CATEGORIES,
        rating: 4.8,
        reviewCount: 23,
        provider: DEFAULT_PROVIDER,
        reviews: DEFAULT_REVIEWS,
      },
      {
        id: 'res-2',
        title: 'Commercial and office moving',
        description: 'Commercial and office moving',
        price: 43000,
        locations: ['Lower Kabete, Kiambu County', 'Ngong, Kajiado County', 'Ruiru, Kiambu County'],
        image: CARD_IMAGE,
        images: [CARD_IMAGE],
        categories: DEFAULT_CATEGORIES,
        rating: 4.8,
        reviewCount: 23,
        provider: DEFAULT_PROVIDER,
        reviews: DEFAULT_REVIEWS,
      },
      {
        id: 'res-3',
        title: 'Specialized item moving',
        description: 'Specialized item moving',
        price: 30000,
        locations: ['Kilimani, Nairobi', 'Karen, Nairobi', 'Utawala, Nairobi'],
        image: CARD_IMAGE,
        images: [CARD_IMAGE],
        categories: DEFAULT_CATEGORIES,
        rating: 4.7,
        reviewCount: 15,
        provider: DEFAULT_PROVIDER,
        reviews: DEFAULT_REVIEWS,
      },
      {
        id: 'res-4',
        title: 'Junk and waste disposal',
        description: 'Junk and waste disposal',
        price: 12000,
        locations: ['Juja, Kiambu County', 'Kiambu Road, Kiambu County', 'Githurai 44, Nairobi'],
        image: CARD_IMAGE,
        images: [CARD_IMAGE],
        categories: DEFAULT_CATEGORIES,
        rating: 4.5,
        reviewCount: 9,
        provider: DEFAULT_PROVIDER,
        reviews: DEFAULT_REVIEWS,
      },
    ],
  },
  {
    id: 'commercial-office-moving',
    title: 'Commercial and Office Moving',
    services: [
      {
        id: 'com-1',
        title: 'Commercial and office moving',
        description: 'Commercial and office moving',
        price: 22000,
        locations: ['Kasarani, Nairobi', 'Mwiki, Nairobi', 'Ngara, Nairobi'],
        image: CARD_IMAGE,
        images: [CARD_IMAGE],
        categories: DEFAULT_CATEGORIES,
        rating: 4.8,
        reviewCount: 23,
        provider: DEFAULT_PROVIDER,
        reviews: DEFAULT_REVIEWS,
      },
      {
        id: 'com-2',
        title: 'Commercial and office moving',
        description: 'Commercial and office moving',
        price: 43000,
        locations: ['Lower Kabete, Kiambu County', 'Ngong, Kajiado County', 'Ruiru, Kiambu County'],
        image: CARD_IMAGE,
        images: [CARD_IMAGE],
        categories: DEFAULT_CATEGORIES,
        rating: 4.8,
        reviewCount: 23,
        provider: DEFAULT_PROVIDER,
        reviews: DEFAULT_REVIEWS,
      },
      {
        id: 'com-3',
        title: 'Commercial and office moving',
        description: 'Commercial and office moving',
        price: 30000,
        locations: ['Kilimani, Nairobi', 'Karen, Nairobi', 'Utawala, Nairobi'],
        image: CARD_IMAGE,
        images: [CARD_IMAGE],
        categories: DEFAULT_CATEGORIES,
        rating: 4.6,
        reviewCount: 12,
        provider: DEFAULT_PROVIDER,
        reviews: DEFAULT_REVIEWS,
      },
      {
        id: 'com-4',
        title: 'Commercial and office moving',
        description: 'Commercial and office moving',
        price: 12000,
        locations: ['Juja, Kiambu County', 'Kiambu Road, Kiambu County', 'Githurai 44, Nairobi'],
        image: CARD_IMAGE,
        images: [CARD_IMAGE],
        categories: DEFAULT_CATEGORIES,
        rating: 4.4,
        reviewCount: 7,
        provider: DEFAULT_PROVIDER,
        reviews: DEFAULT_REVIEWS,
      },
    ],
  },
];

export function formatKes(amount: number): string {
  return `KES ${amount.toLocaleString('en-KE')}`;
}

export function getAllServices(): MovingService[] {
  return serviceSections.flatMap((section) => section.services);
}

export function getServiceById(id: string): MovingService | undefined {
  return getAllServices().find((service) => service.id === id);
}

export function getSimilarServices(service: MovingService, limit = 2): MovingService[] {
  return getAllServices()
    .filter((candidate) => candidate.id !== service.id)
    .slice(0, limit);
}
