import { ApiError } from '@/features/auth/data/authApi';
import type { ApiEnvelope } from '@/features/auth/data/types';
import type { PortfolioItem } from '@/features/provider/shared/data/types';

export interface CreatePortfolioItemRequest {
  title: string;
  description: string;
  mediaId: string | null;
  sortOrder: number;
}

export interface UpdatePortfolioItemRequest {
  title: string;
  description: string;
  sortOrder: number;
}

async function parseEnvelope<T>(response: Response): Promise<T> {
  const envelope = (await response.json().catch(() => null)) as ApiEnvelope<T> | null;

  if (!envelope || !response.ok || !envelope.success) {
    throw new ApiError(envelope?.description ?? 'Something went wrong. Please try again.');
  }

  return envelope.data as T;
}

export async function createPortfolioItem(payload: CreatePortfolioItemRequest): Promise<PortfolioItem> {
  const response = await fetch('/api/providers/me/portfolio', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return parseEnvelope<PortfolioItem>(response);
}

export async function updatePortfolioItem(id: string, payload: UpdatePortfolioItemRequest): Promise<PortfolioItem> {
  const response = await fetch(`/api/providers/me/portfolio/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return parseEnvelope<PortfolioItem>(response);
}

export async function deletePortfolioItem(id: string): Promise<void> {
  const response = await fetch(`/api/providers/me/portfolio/${id}`, { method: 'DELETE' });
  await parseEnvelope<unknown>(response);
}
