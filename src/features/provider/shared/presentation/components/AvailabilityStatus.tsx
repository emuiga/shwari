export default function AvailabilityStatus({ isAvailable }: { isAvailable: boolean | null }) {
  if (isAvailable === null) return null;

  return (
    <span className="inline-flex items-center gap-1.5 text-sm font-medium">
      <span className={`h-2 w-2 rounded-full ${isAvailable ? 'bg-primary' : 'bg-faint'}`} />
      <span className={isAvailable ? 'text-primary-strong' : 'text-subtle'}>
        {isAvailable ? 'Available now' : 'Unavailable'}
      </span>
    </span>
  );
}
