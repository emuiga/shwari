import { ApiError } from '@/features/auth/data/authApi';
import type { ApiEnvelope, UserProfile } from '@/features/auth/data/types';

export async function updateMyProfile(payload: { fullName: string }): Promise<UserProfile> {
  const response = await fetch('/api/users/me', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const envelope = (await response.json().catch(() => null)) as ApiEnvelope<UserProfile> | null;

  if (!envelope || !response.ok || !envelope.success) {
    throw new ApiError(envelope?.description ?? 'Something went wrong. Please try again.');
  }

  return envelope.data as UserProfile;
}
