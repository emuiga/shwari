import { ApiError } from '@/features/auth/data/authApi';
import type { ApiEnvelope } from '@/features/auth/data/types';
import type { ProviderService } from '@/features/provider/shared/data/types';
import type { CreateServiceRequest, UpdateServiceRequest } from '@/features/provider/service-listing/data/types';

async function parseEnvelope<T>(response: Response): Promise<T> {
  const envelope = (await response.json().catch(() => null)) as ApiEnvelope<T> | null;

  if (!envelope || !response.ok || !envelope.success) {
    throw new ApiError(envelope?.description ?? 'Something went wrong. Please try again.');
  }

  return envelope.data as T;
}

export async function createService(payload: CreateServiceRequest): Promise<ProviderService> {
  const response = await fetch('/api/providers/me/services', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return parseEnvelope<ProviderService>(response);
}

export async function updateService(id: string, payload: UpdateServiceRequest): Promise<ProviderService> {
  const response = await fetch(`/api/providers/me/services/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return parseEnvelope<ProviderService>(response);
}

export async function deleteService(id: string): Promise<void> {
  const response = await fetch(`/api/providers/me/services/${id}`, { method: 'DELETE' });
  await parseEnvelope<unknown>(response);
}
