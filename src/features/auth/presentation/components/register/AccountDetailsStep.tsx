'use client';

export interface AccountDetails {
  name: string;
  email: string;
  phone: string;
}

interface AccountDetailsStepProps {
  details: AccountDetails;
  errors?: Partial<Record<keyof AccountDetails, string>>;
  onChange: (details: AccountDetails) => void;
  onContinue: () => void;
}

export default function AccountDetailsStep({
  details,
  errors,
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
        <h2 className="text-lg font-semibold text-ink">
          Account Details
        </h2>
        <p className="text-sm text-subtle">
          Please provide the following details.
        </p>
      </div>

      <div>
        <label
          htmlFor="name"
          className="mb-1 block text-sm font-medium text-body"
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
          className={`w-full rounded-control border bg-white px-3 py-2 text-sm text-ink placeholder:text-faint ${
            errors?.name
              ? 'border-danger focus:border-red-500'
              : 'border-border-strong focus:border-primary'
          }`}
        />
        {errors?.name && (
          <p className="mt-1 text-xs text-danger">{errors.name}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-1 block text-sm font-medium text-body"
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
          className={`w-full rounded-control border bg-white px-3 py-2 text-sm text-ink placeholder:text-faint ${
            errors?.email
              ? 'border-danger focus:border-red-500'
              : 'border-border-strong focus:border-primary'
          }`}
        />
        {errors?.email && (
          <p className="mt-1 text-xs text-danger">{errors.email}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="phone"
          className="mb-1 block text-sm font-medium text-body"
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
          className={`w-full rounded-control border bg-white px-3 py-2 text-sm text-ink placeholder:text-faint ${
            errors?.phone
              ? 'border-danger focus:border-red-500'
              : 'border-border-strong focus:border-primary'
          }`}
        />
        {errors?.phone && (
          <p className="mt-1 text-xs text-danger">{errors.phone}</p>
        )}
      </div>

      <button
        type="button"
        disabled={!canContinue}
        onClick={onContinue}
        className="w-full rounded-control bg-primary py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-strong disabled:cursor-not-allowed disabled:opacity-50"
      >
        Continue
      </button>
    </div>
  );
}
