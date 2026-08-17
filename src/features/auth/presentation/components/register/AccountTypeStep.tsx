'use client';

import Link from 'next/link';
import type { AccountType } from '@/features/auth/presentation/pages/RegisterPage';

interface AccountTypeStepProps {
  accountType: AccountType | null;
  acceptedTerms: boolean;
  onSelectAccountType: (type: AccountType) => void;
  onToggleTerms: (accepted: boolean) => void;
  onContinue: () => void;
}

const OPTIONS: {
  type: AccountType;
  title: string;
  description: string;
}[] = [
  {
    type: 'provider',
    title: 'Service Provider',
    description: 'Effortlessly track and engage with your customers.',
  },
  {
    type: 'customer',
    title: 'Customer',
    description: 'Discover reliable movers effortlessly.',
  },
];

export default function AccountTypeStep({
  accountType,
  acceptedTerms,
  onSelectAccountType,
  onToggleTerms,
  onContinue,
}: AccountTypeStepProps) {
  const canContinue = accountType !== null && acceptedTerms;

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-ink">Account Type</h2>
        <p className="text-sm text-subtle">
          Let us know who you are for us to customize your experience
        </p>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-body">
          How would you like to register with us?
        </p>
        <div className="grid grid-cols-2 gap-3">
          {OPTIONS.map((option) => (
            <button
              key={option.type}
              type="button"
              onClick={() => onSelectAccountType(option.type)}
              className={`rounded-control border p-3 text-left transition-colors ${
                accountType === option.type
                  ? 'border-primary bg-primary-subtle'
                  : 'border-border bg-white'
              }`}
            >
              <p className="text-sm font-semibold text-ink">
                {option.title}
              </p>
              <p className="mt-1 text-xs text-subtle">
                {option.description}
              </p>
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        disabled={!canContinue}
        onClick={onContinue}
        className="w-full rounded-control bg-primary py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-strong disabled:cursor-not-allowed disabled:opacity-50"
      >
        Continue
      </button>

      <label className="flex items-start gap-2 text-xs text-subtle">
        <input
          type="checkbox"
          checked={acceptedTerms}
          onChange={(event) => onToggleTerms(event.target.checked)}
          className="mt-0.5 h-4 w-4 rounded border-border-strong text-primary focus:ring-green-500"
        />
        <span>
          Accept terms and conditions
          <br />
          You agree to our{' '}
          <Link href="/terms" className="font-medium text-body underline decoration-gray-300 underline-offset-2 hover:text-ink">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href="/privacy" className="font-medium text-body underline decoration-gray-300 underline-offset-2 hover:text-ink">
            Privacy Policy
          </Link>
          .
        </span>
      </label>
    </div>
  );
}
