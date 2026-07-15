import type { ComponentType } from 'react';
import { HomeIcon } from '@/features/admin/shared/presentation/components/icons';

export interface AdminNavItem {
  label: string;
  shortLabel: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
}

export const ADMIN_NAV_ITEMS: AdminNavItem[] = [{ label: 'Dashboard', shortLabel: 'Dashboard', href: '/admin/dashboard', icon: HomeIcon }];
