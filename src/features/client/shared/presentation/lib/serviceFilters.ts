import type { ServiceSection } from '@/features/client/shared/presentation/lib/mockServices';

export type PriceRangeFilter = 'any' | 'under-25k' | '25k-40k' | 'over-40k';
export type MinRatingFilter = 'any' | '4.5' | '4.0';
export type SortByFilter = 'default' | 'price-asc' | 'price-desc' | 'rating-desc';

export interface ServiceFilters {
  priceRange: PriceRangeFilter;
  minRating: MinRatingFilter;
  sortBy: SortByFilter;
}

export const defaultServiceFilters: ServiceFilters = {
  priceRange: 'any',
  minRating: 'any',
  sortBy: 'default',
};

export function countActiveFilters(filters: ServiceFilters): number {
  return [filters.priceRange !== 'any', filters.minRating !== 'any', filters.sortBy !== 'default'].filter(
    Boolean,
  ).length;
}

export function applyServiceFilters(
  sections: ServiceSection[],
  filters: ServiceFilters,
): ServiceSection[] {
  return sections
    .map((section) => {
      let services = section.services.filter((service) => {
        if (filters.priceRange === 'under-25k' && service.price >= 25000) {
          return false;
        }
        if (filters.priceRange === '25k-40k' && (service.price < 25000 || service.price > 40000)) {
          return false;
        }
        if (filters.priceRange === 'over-40k' && service.price <= 40000) {
          return false;
        }
        if (filters.minRating !== 'any' && service.rating < Number(filters.minRating)) {
          return false;
        }
        return true;
      });

      if (filters.sortBy === 'price-asc') {
        services = [...services].sort((a, b) => a.price - b.price);
      } else if (filters.sortBy === 'price-desc') {
        services = [...services].sort((a, b) => b.price - a.price);
      } else if (filters.sortBy === 'rating-desc') {
        services = [...services].sort((a, b) => b.rating - a.rating);
      }

      return { ...section, services };
    })
    .filter((section) => section.services.length > 0);
}
