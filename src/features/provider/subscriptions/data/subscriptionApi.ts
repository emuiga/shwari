import { ApiError } from '@/features/auth/data/authApi';
import type { ApiEnvelope } from '@/features/auth/data/types';
import type { Invoice, ProviderSubscription } from '@/features/provider/subscriptions/data/types';

export type PaymentGateway = 'MPESA' | 'KCB';

export interface CheckoutRequest {
  planId: string;
  billingCycle: string;
}

interface CheckoutResponse {
  subscription?: ProviderSubscription;
  invoice?: Invoice;
}

async function parseEnvelope<T>(response: Response): Promise<T> {
  const envelope = (await response.json().catch(() => null)) as ApiEnvelope<T> | null;

  if (!envelope || !response.ok || !envelope.success) {
    throw new ApiError(envelope?.description ?? 'Something went wrong. Please try again.');
  }

  return envelope.data as T;
}

export async function checkoutSubscription(payload: CheckoutRequest): Promise<CheckoutResponse> {
  const response = await fetch('/api/providers/me/subscription/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...payload, idempotencyKey: `checkout-${crypto.randomUUID()}` }),
  });
  return parseEnvelope<CheckoutResponse>(response);
}

export async function payInvoice(invoiceId: string, gateway: PaymentGateway, phoneNumber: string): Promise<Invoice> {
  const response = await fetch(`/api/providers/me/invoices/${invoiceId}/pay`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ gateway, phoneNumber, idempotencyKey: `pay-${crypto.randomUUID()}` }),
  });
  return parseEnvelope<Invoice>(response);
}
