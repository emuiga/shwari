import DashboardPage from '@/features/shared/presentation/pages/DashboardPage';
import { getActiveRoleCookie } from '@/lib/auth/activeRoleCookie';
import { getMyReviewsServer } from '@/features/provider/shared/data/providerProfileApi.server';

export default async function Page() {
  const activeRole = await getActiveRoleCookie();
  const isProvider = activeRole?.role === 'SERVICE_PROVIDER';
  const providerReviews = isProvider ? await getMyReviewsServer() : [];

  return <DashboardPage providerReviews={providerReviews} />;
}
