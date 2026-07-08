export interface AccountProfile {
  name: string;
  email: string;
  phone: string;
  avatar: string;
}

export interface NotificationPreferences {
  emailUpdates: boolean;
  smsAlerts: boolean;
  promotions: boolean;
}

export const defaultProfile: AccountProfile = {
  name: 'Naomi Wanjiru',
  email: 'naomi.wanjiru@example.com',
  phone: '+254 712 345 678',
  avatar: '/icons/avatars/cat.png',
};

export const defaultNotificationPreferences: NotificationPreferences = {
  emailUpdates: true,
  smsAlerts: true,
  promotions: false,
};
