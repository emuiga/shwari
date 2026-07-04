'use client';

import PasswordField from '@/features/auth/presentation/components/PasswordField';
import PasswordRequirements from '@/features/auth/presentation/components/PasswordRequirements';
import { PASSWORD_RULES } from '@/features/auth/presentation/lib/passwordRules';

interface PasswordSetupStepProps {
  password: string;
  confirmPassword: string;
  onPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
  onPrevious: () => void;
  onContinue: () => void;
}

export default function PasswordSetupStep({
  password,
  confirmPassword,
  onPasswordChange,
  onConfirmPasswordChange,
  onPrevious,
  onContinue,
}: PasswordSetupStepProps) {
  const passwordsMatch = password.length > 0 && password === confirmPassword;
  const allRulesPass = PASSWORD_RULES.every((rule) => rule.test(password));
  const canContinue = allRulesPass && passwordsMatch;

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">
          Password setup
        </h2>
        <p className="text-sm text-gray-500">
          Please make sure your password meets the requirements.
        </p>
      </div>

      <PasswordField
        label="Password"
        placeholder="Enter your password"
        value={password}
        onChange={onPasswordChange}
      />

      <PasswordField
        label="Confirm Password"
        placeholder="Confirm your password"
        value={confirmPassword}
        onChange={onConfirmPasswordChange}
      />

      <PasswordRequirements password={password} passwordsMatch={passwordsMatch} />

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onPrevious}
          className="w-full rounded-md border border-green-500 py-2.5 text-sm font-semibold text-green-600 transition-colors hover:bg-green-50"
        >
          Previous
        </button>
        <button
          type="button"
          disabled={!canContinue}
          onClick={onContinue}
          className="w-full rounded-md bg-green-500 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
