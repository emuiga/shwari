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
    id: 'review-1',
    name: 'Sally',
    avatar: '/icons/avatars/cat.png',
    rating: 4,
    date: 'Jan 2026',
    comment:
      'The owner is humble and his team members are very competent and timely. Huge truck that can fit almost any size household 10/10.',
  },
  {
    id: 'review-2',
    name: 'Sally',
    avatar: '/icons/avatars/cat.png',
    rating: 4,
    date: 'Jan 2026',
    comment:
      'The owner is humble and his team members are very competent and timely. Huge truck that can fit almost any size household 10/10.',
  },
  {
    id: 'review-3',
    name: 'Sally',
    avatar: '/icons/avatars/cat.png',
    rating: 4,
    date: 'Jan 2026',
    comment:
      'The owner is humble and his team members are very competent and timely. Huge truck that can fit almost any size household 10/10.',
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
        locations: ['Kosarani', 'Mwiki', 'Ngara'],
        image: CARD_IMAGE,
        images: [CARD_IMAGE, CARD_IMAGE],
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
        locations: ['Lower Kabete', 'Ngong', 'Ruiru'],
        image: CARD_IMAGE,
        images: [CARD_IMAGE, CARD_IMAGE],
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
        locations: ['Komulu', 'Josko', 'Kantafu'],
        image: CARD_IMAGE,
        images: [CARD_IMAGE, CARD_IMAGE],
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
        locations: ['Jujo', 'Kenyatta road', 'Kimbo'],
        image: CARD_IMAGE,
        images: [CARD_IMAGE, CARD_IMAGE],
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
        locations: ['Kosarani', 'Mwiki', 'Ngara'],
        image: CARD_IMAGE,
        images: [CARD_IMAGE, CARD_IMAGE],
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
        locations: ['Lower Kabete', 'Ngong', 'Ruiru'],
        image: CARD_IMAGE,
        images: [CARD_IMAGE, CARD_IMAGE],
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
        locations: ['Komulu', 'Josko', 'Kantafu'],
        image: CARD_IMAGE,
        images: [CARD_IMAGE, CARD_IMAGE],
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
        locations: ['Jujo', 'Kenyatta road', 'Kimbo'],
        image: CARD_IMAGE,
        images: [CARD_IMAGE, CARD_IMAGE],
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
