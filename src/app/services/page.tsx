import ServicesPage from '@/features/landing/presentation/pages/ServicesPage';
import { getServiceCategoriesServer } from '@/features/provider/service-listing/data/serviceCategoriesApi.server';

export default async function Page() {
  const categories = await getServiceCategoriesServer();
  return <ServicesPage categories={categories} />;
}
