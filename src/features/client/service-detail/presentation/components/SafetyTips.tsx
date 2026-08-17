import { CheckCircleIcon } from '@/components/icons';

const SAFETY_TIPS = [
  'Check the reviews to make sure the service provider is reliable',
  'Agree on the pricing and scope of work before making any payment',
  'Meet the provider in person at a public place',
];

export default function SafetyTips() {
  return (
    <div className="rounded-card border border-border p-4">
      <p className="text-sm font-semibold text-ink">Safety Tips</p>
      <ul className="mt-3 space-y-2.5">
        {SAFETY_TIPS.map((tip) => (
          <li key={tip} className="flex items-start gap-2 text-sm text-body">
            <CheckCircleIcon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            {tip}
          </li>
        ))}
      </ul>
    </div>
  );
}
