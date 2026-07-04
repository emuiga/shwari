'use client';

import { useState } from 'react';
import AuthLayout from '@/features/auth/presentation/components/AuthLayout';
import AuthTabs from '@/features/auth/presentation/components/AuthTabs';
import ProgressBar from '@/features/auth/presentation/components/ProgressBar';
import AccountTypeStep from '@/features/auth/presentation/components/register/AccountTypeStep';
import AccountDetailsStep, {
  type AccountDetails,
} from '@/features/auth/presentation/components/register/AccountDetailsStep';
import PasswordSetupStep from '@/features/auth/presentation/components/register/PasswordSetupStep';
import VerificationStep from '@/features/auth/presentation/components/register/VerificationStep';

export type AccountType = 'provider' | 'customer';

const TOTAL_STEPS = 4;

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [accountType, setAccountType] = useState<AccountType | null>(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [details, setDetails] = useState<AccountDetails>({
    name: '',
    email: '',
    phone: '',
  });
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [code, setCode] = useState(['', '', '', '']);

  const goToStep = (next: number) =>
    setStep(Math.min(Math.max(next, 1), TOTAL_STEPS));

  return (
    <AuthLayout>
      <AuthTabs active="register" />

      <div className="mt-6 space-y-6">
        <ProgressBar step={step} totalSteps={TOTAL_STEPS} />

        {step === 1 && (
          <AccountTypeStep
            accountType={accountType}
            acceptedTerms={acceptedTerms}
            onSelectAccountType={setAccountType}
            onToggleTerms={setAcceptedTerms}
            onContinue={() => goToStep(2)}
          />
        )}

        {step === 2 && (
          <AccountDetailsStep
            details={details}
            onChange={setDetails}
            onContinue={() => goToStep(3)}
          />
        )}

        {step === 3 && (
          <PasswordSetupStep
            password={password}
            confirmPassword={confirmPassword}
            onPasswordChange={setPassword}
            onConfirmPasswordChange={setConfirmPassword}
            onPrevious={() => goToStep(2)}
            onContinue={() => goToStep(4)}
          />
        )}

        {step === 4 && (
          <VerificationStep
            email={details.email}
            phone={details.phone}
            code={code}
            onCodeChange={setCode}
            onPrevious={() => goToStep(3)}
            onVerify={() => {
              /* TODO: submit verification code once auth API is wired up */
            }}
          />
        )}
      </div>
    </AuthLayout>
  );
}
