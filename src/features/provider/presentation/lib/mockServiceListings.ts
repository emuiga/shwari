export interface ServiceListing {
  id: string;
  categoryId: string;
  price: number;
  serviceAreas: string[];
  locations: string[];
  images: string[];
}

const CARD_IMAGE = '/images/moving-service.png';

export const initialServiceListings: ServiceListing[] = [
  {
    id: 'listing-1',
    categoryId: 'residential-moving',
    price: 22000,
    serviceAreas: ['House moving', 'Apartment moving', 'Single item delivery'],
    locations: ['Lower Kabete, Kiambu County', 'Rongai, Kajiado County', 'Kasarani, Nairobi', 'Zimmerman, Nairobi'],
    images: [CARD_IMAGE],
  },
  {
    id: 'listing-2',
    categoryId: 'commercial-office-moving',
    price: 22000,
    serviceAreas: ['Office relocation', 'Shop / retail relocation'],
    locations: ['Westlands, Nairobi', 'Upper Hill, Nairobi'],
    images: [CARD_IMAGE],
  },
  {
    id: 'listing-3',
    categoryId: 'specialised-item-moving',
    price: 22000,
    serviceAreas: ['Piano movings', 'Safe & vault movings'],
    locations: ['Karen, Nairobi', 'Kilimani, Nairobi'],
    images: [CARD_IMAGE],
  },
];

export function formatKes(amount: number): string {
  return `KES ${amount.toLocaleString('en-KE')}`;
}
