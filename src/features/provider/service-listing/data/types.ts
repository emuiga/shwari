export interface ServiceCategory {
  id: string;
  code: string;
  name: string;
  description?: string;
  sortOrder?: number;
}

export interface CreateServiceRequest {
  categoryCode: string;
  description: string;
  pricingModel: 'FIXED';
  priceFrom: number;
  priceTo: number;
  serviceAreas: string[];
  active: boolean;
  mediaIds: string[];
}

export interface UpdateServiceRequest {
  categoryCode: string;
  description: string;
  pricingModel: 'FIXED';
  priceFrom: number;
  priceTo: number;
  active: boolean;
}
