'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';
import {
  createService,
  deleteService,
  updateService,
} from '@/features/provider/service-listing/data/serviceListingApi';
import type { CreateServiceRequest, UpdateServiceRequest } from '@/features/provider/service-listing/data/types';
import type { ProviderService } from '@/features/provider/shared/data/types';

interface ServiceListingsContextValue {
  listings: ProviderService[];
  getById: (id: string) => ProviderService | undefined;
  addListing: (payload: CreateServiceRequest) => Promise<void>;
  updateListing: (id: string, payload: UpdateServiceRequest) => Promise<void>;
  removeListing: (id: string) => Promise<void>;
}

const ServiceListingsContext = createContext<ServiceListingsContextValue | null>(null);

export function ServiceListingsProvider({
  initialListings,
  children,
}: {
  initialListings: ProviderService[];
  children: ReactNode;
}) {
  const [listings, setListings] = useState<ProviderService[]>(initialListings);

  function getById(id: string) {
    return listings.find((listing) => listing.id === id);
  }

  async function addListing(payload: CreateServiceRequest) {
    const created = await createService(payload);
    setListings((current) => [created, ...current]);
  }

  async function updateListing(id: string, payload: UpdateServiceRequest) {
    const updated = await updateService(id, payload);
    setListings((current) => current.map((item) => (item.id === id ? updated : item)));
  }

  async function removeListing(id: string) {
    await deleteService(id);
    setListings((current) => current.filter((item) => item.id !== id));
  }

  return (
    <ServiceListingsContext.Provider value={{ listings, getById, addListing, updateListing, removeListing }}>
      {children}
    </ServiceListingsContext.Provider>
  );
}

export function useServiceListings() {
  const context = useContext(ServiceListingsContext);
  if (!context) {
    throw new Error('useServiceListings must be used within a ServiceListingsProvider');
  }
  return context;
}
