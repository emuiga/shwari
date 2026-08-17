import Image from 'next/image';
import Link from 'next/link';
import { CheckIcon } from '@/features/provider/shared/presentation/components/icons';
import { formatPlanPrice, getDefaultCycle, getPlanFeatures } from '@/features/provider/subscriptions/presentation/lib/planDisplay';
import type { SubscriptionPlan } from '@/features/provider/subscriptions/data/types';

interface PricingPageProps {
  plans: SubscriptionPlan[];
}

export default function PricingPage({ plans }: PricingPageProps) {
  return (
    <div className="flex flex-1 flex-col bg-zinc-950">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-8 sm:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/images/moving-truck-full-green.png" alt="" width={28} height={28} />
          <span className="font-[family-name:var(--font-heading)] text-lg font-semibold tracking-tight text-white">
            Movvapp
          </span>
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/services" className="text-sm font-medium text-white/80 transition-colors hover:text-green-400">
            Services
          </Link>
          <Link
            href="/login"
            className="rounded-full border border-white/30 px-5 py-2 text-sm font-medium text-white transition-colors hover:border-primary hover:text-green-400"
          >
            Log in
          </Link>
        </div>
      </nav>

      <section className="px-6 pb-16 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold tracking-[0.3em] text-green-400 uppercase">Pricing</span>
          <h1 className="mt-6 font-[family-name:var(--font-heading)] text-4xl leading-tight font-semibold tracking-tight text-white sm:text-5xl">
            Plans for movers of every size.
          </h1>
          <p className="mt-4 text-lg text-white/70">
            List your services, reach more customers, and grow your business on Movvapp. Cancel or change plans any time.
          </p>
        </div>

        {plans.length === 0 ? (
          <p className="mt-16 text-center text-white/60">Plans are unavailable right now. Please check back shortly.</p>
        ) : (
          <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {plans
              .slice()
              .sort((a, b) => (a.tierRank ?? 0) - (b.tierRank ?? 0))
              .map((plan) => {
                const cycle = getDefaultCycle(plan);
                const features = getPlanFeatures(plan);
                return (
                  <div
                    key={plan.id}
                    className="flex flex-col rounded-2xl border border-white/10 bg-zinc-900 p-6"
                  >
                    <p className="font-[family-name:var(--font-heading)] text-xl font-semibold text-white">{plan.name}</p>
                    {plan.description && <p className="mt-1 text-sm text-white/60">{plan.description}</p>}
                    <p className="mt-5 text-2xl font-bold text-white">{formatPlanPrice(plan, cycle)}</p>

                    <ul className="mt-6 flex-1 space-y-2.5">
                      {features.map((feature, index) => (
                        <li key={`${feature}-${index}`} className="flex items-start gap-2 text-sm text-white/80">
                          <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <Link
                      href="/register"
                      className="mt-6 flex w-full items-center justify-center rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-green-400"
                    >
                      Get started
                    </Link>
                  </div>
                );
              })}
          </div>
        )}
      </section>
    </div>
  );
}
