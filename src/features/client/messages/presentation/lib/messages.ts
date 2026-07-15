export interface ChatMessage {
  id: string;
  sender: 'user' | 'provider';
  text: string;
  time: string;
}

export interface Conversation {
  id: string;
  providerName: string;
  providerAvatar: string;
  serviceTitle: string;
  serviceImage: string;
  date: string;
  preview: string;
  unread: boolean;
  canMarkCompleted: boolean;
  completed: boolean;
  messages: ChatMessage[];
}

const AVATAR = '/icons/avatars/bear.png';
const SERVICE_IMAGE = '/images/moving-service.png';

const QUOTE_MESSAGE =
  'Get A Free Moving Quote – Professional & Affordable Movers. Whether you\'re relocating your home, office, or business, we provide a seamless moving experience from start to finish.\n\nLet\'s make your move safe, smooth, and stress-free.\nGet your FREE quote today!';

export const conversations: Conversation[] = [
  {
    id: 'conv-1',
    providerName: 'Movvapp',
    providerAvatar: AVATAR,
    serviceTitle: 'Commercial and Office Moving',
    serviceImage: SERVICE_IMAGE,
    date: '16 Jun',
    preview: 'Get a free moving quote from our able and dedi..',
    unread: true,
    canMarkCompleted: false,
    completed: false,
    messages: [
      {
        id: 'm-1',
        sender: 'provider',
        text: QUOTE_MESSAGE,
        time: '9:02 AM',
      },
    ],
  },
  {
    id: 'conv-2',
    providerName: 'Movvapp',
    providerAvatar: AVATAR,
    serviceTitle: 'Commercial and Office Moving',
    serviceImage: SERVICE_IMAGE,
    date: '16 Jun',
    preview: 'Get a free moving quote from our able and dedi..',
    unread: false,
    canMarkCompleted: true,
    completed: false,
    messages: [
      {
        id: 'm-1',
        sender: 'provider',
        text: QUOTE_MESSAGE,
        time: '9:02 AM',
      },
      {
        id: 'm-2',
        sender: 'user',
        text: 'How much will your charge me for the service?',
        time: '9:10 AM',
      },
      {
        id: 'm-3',
        sender: 'provider',
        text: '25,000 from Mlolongo to Kamulu, with all the household equipments included.',
        time: '9:12 AM',
      },
      {
        id: 'm-4',
        sender: 'user',
        text: 'Yes that price is okay with me',
        time: '9:15 AM',
      },
    ],
  },
];
