import type { ReactNode } from 'react';

interface DetailFieldProps {
  label: string;
  value: ReactNode;
}

export default function DetailField({ label, value }: DetailFieldProps) {
  return (
    <div className="flex items-center justify-between border-b border-border-soft py-3">
      <span className="text-sm text-subtle">{label}</span>
      <span className="text-sm font-semibold text-ink">{value}</span>
    </div>
  );
}
