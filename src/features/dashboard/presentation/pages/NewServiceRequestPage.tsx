'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import DashboardHeader from '@/features/dashboard/presentation/components/DashboardHeader';
import LocationSearchField from '@/features/dashboard/presentation/components/LocationSearchField';
import ServiceRequestSuccessModal from '@/features/dashboard/presentation/components/ServiceRequestSuccessModal';
import { CalendarIcon, UploadIcon, XIcon } from '@/features/dashboard/presentation/components/icons';
import { useServiceRequests } from '@/features/dashboard/presentation/context/ServiceRequestsContext';

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

      <main className="px-6 py-6">
        <nav className="mb-6 text-xs text-gray-400">
          <Link href="/service-requests" className="hover:text-gray-600">
            Service Requests
          </Link>
          <span className="mx-1.5">/</span>
          <span className="text-gray-600">New service request</span>
        </nav>

        <div className="mx-auto max-w-3xl rounded-2xl border border-gray-200 p-6">
          <h1 className="text-lg font-bold text-gray-900">Create New Service Request</h1>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div>
              <label className="text-xs font-semibold text-gray-500" htmlFor="service-type">
                Service type
              </label>
              <select
                id="service-type"
                value={serviceType}
                onChange={(event) => setServiceType(event.target.value)}
                className="mt-1 w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 focus:outline-none"
              >
                <option value="">select service type</option>
                {SERVICE_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500" htmlFor="request-date">
                Request creation date
              </label>
              <div className="relative mt-1">
                <input
                  id="request-date"
                  type="date"
                  value={requestDate}
                  onChange={(event) => setRequestDate(event.target.value)}
                  className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 focus:outline-none"
                />
                <CalendarIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <LocationSearchField label="Request Origin" value={origin} onChange={setOrigin} />
            <LocationSearchField label="Request Destination" value={destination} onChange={setDestination} />

            <div className="sm:col-span-2">
              <label className="text-xs font-semibold text-gray-500" htmlFor="request-description">
                Request Description
              </label>
              <textarea
                id="request-description"
                value={description}
                maxLength={MAX_DESCRIPTION_LENGTH}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Type a message here"
                rows={4}
                className="mt-1 w-full resize-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
              />
              <p className="mt-1 text-right text-xs text-gray-400">
                {description.length}/{MAX_DESCRIPTION_LENGTH}
              </p>
            </div>

            <div className="sm:col-span-2">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-gray-500">
                  Upload Service Images {images.length}/{MAX_IMAGES}
                </p>
                <button
                  type="button"
                  disabled={images.length >= MAX_IMAGES}
                  onClick={() => setImages((current) => [...current, PLACEHOLDER_IMAGE])}
                  className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-gray-600 disabled:cursor-not-allowed disabled:opacity-50"
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

          <div className="mt-6 flex justify-end">
            <button
              type="button"
              disabled={!canSubmit}
              onClick={handleSubmit}
              className="rounded-md bg-green-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-50"
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
