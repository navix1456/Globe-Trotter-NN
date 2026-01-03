export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  city?: string;
  country?: string;
  photoUrl?: string;
  bio?: string;
  createdAt: string;
}

export interface Country {
  id: string;
  name: string;
  code: string;
  region?: string;
  currencyCode?: string;
  currencySymbol?: string;
}

export interface City {
  id: string;
  name: string;
  countryId: string;
  countryName?: string;
  latitude?: number;
  longitude?: number;
  timezone?: string;
  description?: string;
  imageUrl?: string;
  coverImageUrl?: string;
  costIndex?: number;
  accommodationAvgCost?: number;
  foodAvgCost?: number;
  transportAvgCost?: number;
  popularityScore?: number;
  bestTimeToVisit?: string;
}

export interface Activity {
  id: string;
  name: string;
  cityId: string;
  cityName?: string;
  categoryId?: string;
  categoryName?: string;
  categoryIcon?: string;
  description?: string;
  imageUrl?: string;
  cost: number;
  currencyCode: string;
  isFree: boolean;
  durationMinutes?: number;
  address?: string;
  rating?: number;
  reviewCount?: number;
  tags?: string[];
}

export interface ActivityCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  iconName?: string;
  colorHex?: string;
}

export interface Trip {
  id: string;
  userId: string;
  name: string;
  description?: string;
  coverImageUrl?: string;
  startDate: string;
  endDate: string;
  totalBudget?: number;
  currencyCode: string;
  actualCost?: number;
  totalDays?: number;
  totalStops?: number;
  totalActivities?: number;
  isPublic: boolean;
  shareToken?: string;
  status: 'planning' | 'upcoming' | 'ongoing' | 'completed';
  createdAt: string;
}

export interface TripStop {
  id: string;
  tripId: string;
  cityId: string;
  cityName?: string;
  cityImage?: string;
  countryName?: string;
  arrivalDate: string;
  departureDate: string;
  stopOrder: number;
  accommodationName?: string;
  accommodationAddress?: string;
  accommodationCost?: number;
  transportType?: string;
  transportCost?: number;
  transportDetails?: string;
  notes?: string;
  numNights?: number;
  activities?: TripActivity[];
}

export interface TripActivity {
  id: string;
  tripStopId: string;
  activityId: string;
  activityName?: string;
  activityImage?: string;
  activityCost?: number;
  scheduledDate: string;
  scheduledTime?: string;
  activityOrder: number;
  actualCost?: number;
  notes?: string;
  status: 'planned' | 'completed' | 'skipped';
}

export interface TripFormData {
  name: string;
  description?: string;
  startDate: string;
  endDate: string;
  totalBudget?: number;
  currencyCode: string;
}

export interface TripStopFormData {
  cityId: string;
  arrivalDate: string;
  departureDate: string;
  accommodationName?: string;
  accommodationCost?: number;
  transportType?: string;
  transportCost?: number;
  notes?: string;
}
