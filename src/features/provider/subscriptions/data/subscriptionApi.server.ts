import { fetchBackend } from '@/lib/auth/backendClient';
import { getAccessToken } from '@/lib/auth/session';
import type { Invoice, ProviderSubscription, SubscriptionPlan } from '@/features/provider/subscriptions/data/types';

async function fetchAsProvider<T>(path: string): Promise<T | null> {
  const accessToken = await getAccessToken();
  if (!accessToken) return null;

  const result = await fetchBackend<T>(path, {
    method: 'GET',
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return result.success ? result.data : null;
}

export function getMySubscriptionServer() {
  return fetchAsProvider<ProviderSubscription>('/providers/me/subscription');
}

export async function getMyInvoicesServer(): Promise<Invoice[]> {
  return (await fetchAsProvider<Invoice[]>('/providers/me/invoices')) ?? [];
}

export function getInvoiceServer(invoiceId: string) {
  return fetchAsProvider<Invoice>(`/providers/me/invoices/${invoiceId}`);
}

export async function getPlansServer(): Promise<SubscriptionPlan[]> {
  const result = await fetchBackend<SubscriptionPlan[]>('/plans?audience=PROVIDER', { method: 'GET' });
  return result.success && result.data ? result.data : [];
}

export async function getPlanServer(planId: string): Promise<SubscriptionPlan | null> {
  const plans = await getPlansServer();
  return plans.find((plan) => plan.id === planId) ?? null;
}
