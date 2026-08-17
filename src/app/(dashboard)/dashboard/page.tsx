import DashboardPage from '@/features/shared/presentation/pages/DashboardPage';
import { getActiveRoleCookie } from '@/lib/auth/activeRoleCookie';
import { getMyReviewsServer } from '@/features/provider/shared/data/providerProfileApi.server';
import { getServiceCategoriesServer } from '@/features/provider/service-listing/data/serviceCategoriesApi.server';

export default async function Page() {
  const activeRole = await getActiveRoleCookie();
  const isProvider = activeRole?.role === 'SERVICE_PROVIDER';
  const [providerReviews, categories] = await Promise.all([
    isProvider ? getMyReviewsServer() : Promise.resolve([]),
    isProvider ? Promise.resolve([]) : getServiceCategoriesServer(),
  ]);

  return <DashboardPage providerReviews={providerReviews} categories={categories} />;
}
