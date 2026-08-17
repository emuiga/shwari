import CreateServiceListingPage from '@/features/provider/service-listing/presentation/pages/CreateServiceListingPage';
import RequireRole from '@/features/auth/presentation/components/RequireRole';
import { getServiceCategoriesServer } from '@/features/provider/service-listing/data/serviceCategoriesApi.server';

export default async function Page() {
  const categories = await getServiceCategoriesServer();
  return (
    <RequireRole role="SERVICE_PROVIDER">
      <CreateServiceListingPage categories={categories} />
    </RequireRole>
  );
}
