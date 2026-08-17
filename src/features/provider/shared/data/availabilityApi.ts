import { ApiError } from '@/features/auth/data/authApi';
import type { ApiEnvelope } from '@/features/auth/data/types';
import type { ProviderAvailability } from '@/features/provider/shared/data/types';

export interface AvailabilityRequest {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  available: boolean;
}

async function parseEnvelope<T>(response: Response): Promise<T> {
  const envelope = (await response.json().catch(() => null)) as ApiEnvelope<T> | null;

  if (!envelope || !response.ok || !envelope.success) {
    throw new ApiError(envelope?.description ?? 'Something went wrong. Please try again.');
  }

  return envelope.data as T;
}

export async function createAvailability(payload: AvailabilityRequest): Promise<ProviderAvailability> {
  const response = await fetch('/api/providers/me/availability', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return parseEnvelope<ProviderAvailability>(response);
}

export async function updateAvailability(id: string, payload: AvailabilityRequest): Promise<ProviderAvailability> {
  const response = await fetch(`/api/providers/me/availability/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return parseEnvelope<ProviderAvailability>(response);
}

export async function deleteAvailability(id: string): Promise<void> {
  const response = await fetch(`/api/providers/me/availability/${id}`, { method: 'DELETE' });
  await parseEnvelope<unknown>(response);
}
