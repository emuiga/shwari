export interface CurrentPlan {
  name: string;
  priceLabel: string;
  features: string[];
}

export const currentPlan: CurrentPlan = {
  name: 'Free',
  priceLabel: 'KES 0 / month',
  features: ['Get limited access to leads', 'Get limited access to leads'],
};

export interface SubscriptionPlan {
  id: string;
  name: string;
  priceLabel: string;
  amount: number;
  billingCycle: string;
  renewsOn: string;
  features: string[];
}

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'daily-plan',
    name: 'Daily plan',
    priceLabel: 'KES 200',
    amount: 200,
    billingCycle: 'Daily',
    renewsOn: 'Jul 16, 2026',
    features: ['Get access to unlimited leads', 'Priority listing placement'],
  },
  {
    id: 'weekly-plan',
    name: 'Weekly plan',
    priceLabel: 'KES 700',
    amount: 700,
    billingCycle: 'Weekly',
    renewsOn: 'Jul 22, 2026',
    features: ['Get access to unlimited leads', 'Priority listing placement'],
  },
  {
    id: 'monthly-plan',
    name: 'Monthly plan',
    priceLabel: 'KES 2,500',
    amount: 2500,
    billingCycle: 'Monthly',
    renewsOn: 'Aug 15, 2026',
    features: ['Get access to unlimited leads', 'Priority listing placement', 'Dedicated support'],
  },
  {
    id: 'annual-plan',
    name: 'Annual plan',
    priceLabel: 'KES 25,000',
    amount: 25000,
    billingCycle: 'Yearly',
    renewsOn: 'Jul 15, 2027',
    features: ['Get access to unlimited leads', 'Priority listing placement', 'Dedicated support', 'Two months free'],
  },
];

export function getSubscriptionPlanById(id: string): SubscriptionPlan | undefined {
  return subscriptionPlans.find((plan) => plan.id === id);
}

export type PaymentStatus = 'Paid' | 'Overdue';

export interface BillingRecord {
  id: string;
  receiptNumber: string;
  amount: number;
  subscriptionPlan: string;
  paymentStatus: PaymentStatus;
  billingDate: string;
}

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** Recurring monthly charges for a single plan, newest first. The most recent charge is unpaid (Overdue). */
export function getPlanBillingHistory(plan: SubscriptionPlan, monthsBack = 6): BillingRecord[] {
  return Array.from({ length: monthsBack }, (_, index) => {
    const monthIndex = (6 - index) % 12; // deterministic mock month sequence, newest at index 0
    const isOverdue = index === 0;
    return {
      id: `${plan.id}-bill-${monthsBack - index}`,
      receiptNumber: `${1000 + index * 137}-${2000 + index * 43}`,
      amount: plan.amount,
      subscriptionPlan: plan.name,
      paymentStatus: isOverdue ? 'Overdue' : ('Paid' as PaymentStatus),
      billingDate: `15 ${MONTH_NAMES[monthIndex]} 2026`,
    };
  });
}

export function getBillingRecordById(id: string): BillingRecord | undefined {
  for (const plan of subscriptionPlans) {
    const record = getPlanBillingHistory(plan).find((item) => item.id === id);
    if (record) return record;
  }
  return undefined;
}
