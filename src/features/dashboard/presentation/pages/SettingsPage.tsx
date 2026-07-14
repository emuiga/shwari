'use client';

import Image from 'next/image';
import { useState } from 'react';
import DashboardHeader from '@/features/dashboard/presentation/components/DashboardHeader';
import ToggleSwitch from '@/features/dashboard/presentation/components/ToggleSwitch';
import {
  defaultNotificationPreferences,
  defaultProfile,
} from '@/features/dashboard/presentation/lib/settings';

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
        <h1 className="text-xl font-bold text-gray-900">Settings</h1>

        <form onSubmit={handleSaveProfile} className="mt-6 rounded-2xl border border-gray-200 p-6">
          <h2 className="text-sm font-semibold text-gray-900">Profile</h2>

          <div className="mt-4 flex items-center gap-4">
            <div className="relative h-16 w-16 overflow-hidden rounded-full">
              <Image src={profile.avatar} alt="" fill sizes="64px" className="object-cover" />
            </div>
            <button
              type="button"
              className="rounded-md border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50"
            >
              Change photo
            </button>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="block text-sm">
              <span className="font-medium text-gray-700">Full name</span>
              <input
                type="text"
                value={profile.name}
                onChange={(event) => setProfile({ ...profile, name: event.target.value })}
                className="mt-1.5 w-full rounded-md border border-gray-200 px-3 py-2 text-gray-900 focus:border-green-500 focus:outline-none"
              />
            </label>
            <label className="block text-sm">
              <span className="font-medium text-gray-700">Phone number</span>
              <input
                type="tel"
                value={profile.phone}
                onChange={(event) => setProfile({ ...profile, phone: event.target.value })}
                className="mt-1.5 w-full rounded-md border border-gray-200 px-3 py-2 text-gray-900 focus:border-green-500 focus:outline-none"
              />
            </label>
            <label className="block text-sm sm:col-span-2">
              <span className="font-medium text-gray-700">Email address</span>
              <input
                type="email"
                value={profile.email}
                onChange={(event) => setProfile({ ...profile, email: event.target.value })}
                className="mt-1.5 w-full rounded-md border border-gray-200 px-3 py-2 text-gray-900 focus:border-green-500 focus:outline-none"
              />
            </label>
          </div>

          <div className="mt-5 flex items-center gap-3">
            <button
              type="submit"
              className="rounded-md bg-green-500 px-5 py-2 text-sm font-semibold text-white hover:bg-green-600"
            >
              Save changes
            </button>
            {savedMessage && <span className="text-sm text-green-600">{savedMessage}</span>}
          </div>
        </form>

        <div className="mt-6 rounded-2xl border border-gray-200 p-6">
          <h2 className="text-sm font-semibold text-gray-900">Notifications</h2>

          <div className="mt-4 space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-gray-800">Email updates</p>
                <p className="text-xs text-gray-500">Get booking and quote updates by email.</p>
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
                <p className="text-xs text-gray-500">Receive text messages for urgent updates.</p>
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
                <p className="text-xs text-gray-500">Offers and news from Movvapp.</p>
              </div>
              <ToggleSwitch
                label="Promotions"
                checked={preferences.promotions}
                onChange={(checked) => setPreferences({ ...preferences, promotions: checked })}
              />
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-gray-200 p-6">
          <h2 className="text-sm font-semibold text-gray-900">Security</h2>
          <p className="mt-1 text-xs text-gray-500">Change the password used to sign in to your account.</p>
          <a
            href="/reset-password"
            className="mt-4 inline-block rounded-md border border-green-500 px-5 py-2 text-sm font-semibold text-green-600 hover:bg-green-50"
          >
            Change password
          </a>
        </div>

        <div className="mt-6 rounded-2xl border border-red-200 p-6">
          <h2 className="text-sm font-semibold text-red-600">Danger zone</h2>
          <p className="mt-1 text-xs text-gray-500">
            Deleting your account removes your saved providers, requests, and messages.
          </p>
          <button
            type="button"
            className="mt-4 rounded-md border border-red-300 px-5 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
          >
            Delete account
          </button>
        </div>
      </main>
    </div>
  );
}
