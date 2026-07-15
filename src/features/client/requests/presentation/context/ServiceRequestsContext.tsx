'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';
import {
  serviceRequests as initialServiceRequests,
  type ServiceRequest,
} from '@/features/client/requests/presentation/lib/serviceRequests';

interface ServiceRequestsContextValue {
  requests: ServiceRequest[];
  addRequest: (request: Omit<ServiceRequest, 'id' | 'status'>) => void;
}

const ServiceRequestsContext = createContext<ServiceRequestsContextValue | null>(null);

export function ServiceRequestsProvider({ children }: { children: ReactNode }) {
  const [requests, setRequests] = useState<ServiceRequest[]>(initialServiceRequests);

  function addRequest(request: Omit<ServiceRequest, 'id' | 'status'>) {
    setRequests((current) => [
      { ...request, id: `sr-${Date.now()}`, status: 'Active' },
      ...current,
    ]);
  }

  return (
    <ServiceRequestsContext.Provider value={{ requests, addRequest }}>
      {children}
    </ServiceRequestsContext.Provider>
  );
}

export function useServiceRequests() {
  const context = useContext(ServiceRequestsContext);
  if (!context) {
    throw new Error('useServiceRequests must be used within a ServiceRequestsProvider');
  }
  return context;
}
