import type { ComponentType } from 'react';
import {
  BoxIcon,
  BriefcaseIcon,
  CarIcon,
  CouchIcon,
  GlobeIcon,
  HomeIcon,
  LeadsIcon,
  SparklesIcon,
  TruckIcon,
  WarehouseIcon,
} from '@/features/provider/shared/presentation/components/icons';

const CATEGORY_ICONS: Record<string, ComponentType<{ className?: string }>> = {
  HOUSE_MOVING: HomeIcon,
  OFFICE_RELOCATION: BriefcaseIcon,
  PACKING_UNPACKING: BoxIcon,
  FURNITURE_MOVING: CouchIcon,
  STORAGE: WarehouseIcon,
  LONG_DISTANCE: TruckIcon,
  INTERNATIONAL: GlobeIcon,
  VEHICLE_TRANSPORT: CarIcon,
  SPECIALTY_ITEMS: SparklesIcon,
  LABOUR_ONLY: LeadsIcon,
};

export function renderCategoryIcon(categoryCode: string | undefined, className?: string) {
  const Icon: ComponentType<{ className?: string }> = (categoryCode && CATEGORY_ICONS[categoryCode]) || BoxIcon;
  return <Icon className={className} />;
}
