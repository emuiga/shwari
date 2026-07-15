import Image from 'next/image';

export type PaymentMethod = 'mpesa' | 'card';

interface PaymentMethodIconProps {
  method: PaymentMethod;
  className?: string;
}

export default function PaymentMethodIcon({ method, className = 'h-6 w-auto' }: PaymentMethodIconProps) {
  if (method === 'mpesa') {
    return <Image src="/images/mpesalogo.webp" alt="M-PESA" width={64} height={24} className={`object-contain ${className}`} />;
  }
  return (
    <span className="flex items-center gap-1">
      <Image src="/icons/visa.svg" alt="Visa" width={34} height={25} className={className} />
      <Image src="/icons/mastercard.svg" alt="Mastercard" width={34} height={25} className={className} />
    </span>
  );
}
