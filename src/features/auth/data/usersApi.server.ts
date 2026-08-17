import { fetchBackend } from '@/lib/auth/backendClient';
import { getAccessToken } from '@/lib/auth/session';
import type { UserProfile } from '@/features/auth/data/types';

export async function getMyProfileServer(): Promise<UserProfile | null> {
  const accessToken = await getAccessToken();
  if (!accessToken) return null;

  const result = await fetchBackend<UserProfile>('/users/me', {
    method: 'GET',
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return result.success ? result.data : null;
}
