'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthLayout from '@/features/auth/presentation/components/AuthLayout';
import AuthTabs from '@/features/auth/presentation/components/AuthTabs';
import ProgressBar from '@/features/auth/presentation/components/ProgressBar';
import AccountTypeStep from '@/features/auth/presentation/components/register/AccountTypeStep';
import AccountDetailsStep, {
  type AccountDetails,
} from '@/features/auth/presentation/components/register/AccountDetailsStep';
import PasswordSetupStep from '@/features/auth/presentation/components/register/PasswordSetupStep';
import VerificationStep from '@/features/auth/presentation/components/register/VerificationStep';
import BusinessDetailsStep from '@/features/auth/presentation/components/register/BusinessDetailsStep';
import ServicesOfferedStep from '@/features/auth/presentation/components/register/ServicesOfferedStep';
import type { BusinessDetails, ServicesOffered } from '@/features/auth/presentation/lib/businessProfile';

export type AccountType = 'provider' | 'customer';

const TOTAL_STEPS = 4;
const BUSINESS_PROFILE_STEPS = 2;

export default function RegisterPage() {
  const router = useRouter();
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
  const [businessDetails, setBusinessDetails] = useState<BusinessDetails>({
    businessName: '',
    phone: '',
    days: [],
    openingHours: '',
    closingHours: '',
    locations: [],
  });
  const [servicesOffered, setServicesOffered] = useState<ServicesOffered>({
    categoryIds: [],
    description: '',
  });

  const maxStep = accountType === 'provider' ? TOTAL_STEPS + BUSINESS_PROFILE_STEPS : TOTAL_STEPS;
  const goToStep = (next: number) => setStep(Math.min(Math.max(next, 1), maxStep));

  function handleVerify() {
    if (accountType === 'provider') {
      goToStep(TOTAL_STEPS + 1);
    } else {
      router.push('/dashboard');
    }
  }

  function handleBusinessProfileSubmit() {
    router.push('/provider/dashboard');
  }

  return (
    <AuthLayout>
      <AuthTabs active="register" />

      <div className="mt-6 space-y-6">
        <ProgressBar
          step={step > TOTAL_STEPS ? step - TOTAL_STEPS : step}
          totalSteps={step > TOTAL_STEPS ? BUSINESS_PROFILE_STEPS : TOTAL_STEPS}
        />

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
            onVerify={handleVerify}
          />
        )}

        {step === TOTAL_STEPS + 1 && (
          <BusinessDetailsStep
            details={businessDetails}
            onChange={setBusinessDetails}
            onContinue={() => goToStep(TOTAL_STEPS + 2)}
          />
        )}

        {step === TOTAL_STEPS + 2 && (
          <ServicesOfferedStep
            services={servicesOffered}
            onChange={setServicesOffered}
            onPrevious={() => goToStep(TOTAL_STEPS + 1)}
            onSubmit={handleBusinessProfileSubmit}
          />
        )}
      </div>
    </AuthLayout>
  );
}
