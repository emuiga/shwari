import type { ComponentType } from 'react';
import { ChatIcon } from '@/components/icons';
import { BarChartIcon, BriefcaseIcon, HomeIcon, LeadsIcon, ListingIcon } from '@/features/provider/shared/presentation/components/icons';

export interface ProviderNavItem {
  label: string;
  shortLabel: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
}

export const PROVIDER_NAV_ITEMS: ProviderNavItem[] = [
  { label: 'Dashboard', shortLabel: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { label: 'Service Listing', shortLabel: 'Listings', href: '/service-listing', icon: ListingIcon },
  { label: 'Leads', shortLabel: 'Leads', href: '/leads', icon: LeadsIcon },
  { label: 'Messages', shortLabel: 'Messages', href: '/messages', icon: ChatIcon },
];

interface ProviderSidebarOnlyNavItem {
  label: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
}

export const PROVIDER_PROFILE_NAV_ITEMS: ProviderSidebarOnlyNavItem[] = [
  { label: 'Company Profile', href: '/company-profile', icon: BriefcaseIcon },
  { label: 'Subscriptions', href: '/subscriptions', icon: BarChartIcon },
];
