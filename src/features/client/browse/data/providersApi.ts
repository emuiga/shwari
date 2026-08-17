import type { ApiEnvelope } from '@/features/auth/data/types';
import type {
  ProviderPublicProfile,
  ProviderSearchParams,
  ProviderSearchResult,
} from '@/features/client/browse/data/types';

export async function searchProviders(params: ProviderSearchParams): Promise<ProviderSearchResult[]> {
  const query = new URLSearchParams({
    query: params.query ?? '',
    serviceType: params.serviceType,
    latitude: String(params.latitude),
    longitude: String(params.longitude),
    radiusKm: String(params.radiusKm ?? 20),
  });

  const response = await fetch(`/api/providers/search?${query.toString()}`);
  const envelope = (await response.json().catch(() => null)) as ApiEnvelope<ProviderSearchResult[]> | null;

  if (!envelope || !response.ok || !envelope.success) {
    throw new Error(envelope?.description ?? 'Could not search for providers. Please try again.');
  }

  return envelope.data ?? [];
}

export async function getProvider(providerId: string): Promise<ProviderPublicProfile | null> {
  const response = await fetch(`/api/providers/${providerId}`);
  const envelope = (await response.json().catch(() => null)) as ApiEnvelope<ProviderPublicProfile> | null;

  if (!envelope || !response.ok || !envelope.success) return null;

  return envelope.data;
}
