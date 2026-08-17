export interface ProviderSearchResult {
  id: string;
  businessName?: string;
  description?: string;
  verificationStatus?: string;
  latitude?: number;
  longitude?: number;
  distanceKm?: number;
}

export interface ProviderPublicProfile {
  id: string;
  businessName?: string;
  description?: string;
  verificationStatus?: string;
  latitude?: number;
  longitude?: number;
  operatingHours?: Record<string, string>;
}

export interface ProviderSearchParams {
  query?: string;
  serviceType: string;
  latitude: number;
  longitude: number;
  radiusKm?: number;
}
