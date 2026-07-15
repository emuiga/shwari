import Image from 'next/image';
import Link from 'next/link';

interface EmptyStateProps {
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  className?: string;
}

export default function EmptyState({ title, description, actionLabel, actionHref, className = '' }: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center rounded-2xl border border-gray-200 py-16 text-center ${className}`}>
      <Image src="/icons/empty-folder.png" alt="" width={72} height={72} className="mb-4 opacity-80" />
      <p className="text-sm font-semibold text-gray-900">{title}</p>
      {description ? <p className="mx-auto mt-1 max-w-sm text-sm text-gray-500">{description}</p> : null}
      {actionLabel && actionHref ? (
        <Link
          href={actionHref}
          className="mt-4 inline-block rounded-md border border-green-500 px-4 py-2 text-sm font-semibold text-green-600 hover:bg-green-50"
        >
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
}
