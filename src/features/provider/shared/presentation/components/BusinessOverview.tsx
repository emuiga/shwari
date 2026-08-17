import VerificationBadge from '@/features/provider/shared/presentation/components/VerificationBadge';
import AvailabilityStatus from '@/features/provider/shared/presentation/components/AvailabilityStatus';
import { formatDayGroupLabel, formatHoursRange, groupOperatingHours } from '@/features/provider/shared/presentation/lib/operatingHours';
import type { ProviderProfile } from '@/features/provider/shared/data/types';

interface BusinessOverviewProps {
  profile: ProviderProfile | null;
  isAvailable: boolean | null;
  onEdit: () => void;
}

export default function BusinessOverview({ profile, isAvailable, onEdit }: BusinessOverviewProps) {
  if (!profile?.businessName) {
    return (
      <div className="text-center">
        <p className="text-sm text-subtle">You haven&apos;t set up your business profile yet.</p>
        <button
          type="button"
          onClick={onEdit}
          className="mt-3 rounded-control bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-strong"
        >
          Set up business profile
        </button>
      </div>
    );
  }

  const hoursGroups = profile.operatingHours ? groupOperatingHours(profile.operatingHours) : [];

  return (
    <div>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-base font-semibold text-ink">{profile.businessName}</p>
          {profile.description && <p className="mt-1 text-sm text-subtle">{profile.description}</p>}
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {profile.verificationStatus && <VerificationBadge status={profile.verificationStatus} />}
          <button
            type="button"
            onClick={onEdit}
            className="rounded-control border border-primary px-3 py-1.5 text-xs font-semibold text-primary-strong hover:bg-primary-subtle"
          >
            Edit
          </button>
        </div>
      </div>

      {profile.latitude != null && profile.longitude != null && (
        <p className="mt-2 text-xs text-faint">
          Location: {profile.latitude.toFixed(4)}, {profile.longitude.toFixed(4)}
        </p>
      )}

      <div className="mt-4 border-t border-border-soft pt-4">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wide text-faint">Availability</p>
          <AvailabilityStatus isAvailable={isAvailable} />
        </div>
        {hoursGroups.length > 0 ? (
          <ul className="mt-2 space-y-1.5">
            {hoursGroups.map((group) => (
              <li key={group.days[0]} className="flex justify-between text-sm text-body">
                <span>{formatDayGroupLabel(group.days)}</span>
                <span className="font-medium text-ink">{formatHoursRange(group.range)}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-2 text-sm text-subtle">No operating hours set.</p>
        )}
      </div>
    </div>
  );
}
