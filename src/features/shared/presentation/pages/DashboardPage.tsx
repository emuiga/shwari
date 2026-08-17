'use client';

import ClientDashboardPage from '@/features/client/browse/presentation/pages/DashboardPage';
import ProviderDashboardPage from '@/features/provider/dashboard/presentation/pages/ProviderDashboardPage';
import { useActiveRole } from '@/features/auth/presentation/context/ActiveRoleContext';
import type { ProviderReview } from '@/features/provider/shared/data/types';

interface DashboardPageProps {
  providerReviews: ProviderReview[];
}

export default function DashboardPage({ providerReviews }: DashboardPageProps) {
  const { role } = useActiveRole();
  return role === 'SERVICE_PROVIDER' ? (
    <ProviderDashboardPage reviews={providerReviews} />
  ) : (
    <ClientDashboardPage />
  );
}
