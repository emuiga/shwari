import ProviderDetailPage from '@/features/client/browse/presentation/pages/ProviderDetailPage';
import { getPublicProviderServer } from '@/features/client/browse/data/providersApi.server';

export default async function Page({ params }: { params: Promise<{ providerId: string }> }) {
  const { providerId } = await params;
  const provider = await getPublicProviderServer(providerId);
  return <ProviderDetailPage provider={provider} />;
}
