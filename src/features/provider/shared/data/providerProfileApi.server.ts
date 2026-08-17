import { fetchBackend } from '@/lib/auth/backendClient';
import { getAccessToken } from '@/lib/auth/session';
import type {
  PortfolioItem,
  ProviderAnalytics,
  ProviderAvailability,
  ProviderProfile,
  ProviderReview,
  ProviderService,
} from '@/features/provider/shared/data/types';

async function fetchAsProvider<T>(path: string): Promise<T | null> {
  const accessToken = await getAccessToken();
  if (!accessToken) return null;

  const result = await fetchBackend<T>(path, {
    method: 'GET',
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return result.success ? result.data : null;
}

export function getMyProviderProfileServer() {
  return fetchAsProvider<ProviderProfile>('/providers/me/profile');
}

export async function getMyServicesServer(): Promise<ProviderService[]> {
  return (await fetchAsProvider<ProviderService[]>('/providers/me/services')) ?? [];
}

export async function getMyAvailabilityServer(): Promise<ProviderAvailability[]> {
  return (await fetchAsProvider<ProviderAvailability[]>('/providers/me/availability')) ?? [];
}

export function getMyAnalyticsServer() {
  return fetchAsProvider<ProviderAnalytics>('/providers/me/analytics');
}

export async function getMyPortfolioServer(): Promise<PortfolioItem[]> {
  return (await fetchAsProvider<PortfolioItem[]>('/providers/me/portfolio')) ?? [];
}

export async function getMyReviewsServer(): Promise<ProviderReview[]> {
  return (await fetchAsProvider<ProviderReview[]>('/providers/me/reviews')) ?? [];
}
