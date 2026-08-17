export interface ProviderProfile {
  businessName?: string;
  description?: string;
  verificationStatus?: string;
  searchVisible?: boolean;
  latitude?: number;
  longitude?: number;
  operatingHours?: Record<string, string>;
}

export interface ProviderService {
  id: string;
  categoryCode?: string;
  categoryName?: string;
  description?: string;
  pricingModel?: string;
  priceFrom?: number;
  priceTo?: number;
  serviceAreas?: string[];
  active?: boolean;
  images?: string[];
}

export interface ProviderAvailability {
  id: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  specificDate: string | null;
  available: boolean;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description?: string;
  mediaId?: string | null;
  imageUrl?: string | null;
  sortOrder?: number;
}

export interface ProviderAnalytics {
  profileViews?: number;
  searchImpressions?: number;
  inquiriesReceived?: number;
  periodSummary?: { note?: string };
}

export interface ProviderReview {
  id: string;
  customerName?: string;
  rating: number;
  comment?: string;
  createdAt?: string;
  serviceName?: string;
}
