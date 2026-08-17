import { fetchBackend } from '@/lib/auth/backendClient';
import type { ServiceCategory } from '@/features/provider/service-listing/data/types';

export async function getServiceCategoriesServer(): Promise<ServiceCategory[]> {
  const result = await fetchBackend<ServiceCategory[]>('/service-categories');
  return result.success ? (result.data ?? []) : [];
}
