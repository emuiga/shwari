export interface BusinessDetails {
  businessName: string;
  phone: string;
  days: string[];
  openingHours: string;
  closingHours: string;
  locations: string[];
}

export interface ServicesOffered {
  categoryIds: string[];
  description: string;
}

export const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const TIME_OPTIONS = Array.from({ length: 29 }, (_, index) => {
  const totalMinutes = 6 * 60 + index * 30;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHour = hours % 12 === 0 ? 12 : hours % 12;
  return `${displayHour}:${minutes.toString().padStart(2, '0')} ${period}`;
});

export const MAX_COMPANY_DESCRIPTION_LENGTH = 500;
