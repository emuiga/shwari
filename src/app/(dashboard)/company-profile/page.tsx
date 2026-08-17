import CompanyProfilePage from '@/features/provider/shared/presentation/pages/CompanyProfilePage';
import RequireRole from '@/features/auth/presentation/components/RequireRole';
import {
  getMyAvailabilityServer,
  getMyPortfolioServer,
  getMyProviderProfileServer,
  getMyReviewsServer,
} from '@/features/provider/shared/data/providerProfileApi.server';

export default async function Page() {
  const [profile, availability, portfolio, reviews] = await Promise.all([
    getMyProviderProfileServer(),
    getMyAvailabilityServer(),
    getMyPortfolioServer(),
    getMyReviewsServer(),
  ]);

  return (
    <RequireRole role="SERVICE_PROVIDER">
      <CompanyProfilePage profile={profile} availability={availability} portfolio={portfolio} reviews={reviews} />
    </RequireRole>
  );
}
