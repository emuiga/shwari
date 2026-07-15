import type { ReactNode } from 'react';

interface DetailFieldProps {
  label: string;
  value: ReactNode;
}

export default function DetailField({ label, value }: DetailFieldProps) {
  return (
    <div className="flex items-center justify-between border-b border-gray-100 py-3">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-sm font-semibold text-gray-900">{value}</span>
    </div>
  );
}
