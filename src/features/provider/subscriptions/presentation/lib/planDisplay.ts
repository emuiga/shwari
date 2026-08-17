import { formatKes } from '@/lib/formatKes';
import type { BillingCycle, SubscriptionPlan } from '@/features/provider/subscriptions/data/types';

const ENTITLEMENT_LABELS: Record<string, string> = {
  LEAD_ACCESS: 'Access to customer leads',
  ANALYTICS: 'Profile & listing analytics',
  VIEW_CONTACT: 'View customer contact details',
  PRIORITY_SUPPORT: 'Priority support',
};

export const BILLING_CYCLE_LABELS: Record<string, string> = {
  FREE: 'Free',
  DAILY: 'Daily',
  WEEKLY: 'Weekly',
  MONTHLY: 'Monthly',
  QUARTERLY: 'Quarterly',
  SEMI_ANNUAL: 'Semi-annual',
  YEARLY: 'Yearly',
  ANNUAL: 'Annual',
};

export function getPlanFeatures(plan: SubscriptionPlan): string[] {
  const features: string[] = [];
  features.push(plan.maxAds === -1 ? 'Unlimited service listings' : `Up to ${plan.maxAds ?? 0} service listings`);
  for (const entitlement of plan.entitlements ?? []) {
    features.push(ENTITLEMENT_LABELS[entitlement] ?? entitlement);
  }
  return features;
}

export function getAvailableCycles(plan: SubscriptionPlan): BillingCycle[] {
  return Object.keys(plan.prices) as BillingCycle[];
}

export function getDefaultCycle(plan: SubscriptionPlan): BillingCycle {
  const cycles = getAvailableCycles(plan);
  return (cycles.includes('MONTHLY') ? 'MONTHLY' : cycles[0]) ?? 'FREE';
}

export function formatPlanPrice(plan: SubscriptionPlan, cycle: BillingCycle): string {
  const price = plan.prices[cycle];
  if (price == null) return '—';
  if (price === 0) return 'Free';
  return `${formatKes(price)} / ${(BILLING_CYCLE_LABELS[cycle] ?? cycle).toLowerCase()}`;
}

export function formatDate(iso: string | undefined): string {
  if (!iso) return '—';
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' });
}
