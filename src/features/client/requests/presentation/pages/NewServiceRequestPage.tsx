'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import DashboardHeader from '@/features/client/shared/presentation/components/DashboardHeader';
import LocationSearchField from '@/features/client/browse/presentation/components/LocationSearchField';
import ServiceRequestSuccessModal from '@/features/client/requests/presentation/components/ServiceRequestSuccessModal';
import { CalendarIcon, UploadIcon, XIcon } from '@/components/icons';
import { useServiceRequests } from '@/features/client/requests/presentation/context/ServiceRequestsContext';

const SERVICE_TYPES = [
  'Residential Moving',
  'Commercial and office moving',
  'Specialized item moving',
  'Junk and waste disposal',
];

const MAX_IMAGES = 6;
const MAX_DESCRIPTION_LENGTH = 300;
const PLACEHOLDER_IMAGE = '/images/moving-service.png';

export default function NewServiceRequestPage() {
  const router = useRouter();
  const { addRequest } = useServiceRequests();

  const [serviceType, setServiceType] = useState('');
  const [requestDate, setRequestDate] = useState('');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const canSubmit = serviceType && requestDate && origin && destination && description;

  function resetForm() {
    setServiceType('');
    setRequestDate('');
    setOrigin('');
    setDestination('');
    setDescription('');
    setImages([]);
  }

  function handleSubmit() {
    if (!canSubmit) return;
    addRequest({
      title: serviceType,
      requestDate,
      origin,
      destination,
      description,
      images: images.length > 0 ? images : [PLACEHOLDER_IMAGE],
    });
    setShowSuccess(true);
  }

  return (
    <div className="min-h-screen w-full bg-white">
      <DashboardHeader />

      <main className="px-4 py-6 sm:px-6">
        <nav className="mb-6 text-xs text-faint">
          <Link href="/service-requests" className="hover:text-body">
            Service Requests
          </Link>
          <span className="mx-1.5">/</span>
          <span className="text-body">New service request</span>
        </nav>

        <div className="mx-auto max-w-3xl rounded-card border border-border p-4 sm:p-6">
          <h1 className="text-lg font-bold text-ink">Create New Service Request</h1>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <p className="text-xs font-semibold text-subtle">Service type</p>
              <div className="mt-1.5 flex flex-wrap gap-2">
                {SERVICE_TYPES.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setServiceType(type)}
                    className={`rounded-full border px-3.5 py-2 text-xs font-semibold transition-colors sm:text-sm ${
                      serviceType === type
                        ? 'border-primary bg-primary-subtle text-primary-strong'
                        : 'border-border bg-white text-body hover:bg-surface-muted'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="text-xs font-semibold text-subtle" htmlFor="request-date">
                Request creation date
              </label>
              <div className="relative mt-1">
                <input
                  id="request-date"
                  type="date"
                  value={requestDate}
                  onChange={(event) => setRequestDate(event.target.value)}
                  className="w-full rounded-control border border-border bg-surface-muted px-3 py-2.5 text-sm text-ink"
                />
                <CalendarIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
              </div>
            </div>

            <LocationSearchField label="Request Origin" value={origin} onChange={setOrigin} />
            <LocationSearchField label="Request Destination" value={destination} onChange={setDestination} />

            <div className="sm:col-span-2">
              <label className="text-xs font-semibold text-subtle" htmlFor="request-description">
                Request Description
              </label>
              <textarea
                id="request-description"
                value={description}
                maxLength={MAX_DESCRIPTION_LENGTH}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Type a message here"
                rows={4}
                className="mt-1 w-full resize-none rounded-control border border-border bg-surface-muted px-3 py-2.5 text-sm text-ink placeholder:text-faint"
              />
              <p className="mt-1 text-right text-xs text-faint">
                {description.length}/{MAX_DESCRIPTION_LENGTH}
              </p>
            </div>

            <div className="sm:col-span-2">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-subtle">
                  Upload Service Images {images.length}/{MAX_IMAGES}
                </p>
                <button
                  type="button"
                  disabled={images.length >= MAX_IMAGES}
                  onClick={() => setImages((current) => [...current, PLACEHOLDER_IMAGE])}
                  className="flex items-center gap-1.5 text-xs font-semibold text-faint hover:text-body disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <UploadIcon className="h-3.5 w-3.5" />
                  Upload image
                </button>
              </div>

              {images.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {images.map((image, index) => (
                    <div key={`${image}-${index}`} className="relative h-14 w-14 overflow-hidden rounded-lg">
                      <Image src={image} alt="" fill sizes="56px" className="object-cover" />
                      <button
                        type="button"
                        aria-label="Remove image"
                        onClick={() => setImages((current) => current.filter((_, i) => i !== index))}
                        className="absolute right-0.5 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-black/60 text-white"
                      >
                        <XIcon className="h-2.5 w-2.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 flex sm:justify-end">
            <button
              type="button"
              disabled={!canSubmit}
              onClick={handleSubmit}
              className="w-full rounded-control bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-strong disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
              Create Service Request
            </button>
          </div>
        </div>
      </main>

      {showSuccess && (
        <ServiceRequestSuccessModal
          onClose={() => router.push('/service-requests')}
          onCreateAnother={() => {
            resetForm();
            setShowSuccess(false);
          }}
        />
      )}
    </div>
  );
}
