export type BillingCycle = 'FREE' | 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'QUARTERLY' | 'SEMI_ANNUAL' | 'YEARLY' | 'ANNUAL';

export interface SubscriptionPlan {
  id: string;
  audience?: string;
  flavour?: string;
  name: string;
  description?: string;
  tierRank?: number;
  maxAds?: number;
  prices: Partial<Record<BillingCycle, number>>;
  monthlyPrice?: number;
  annualPrice?: number;
  entitlements?: string[];
  free?: boolean;
}

export interface ProviderSubscription {
  id?: string;
  planId?: string;
  planName?: string;
  status?: string;
  billingCycle?: string;
  price?: number;
  currentPeriodEnd?: string;
}

export interface Invoice {
  id: string;
  invoiceNumber?: string;
  amount?: number;
  status?: string;
  planName?: string;
  dueDate?: string;
  createdAt?: string;
}
