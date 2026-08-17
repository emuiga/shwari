'use client';

import { useState } from 'react';
import { ApiError } from '@/features/auth/data/authApi';
import EmptyState from '@/features/provider/shared/presentation/components/EmptyState';
import {
  createAvailability,
  deleteAvailability,
  updateAvailability,
  type AvailabilityRequest,
} from '@/features/provider/shared/data/availabilityApi';
import type { ProviderAvailability } from '@/features/provider/shared/data/types';

const DAY_LABELS: Record<number, string> = {
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
  7: 'Sunday',
};

const EMPTY_FORM: AvailabilityRequest = {
  dayOfWeek: 1,
  startTime: '09:00',
  endTime: '17:00',
  available: true,
};

interface AvailabilityManagerProps {
  initialSlots: ProviderAvailability[];
}

export default function AvailabilityManager({ initialSlots }: AvailabilityManagerProps) {
  const [slots, setSlots] = useState(initialSlots);
  const [form, setForm] = useState<AvailabilityRequest>(EMPTY_FORM);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function startCreate() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setError(null);
    setIsFormOpen(true);
  }

  function startEdit(slot: ProviderAvailability) {
    setEditingId(slot.id);
    setForm({
      dayOfWeek: slot.dayOfWeek,
      startTime: slot.startTime.slice(0, 5),
      endTime: slot.endTime.slice(0, 5),
      available: slot.available,
    });
    setError(null);
    setIsFormOpen(true);
  }

  function resetForm() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setError(null);
    setIsFormOpen(false);
  }

  async function handleSave() {
    setSaving(true);
    setError(null);
    try {
      if (editingId) {
        const updated = await updateAvailability(editingId, form);
        setSlots((current) => current.map((slot) => (slot.id === editingId ? updated : slot)));
      } else {
        const created = await createAvailability(form);
        setSlots((current) => [...current, created]);
      }
      resetForm();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    setSaving(true);
    setError(null);
    try {
      await deleteAvailability(id);
      setSlots((current) => current.filter((slot) => slot.id !== id));
      if (editingId === id) resetForm();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-4">
      {slots.length === 0 && !isFormOpen ? (
        <EmptyState
          title="No availability slots set yet"
          description="Add your working hours so customers know when you're available."
          actionLabel="Add a slot"
          onAction={startCreate}
        />
      ) : (
        <>
          {slots.length > 0 && (
            <ul className="space-y-2">
              {slots
                .slice()
                .sort((a, b) => a.dayOfWeek - b.dayOfWeek)
                .map((slot) => (
                  <li
                    key={slot.id}
                    className="flex items-center justify-between rounded-control border border-border-soft px-3 py-2 text-sm"
                  >
                    <div>
                      <span className="font-medium text-ink">{DAY_LABELS[slot.dayOfWeek] ?? `Day ${slot.dayOfWeek}`}</span>
                      <span className="ml-2 text-subtle">
                        {slot.available ? `${slot.startTime.slice(0, 5)} – ${slot.endTime.slice(0, 5)}` : 'Closed'}
                      </span>
                    </div>
                    <div className="flex shrink-0 gap-2">
                      <button
                        type="button"
                        onClick={() => startEdit(slot)}
                        className="rounded-control border border-primary px-2.5 py-1 text-xs font-semibold text-primary-strong hover:bg-primary-subtle"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(slot.id)}
                        disabled={saving}
                        className="rounded-control border border-danger px-2.5 py-1 text-xs font-semibold text-danger hover:bg-danger-soft disabled:opacity-50"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
            </ul>
          )}

          {!isFormOpen && (
            <button
              type="button"
              onClick={startCreate}
              className="rounded-control border border-primary px-3 py-1.5 text-xs font-semibold text-primary-strong hover:bg-primary-subtle"
            >
              + Add a slot
            </button>
          )}

          {isFormOpen && (
            <div className="rounded-control border border-border-soft p-3">
              <p className="mb-2 text-xs font-semibold text-subtle">{editingId ? 'Edit slot' : 'Add a slot'}</p>
              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={form.dayOfWeek}
                  onChange={(event) => setForm({ ...form, dayOfWeek: Number(event.target.value) })}
                  className="rounded-control border border-border-strong px-2 py-1.5 text-sm text-ink"
                >
                  {Object.entries(DAY_LABELS).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
                <input
                  type="time"
                  value={form.startTime}
                  onChange={(event) => setForm({ ...form, startTime: event.target.value })}
                  className="rounded-control border border-border-strong px-2 py-1.5 text-sm text-ink"
                />
                <span className="text-sm text-faint">to</span>
                <input
                  type="time"
                  value={form.endTime}
                  onChange={(event) => setForm({ ...form, endTime: event.target.value })}
                  className="rounded-control border border-border-strong px-2 py-1.5 text-sm text-ink"
                />
                <label className="flex items-center gap-1.5 text-sm text-body">
                  <input
                    type="checkbox"
                    checked={form.available}
                    onChange={(event) => setForm({ ...form, available: event.target.checked })}
                    className="h-4 w-4 rounded border-border-strong text-primary focus:ring-primary"
                  />
                  Available
                </label>
              </div>

              {error && <p className="mt-2 text-xs text-danger">{error}</p>}

              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  onClick={resetForm}
                  disabled={saving}
                  className="rounded-control border border-border-strong px-3 py-1.5 text-xs font-semibold text-body hover:border-danger hover:bg-danger-soft hover:text-danger disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving}
                  className="rounded-control bg-primary px-3 py-1.5 text-xs font-semibold text-white hover:bg-primary-strong disabled:opacity-50"
                >
                  {saving ? 'Saving…' : editingId ? 'Save changes' : 'Add slot'}
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
