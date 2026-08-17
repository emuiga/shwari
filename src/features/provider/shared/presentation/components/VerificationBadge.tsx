const STATUS_LABELS: Record<string, string> = {
  VERIFIED: 'Verified',
  APPROVED: 'Approved',
  PENDING: 'Pending',
  REJECTED: 'Rejected',
};

export default function VerificationBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    VERIFIED: 'bg-primary-subtle text-primary-emphasis',
    APPROVED: 'bg-primary-subtle text-primary-emphasis',
    PENDING: 'bg-warning-soft text-warning',
    REJECTED: 'bg-danger-soft text-danger',
  };

  const label = STATUS_LABELS[status] ?? status;

  return (
    <span
      title={
        status === 'PENDING'
          ? "Your business is awaiting review by our team before it's visible to customers."
          : undefined
      }
      className={`inline-block rounded-full px-2.5 py-1 text-xs font-semibold ${styles[status] ?? 'bg-surface-muted text-body'}`}
    >
      Verification: {label}
    </span>
  );
}
