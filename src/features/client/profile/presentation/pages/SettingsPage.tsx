'use client';

import Image from 'next/image';
import { useState } from 'react';
import DashboardHeader from '@/features/client/shared/presentation/components/DashboardHeader';
import ToggleSwitch from '@/features/client/profile/presentation/components/ToggleSwitch';
import {
  defaultNotificationPreferences,
  defaultProfile,
} from '@/features/client/profile/presentation/lib/settings';

export default function SettingsPage() {
  const [profile, setProfile] = useState(defaultProfile);
  const [preferences, setPreferences] = useState(defaultNotificationPreferences);
  const [savedMessage, setSavedMessage] = useState('');

  function handleSaveProfile(event: React.FormEvent) {
    event.preventDefault();
    setSavedMessage('Your changes have been saved.');
    setTimeout(() => setSavedMessage(''), 3000);
  }

  return (
    <div className="min-h-screen w-full bg-white">
      <DashboardHeader />

      <main className="mx-auto max-w-3xl px-6 py-6">
        <h1 className="text-xl font-bold text-ink">Settings</h1>

        <form onSubmit={handleSaveProfile} className="mt-6 rounded-card border border-border p-6">
          <h2 className="text-sm font-semibold text-ink">Profile</h2>

          <div className="mt-4 flex items-center gap-4">
            <div className="relative h-16 w-16 overflow-hidden rounded-full">
              <Image src={profile.avatar} alt="" fill sizes="64px" className="object-cover" />
            </div>
            <button
              type="button"
              className="rounded-control border border-border px-4 py-2 text-sm font-semibold text-body hover:bg-surface-muted"
            >
              Change photo
            </button>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="block text-sm">
              <span className="font-medium text-body">Full name</span>
              <input
                type="text"
                value={profile.name}
                onChange={(event) => setProfile({ ...profile, name: event.target.value })}
                className="mt-1.5 w-full rounded-control border border-border px-3 py-2 text-ink focus:border-primary"
              />
            </label>
            <label className="block text-sm">
              <span className="font-medium text-body">Phone number</span>
              <input
                type="tel"
                value={profile.phone}
                onChange={(event) => setProfile({ ...profile, phone: event.target.value })}
                className="mt-1.5 w-full rounded-control border border-border px-3 py-2 text-ink focus:border-primary"
              />
            </label>
            <label className="block text-sm sm:col-span-2">
              <span className="font-medium text-body">Email address</span>
              <input
                type="email"
                value={profile.email}
                onChange={(event) => setProfile({ ...profile, email: event.target.value })}
                className="mt-1.5 w-full rounded-control border border-border px-3 py-2 text-ink focus:border-primary"
              />
            </label>
          </div>

          <div className="mt-5 flex items-center gap-3">
            <button
              type="submit"
              className="rounded-control bg-primary px-5 py-2 text-sm font-semibold text-white hover:bg-primary-strong"
            >
              Save changes
            </button>
            {savedMessage && <span className="text-sm text-primary-strong">{savedMessage}</span>}
          </div>
        </form>

        <div className="mt-6 rounded-card border border-border p-6">
          <h2 className="text-sm font-semibold text-ink">Notifications</h2>

          <div className="mt-4 space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-gray-800">Email updates</p>
                <p className="text-xs text-subtle">Get booking and quote updates by email.</p>
              </div>
              <ToggleSwitch
                label="Email updates"
                checked={preferences.emailUpdates}
                onChange={(checked) => setPreferences({ ...preferences, emailUpdates: checked })}
              />
            </div>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-gray-800">SMS alerts</p>
                <p className="text-xs text-subtle">Receive text messages for urgent updates.</p>
              </div>
              <ToggleSwitch
                label="SMS alerts"
                checked={preferences.smsAlerts}
                onChange={(checked) => setPreferences({ ...preferences, smsAlerts: checked })}
              />
            </div>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-gray-800">Promotions</p>
                <p className="text-xs text-subtle">Offers and news from Movvapp.</p>
              </div>
              <ToggleSwitch
                label="Promotions"
                checked={preferences.promotions}
                onChange={(checked) => setPreferences({ ...preferences, promotions: checked })}
              />
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-card border border-border p-6">
          <h2 className="text-sm font-semibold text-ink">Security</h2>
          <p className="mt-1 text-xs text-subtle">Change the password used to sign in to your account.</p>
          <a
            href="/reset-password"
            className="mt-4 inline-block rounded-control border border-primary px-5 py-2 text-sm font-semibold text-primary-strong hover:bg-primary-subtle"
          >
            Change password
          </a>
        </div>

        <div className="mt-6 rounded-card border border-red-200 p-6">
          <h2 className="text-sm font-semibold text-danger">Danger zone</h2>
          <p className="mt-1 text-xs text-subtle">
            Deleting your account removes your saved providers, requests, and messages.
          </p>
          <button
            type="button"
            className="mt-4 rounded-control border border-danger px-5 py-2 text-sm font-semibold text-danger hover:bg-danger-soft"
          >
            Delete account
          </button>
        </div>
      </main>
    </div>
  );
}
