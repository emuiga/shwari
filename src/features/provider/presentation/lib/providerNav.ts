import type { ComponentType } from 'react';
import { ChatIcon, StarIcon } from '@/features/dashboard/presentation/components/icons';
import { BarChartIcon, BriefcaseIcon, HomeIcon, LeadsIcon, ListingIcon } from '@/features/provider/presentation/components/icons';

export interface ProviderNavItem {
  label: string;
  shortLabel: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
}

export const PROVIDER_NAV_ITEMS: ProviderNavItem[] = [
  { label: 'Dashboard', shortLabel: 'Dashboard', href: '/provider/dashboard', icon: HomeIcon },
  { label: 'Service Listing', shortLabel: 'Listings', href: '/provider/service-listing', icon: ListingIcon },
  { label: 'Leads', shortLabel: 'Leads', href: '/provider/leads', icon: LeadsIcon },
  { label: 'Messages', shortLabel: 'Messages', href: '/provider/messages', icon: ChatIcon },
  { label: 'Reviews', shortLabel: 'Reviews', href: '/provider/reviews', icon: StarIcon },
];

interface ProviderSidebarOnlyNavItem {
  label: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
}

export const PROVIDER_PROFILE_NAV_ITEMS: ProviderSidebarOnlyNavItem[] = [
  { label: 'Subscriptions', href: '/provider/subscriptions', icon: BarChartIcon },
  { label: 'Business profile', href: '/provider/business-profile', icon: BriefcaseIcon },
];
