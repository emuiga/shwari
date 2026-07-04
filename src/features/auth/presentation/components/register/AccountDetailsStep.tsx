'use client';

export interface AccountDetails {
  name: string;
  email: string;
  phone: string;
}

interface AccountDetailsStepProps {
  details: AccountDetails;
  onChange: (details: AccountDetails) => void;
  onContinue: () => void;
}

export default function AccountDetailsStep({
  details,
  onChange,
  onContinue,
}: AccountDetailsStepProps) {
  const canContinue =
    details.name.trim() !== '' &&
    details.email.trim() !== '' &&
    details.phone.trim() !== '';

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">
          Account Details
        </h2>
        <p className="text-sm text-gray-500">
          Please provide the following details.
        </p>
      </div>

      <div>
        <label
          htmlFor="name"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <input
          id="name"
          type="text"
          placeholder="Enter your name"
          value={details.name}
          onChange={(event) =>
            onChange({ ...details, name: event.target.value })
          }
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-green-500 focus:outline-none"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="Enter your registered email"
          value={details.email}
          onChange={(event) =>
            onChange({ ...details, email: event.target.value })
          }
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-green-500 focus:outline-none"
        />
      </div>

      <div>
        <label
          htmlFor="phone"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Phone Number
        </label>
        <input
          id="phone"
          type="tel"
          placeholder="Enter your phone number"
          value={details.phone}
          onChange={(event) =>
            onChange({ ...details, phone: event.target.value })
          }
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-green-500 focus:outline-none"
        />
      </div>

      <button
        type="button"
        disabled={!canContinue}
        onClick={onContinue}
        className="w-full rounded-md bg-green-500 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Continue
      </button>
    </div>
  );
}
