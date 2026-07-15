export interface ServiceCategory {
  id: string;
  label: string;
  subcategories: string[];
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: 'residential-moving',
    label: 'Residential moving',
    subcategories: ['House moving', 'Apartment moving', 'Single item delivery', 'Furniture rearranging'],
  },
  {
    id: 'commercial-office-moving',
    label: 'Commercial and office moving',
    subcategories: [
      'Office relocation',
      'Shop / retail relocation',
      'Industrial equipment moving',
      'Library / lab relocations',
    ],
  },
  {
    id: 'specialised-item-moving',
    label: 'Specialised item moving',
    subcategories: ['Piano movings', 'Safe & vault movings', 'Antique & art handling', 'Appliance moving'],
  },
  {
    id: 'cleaning-services',
    label: 'Cleaning services',
    subcategories: ['Move-out cleaning', 'Move-in cleaning', 'Pest control & fumigation'],
  },
  {
    id: 'freight-logistics',
    label: 'Freight and logistics',
    subcategories: ['Goods freight transport', 'Last-mile delivery', 'Consolidated shipping'],
  },
  {
    id: 'junk-waste-disposal',
    label: 'Junk and waste disposal',
    subcategories: ['Junk removal', 'E-waste disposal'],
  },
  {
    id: 'storage-warehousing',
    label: 'Storage and warehousing',
    subcategories: ['Short-term storage', 'Long-term warehousing', 'Portable container storage'],
  },
];

export function getCategoryById(id: string): ServiceCategory | undefined {
  return SERVICE_CATEGORIES.find((category) => category.id === id);
}

export function searchSubcategories(query: string): string[] {
  const trimmed = query.trim().toLowerCase();
  const allSubcategories = SERVICE_CATEGORIES.flatMap((category) => category.subcategories);
  if (!trimmed) return allSubcategories;
  return allSubcategories.filter((subcategory) => subcategory.toLowerCase().includes(trimmed));
}

export function searchSubcategoriesForCategory(categoryId: string, query: string): string[] {
  const subcategories = getCategoryById(categoryId)?.subcategories ?? [];
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return subcategories;
  return subcategories.filter((subcategory) => subcategory.toLowerCase().includes(trimmed));
}
