import { CheckCircleIcon } from '@/features/dashboard/presentation/components/icons';

const SAFETY_TIPS = [
  'Check the reviews to make sure the service provider is reliable',
  'Agree on the pricing and scope of work before making any payment',
  'Meet the provider in person at a public place',
];

export default function SafetyTips() {
  return (
    <div className="rounded-2xl border border-gray-200 p-4">
      <p className="text-sm font-semibold text-gray-900">Safety Tips</p>
      <ul className="mt-3 space-y-2.5">
        {SAFETY_TIPS.map((tip) => (
          <li key={tip} className="flex items-start gap-2 text-sm text-gray-600">
            <CheckCircleIcon className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
            {tip}
          </li>
        ))}
      </ul>
    </div>
  );
}
