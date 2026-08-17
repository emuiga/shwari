'use client';

import ClientDashboardPage from '@/features/client/browse/presentation/pages/DashboardPage';
import ProviderDashboardPage from '@/features/provider/dashboard/presentation/pages/ProviderDashboardPage';
import { useActiveRole } from '@/features/auth/presentation/context/ActiveRoleContext';
import type { ProviderReview } from '@/features/provider/shared/data/types';
import type { ServiceCategory } from '@/features/provider/service-listing/data/types';

interface DashboardPageProps {
  providerReviews: ProviderReview[];
  categories: ServiceCategory[];
}

export default function DashboardPage({ providerReviews, categories }: DashboardPageProps) {
  const { role } = useActiveRole();
  return role === 'SERVICE_PROVIDER' ? (
    <ProviderDashboardPage reviews={providerReviews} />
  ) : (
    <ClientDashboardPage categories={categories} />
  );
}
