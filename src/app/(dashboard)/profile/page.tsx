import ProfilePage from '@/features/client/profile/presentation/pages/ProfilePage';
import { getMyProfileServer } from '@/features/auth/data/usersApi.server';
import { getActiveRoleCookie } from '@/lib/auth/activeRoleCookie';
import {
  getMyAnalyticsServer,
  getMyAvailabilityServer,
  getMyProviderProfileServer,
  getMyReviewsServer,
  getMyServicesServer,
} from '@/features/provider/shared/data/providerProfileApi.server';

export default async function Page() {
  const activeRole = await getActiveRoleCookie();
  const isProvider = activeRole?.role === 'SERVICE_PROVIDER';

  const [profile, providerProfile, services, availability, analytics, reviews] = await Promise.all([
    getMyProfileServer(),
    isProvider ? getMyProviderProfileServer() : Promise.resolve(null),
    isProvider ? getMyServicesServer() : Promise.resolve([]),
    isProvider ? getMyAvailabilityServer() : Promise.resolve([]),
    isProvider ? getMyAnalyticsServer() : Promise.resolve(null),
    isProvider ? getMyReviewsServer() : Promise.resolve([]),
  ]);

  return (
    <ProfilePage
      initialProfile={profile}
      providerProfile={providerProfile}
      services={services}
      availability={availability}
      analytics={analytics}
      reviews={reviews}
    />
  );
}
