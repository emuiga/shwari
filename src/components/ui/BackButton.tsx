import Link from 'next/link';
import { ChevronLeftIcon } from '@/components/icons';

interface BackButtonProps {
  href: string;
  label?: string;
  className?: string;
}

export default function BackButton({ href, label = 'Back', className = '' }: BackButtonProps) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-1 rounded-control border border-border px-4 py-2 text-sm font-semibold text-body hover:bg-surface-muted ${className}`}
    >
      <ChevronLeftIcon className="h-3.5 w-3.5" />
      {label}
    </Link>
  );
}
