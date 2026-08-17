import { fetchBackend } from '@/lib/auth/backendClient';
import type { ProviderPublicProfile } from '@/features/client/browse/data/types';

export async function getPublicProviderServer(providerId: string): Promise<ProviderPublicProfile | null> {
  const result = await fetchBackend<ProviderPublicProfile>(`/providers/${providerId}`, { method: 'GET' });
  return result.success ? result.data : null;
}
