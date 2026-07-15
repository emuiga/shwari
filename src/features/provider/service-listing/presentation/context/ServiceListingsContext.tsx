'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';
import {
  initialServiceListings,
  type ServiceListing,
} from '@/features/provider/service-listing/presentation/lib/mockServiceListings';

interface ServiceListingsContextValue {
  listings: ServiceListing[];
  getById: (id: string) => ServiceListing | undefined;
  addListing: (listing: Omit<ServiceListing, 'id'>) => void;
  updateListing: (id: string, listing: Omit<ServiceListing, 'id'>) => void;
  removeListing: (id: string) => void;
}

const ServiceListingsContext = createContext<ServiceListingsContextValue | null>(null);

export function ServiceListingsProvider({ children }: { children: ReactNode }) {
  const [listings, setListings] = useState<ServiceListing[]>(initialServiceListings);

  function getById(id: string) {
    return listings.find((listing) => listing.id === id);
  }

  function addListing(listing: Omit<ServiceListing, 'id'>) {
    setListings((current) => [{ ...listing, id: `listing-${Date.now()}` }, ...current]);
  }

  function updateListing(id: string, listing: Omit<ServiceListing, 'id'>) {
    setListings((current) => current.map((item) => (item.id === id ? { ...listing, id } : item)));
  }

  function removeListing(id: string) {
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
