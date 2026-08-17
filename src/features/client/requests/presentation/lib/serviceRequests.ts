export type ServiceRequestStatus =
  | 'Completed'
  | 'Draft'
  | 'Active'
  | 'Expired'
  | 'Reviewed'
  | 'Incomplete';

export interface ServiceRequest {
  id: string;
  title: string;
  requestDate: string;
  origin: string;
  destination: string;
  description: string;
  status: ServiceRequestStatus;
  images: string[];
}

const CARD_IMAGE = '/images/moving-service.png';

export const serviceRequests: ServiceRequest[] = [
  {
    id: 'sr-1',
    title: 'Residential Moving',
    requestDate: '24/07/2026',
    origin: 'Kamulu',
    destination: 'Lower Kabete',
    description: 'I need professional movers to be moved from Kamulu',
    status: 'Completed',
    images: [CARD_IMAGE],
  },
  {
    id: 'sr-2',
    title: 'Specialised item moving',
    requestDate: '25/08/2025',
    origin: 'Westlands',
    destination: 'Kamulu',
    description: 'I need professional movers to be moved from Kamulu',
    status: 'Draft',
    images: [CARD_IMAGE],
  },
  {
    id: 'sr-3',
    title: 'Residential Moving',
    requestDate: '24/07/2026',
    origin: 'Kamulu',
    destination: 'Lower Kabete',
    description: 'I need professional movers to be moved from Kamulu',
    status: 'Active',
    images: [CARD_IMAGE],
  },
  {
    id: 'sr-4',
    title: 'Residential Moving',
    requestDate: '24/07/2026',
    origin: 'Kamulu',
    destination: 'Lower Kabete',
    description: 'I need professional movers to be moved from Kamulu',
    status: 'Expired',
    images: [CARD_IMAGE],
  },
  {
    id: 'sr-5',
    title: 'Residential Moving',
    requestDate: '24/07/2026',
    origin: 'Kamulu',
    destination: 'Lower Kabete',
    description: 'I need professional movers to be moved from Kamulu',
    status: 'Reviewed',
    images: [CARD_IMAGE],
  },
  {
    id: 'sr-6',
    title: 'Residential Moving',
    requestDate: '24/07/2026',
    origin: 'Kamulu',
    destination: 'Lower Kabete',
    description: 'I need professional movers to be moved from Kamulu',
    status: 'Incomplete',
    images: [CARD_IMAGE],
  },
];

export const STATUS_STYLES: Record<ServiceRequestStatus, string> = {
  Completed: 'bg-blue-50 text-blue-600',
  Draft: 'bg-orange-50 text-orange-500',
  Active: 'bg-primary-subtle text-primary-strong',
  Expired: 'bg-pink-50 text-pink-600',
  Reviewed: 'bg-blue-50 text-blue-600',
  Incomplete: 'bg-primary-subtle text-primary-strong',
};

export const STATUS_ACTION_LABEL: Record<ServiceRequestStatus, string> = {
  Completed: 'Review Service',
  Draft: 'Finish Creation',
  Active: 'View Service Request',
  Expired: 'Retry',
  Reviewed: 'View Review',
  Incomplete: 'View Conversation',
};

export const STATUS_SECONDARY_ACTION_LABEL: Partial<Record<ServiceRequestStatus, string>> = {
  Incomplete: 'Mark as completed',
};
