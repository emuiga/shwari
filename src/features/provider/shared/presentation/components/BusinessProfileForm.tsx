'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ApiError } from '@/features/auth/data/authApi';
import { updateMyProviderProfile } from '@/features/provider/shared/data/providerProfileApi';
import type { ProviderProfile } from '@/features/provider/shared/data/types';

interface BusinessProfileFormProps {
  profile: ProviderProfile | null;
  onSaved: (profile: ProviderProfile) => void;
  onCancel: () => void;
}

const DAYS: { key: string; label: string }[] = [
  { key: 'mon', label: 'Monday' },
  { key: 'tue', label: 'Tuesday' },
  { key: 'wed', label: 'Wednesday' },
  { key: 'thu', label: 'Thursday' },
  { key: 'fri', label: 'Friday' },
  { key: 'sat', label: 'Saturday' },
  { key: 'sun', label: 'Sunday' },
];

interface DayHours {
  open: boolean;
  start: string;
  end: string;
}

function parseOperatingHours(hours: Record<string, string> | undefined): Record<string, DayHours> {
  const result: Record<string, DayHours> = {};
  for (const { key } of DAYS) {
    const range = hours?.[key];
    if (range) {
      const [start, end] = range.split('-').map((part) => part.trim());
      result[key] = { open: true, start: start || '09:00', end: end || '17:00' };
    } else {
      result[key] = { open: false, start: '09:00', end: '17:00' };
    }
  }
  return result;
}

export default function BusinessProfileForm({ profile, onSaved, onCancel }: BusinessProfileFormProps) {
  const [businessName, setBusinessName] = useState(profile?.businessName ?? '');
  const [description, setDescription] = useState(profile?.description ?? '');
  const [latitude, setLatitude] = useState(profile?.latitude ?? null);
  const [longitude, setLongitude] = useState(profile?.longitude ?? null);
  const [locating, setLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [hours, setHours] = useState<Record<string, DayHours>>(() => parseOperatingHours(profile?.operatingHours));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function updateDay(key: string, patch: Partial<DayHours>) {
    setHours((prev) => ({ ...prev, [key]: { ...prev[key], ...patch } }));
  }

  function detectLocation() {
    if (!navigator.geolocation) {
      setLocationError('Location detection is not supported on this browser.');
      return;
    }

    setLocating(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        setLocating(false);
      },
      (geoError) => {
        setLocationError(
          geoError.code === geoError.PERMISSION_DENIED
            ? 'Location access was denied. Enable it in your browser settings and try again.'
            : 'Could not detect your location. Please try again.',
        );
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  }

  async function handleSave() {
    if (!businessName.trim()) {
      setError('Business name is required.');
      return;
    }
    setSaving(true);
    setError(null);

    const operatingHours: Record<string, string> = {};
    for (const { key } of DAYS) {
      const day = hours[key];
      if (day.open) operatingHours[key] = `${day.start}-${day.end}`;
    }

    try {
      const updated = await updateMyProviderProfile({
        businessName: businessName.trim(),
        description: description.trim(),
        latitude: latitude ?? undefined,
        longitude: longitude ?? undefined,
        operatingHours,
      });
      onSaved(updated);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mt-4 space-y-4">
      <div>
        <label className="mb-1 block text-xs font-medium text-body">Business name</label>
        <input
          type="text"
          value={businessName}
          onChange={(event) => setBusinessName(event.target.value)}
          className="w-full rounded-control border border-border-strong px-3 py-2 text-sm text-ink focus:border-primary"
        />
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium text-body">Description</label>
        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          rows={3}
          className="w-full rounded-control border border-border-strong px-3 py-2 text-sm text-ink focus:border-primary"
        />
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium text-body">Business location</label>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={detectLocation}
            disabled={locating}
            className="flex items-center gap-2 rounded-control border border-border-strong px-3 py-2 text-sm font-semibold text-body hover:bg-surface-muted disabled:opacity-50"
          >
            <Image src="/icons/target.png" alt="" width={16} height={16} />
            {locating ? 'Detecting…' : latitude != null ? 'Update to my current location' : 'Use my current location'}
          </button>
          {latitude != null && longitude != null && (
            <p className="text-sm text-subtle">
              {latitude.toFixed(4)}, {longitude.toFixed(4)}
            </p>
          )}
        </div>
        {locationError && <p className="mt-1 text-xs text-danger">{locationError}</p>}
        {latitude == null && !locationError && (
          <p className="mt-1 text-xs text-faint">
            Tap the button while you&apos;re at your business to set its location.
          </p>
        )}
      </div>

      <div>
        <p className="mb-2 text-xs font-medium text-body">Operating hours</p>
        <div className="space-y-2">
          {DAYS.map(({ key, label }) => {
            const day = hours[key];
            return (
              <div key={key} className="flex flex-wrap items-center gap-2">
                <label className="flex w-28 shrink-0 items-center gap-2 text-sm text-body">
                  <input
                    type="checkbox"
                    checked={day.open}
                    onChange={(event) => updateDay(key, { open: event.target.checked })}
                    className="h-4 w-4 rounded border-border-strong text-primary focus:ring-primary"
                  />
                  {label}
                </label>
                <input
                  type="time"
                  value={day.start}
                  disabled={!day.open}
                  onChange={(event) => updateDay(key, { start: event.target.value })}
                  className="rounded-control border border-border-strong px-2 py-1 text-sm text-ink disabled:opacity-40"
                />
                <span className="text-sm text-faint">to</span>
                <input
                  type="time"
                  value={day.end}
                  disabled={!day.open}
                  onChange={(event) => updateDay(key, { end: event.target.value })}
                  className="rounded-control border border-border-strong px-2 py-1 text-sm text-ink disabled:opacity-40"
                />
              </div>
            );
          })}
        </div>
      </div>

      {error && <p className="text-xs text-danger">{error}</p>}

      <div className="flex gap-2">
        <button
          type="button"
          onClick={onCancel}
          disabled={saving}
          className="flex-1 rounded-control border border-border-strong py-2 text-sm font-semibold text-body hover:border-danger hover:bg-danger-soft hover:text-danger disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="flex-1 rounded-control bg-primary py-2 text-sm font-semibold text-white hover:bg-primary-strong disabled:opacity-50"
        >
          {saving ? 'Saving…' : 'Save business profile'}
        </button>
      </div>
    </div>
  );
}
