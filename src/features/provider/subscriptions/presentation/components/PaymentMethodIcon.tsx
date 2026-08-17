import Image from 'next/image';
import type { PaymentGateway } from '@/features/provider/subscriptions/data/subscriptionApi';

interface PaymentMethodIconProps {
  method: PaymentGateway;
  className?: string;
}

export default function PaymentMethodIcon({ method, className = 'h-6 w-auto' }: PaymentMethodIconProps) {
  if (method === 'MPESA') {
    return <Image src="/images/mpesalogo.webp" alt="M-PESA" width={64} height={24} className={`object-contain ${className}`} />;
  }
  return <Image src="/icons/kcbbankicon.png" alt="KCB" width={64} height={24} className={`object-contain ${className}`} />;
}
