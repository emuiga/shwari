export interface ChatMessage {
  id: string;
  sender: 'provider' | 'customer';
  text: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  customerName: string;
  avatarSrc: string;
  service: string;
  fromLocation: string;
  toLocation: string;
  lastMessageAt: string;
  lastMessagePreview: string;
  unread: boolean;
  messages: ChatMessage[];
}

const AVATARS = ['/icons/avatars/bear.png', '/icons/avatars/cat.png', '/icons/avatars/meerkat.png', '/icons/avatars/panda.png'];

export const mockConversations: Conversation[] = [
  {
    id: 'conv-1',
    customerName: 'Sally Kimani',
    avatarSrc: AVATARS[0],
    service: 'Residential moving',
    fromLocation: 'Kamulu',
    toLocation: 'Lower Kabete',
    lastMessageAt: '16 Jun',
    lastMessagePreview: 'Get a free moving quote from our able and dedic..',
    unread: true,
    messages: [
      {
        id: 'msg-1',
        sender: 'provider',
        text: 'Hi Sally, thanks for reaching out to Shwari Movers! We handle residential moves across Nairobi and beyond, from Kamulu to Lower Kabete and everywhere in between.\n\nLet\'s make your move safe, smooth, and stress-free.\nGet your FREE quote today!',
        timestamp: '16 Jun, 9:02 AM',
      },
      {
        id: 'msg-2',
        sender: 'customer',
        text: 'How much will you charge me for the service?',
        timestamp: '16 Jun, 9:14 AM',
      },
    ],
  },
  {
    id: 'conv-2',
    customerName: 'Njoroge Mwangi',
    avatarSrc: AVATARS[1],
    service: 'Commercial and office moving',
    fromLocation: 'Westlands',
    toLocation: 'Upper Hill',
    lastMessageAt: '16 Jun',
    lastMessagePreview: 'Karibu! We handle office relocations across Nair..',
    unread: false,
    messages: [
      {
        id: 'msg-1',
        sender: 'provider',
        text: 'Karibu! We handle office relocations across Nairobi, from small startups to full corporate moves. We\'d be happy to send a team to survey your office in Westlands before quoting.',
        timestamp: '16 Jun, 8:20 AM',
      },
    ],
  },
];
