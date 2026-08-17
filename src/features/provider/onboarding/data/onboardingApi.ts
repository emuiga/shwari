import { ApiError } from '@/features/auth/data/authApi';
import type { ApiEnvelope } from '@/features/auth/data/types';
import type { ProviderProfile } from '@/features/provider/shared/data/types';

export interface OnboardProviderRequest {
  businessName: string;
  description: string;
  latitude?: number;
  longitude?: number;
  operatingHours: Record<string, string>;
}

export async function onboardProvider(payload: OnboardProviderRequest): Promise<ProviderProfile> {
  const response = await fetch('/api/providers/onboarding', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const envelope = (await response.json().catch(() => null)) as ApiEnvelope<ProviderProfile> | null;

  if (!envelope || !response.ok || !envelope.success) {
    throw new ApiError(envelope?.description ?? 'Something went wrong. Please try again.');
  }

  return envelope.data as ProviderProfile;
}
