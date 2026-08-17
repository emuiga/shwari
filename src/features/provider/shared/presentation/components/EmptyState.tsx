import Image from 'next/image';
import Link from 'next/link';

interface EmptyStateProps {
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
  className?: string;
}

export default function EmptyState({
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
  className = '',
}: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center rounded-card border border-border py-16 text-center ${className}`}>
      <Image src="/icons/empty-folder.png" alt="" width={72} height={72} className="mb-4 opacity-80" />
      <p className="text-sm font-semibold text-ink">{title}</p>
      {description ? <p className="mx-auto mt-1 max-w-sm text-sm text-subtle">{description}</p> : null}
      {actionLabel && actionHref ? (
        <Link
          href={actionHref}
          className="mt-4 inline-block rounded-control border border-primary px-4 py-2 text-sm font-semibold text-primary-strong hover:bg-primary-subtle"
        >
          {actionLabel}
        </Link>
      ) : null}
      {actionLabel && onAction ? (
        <button
          type="button"
          onClick={onAction}
          className="mt-4 inline-block rounded-control border border-primary px-4 py-2 text-sm font-semibold text-primary-strong hover:bg-primary-subtle"
        >
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
}
