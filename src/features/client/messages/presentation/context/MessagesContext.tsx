'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';
import { conversations as initialConversations, type Conversation } from '@/features/client/messages/presentation/lib/messages';

interface MessagesContextValue {
  conversations: Conversation[];
  sendMessage: (conversationId: string, text: string) => void;
  markCompleted: (conversationId: string) => void;
  markRead: (conversationId: string) => void;
}

const MessagesContext = createContext<MessagesContextValue | null>(null);

function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}

export function MessagesProvider({ children }: { children: ReactNode }) {
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations);

  function sendMessage(conversationId: string, text: string) {
    const trimmed = text.trim();
    if (!trimmed) {
      return;
    }
    setConversations((current) =>
      current.map((conversation) =>
        conversation.id === conversationId
          ? {
              ...conversation,
              preview: trimmed,
              messages: [
                ...conversation.messages,
                { id: `m-${Date.now()}`, sender: 'user', text: trimmed, time: formatTime(new Date()) },
              ],
            }
          : conversation,
      ),
    );
  }

  function markCompleted(conversationId: string) {
    setConversations((current) =>
      current.map((conversation) =>
        conversation.id === conversationId ? { ...conversation, completed: true } : conversation,
      ),
    );
  }

  function markRead(conversationId: string) {
    setConversations((current) =>
      current.map((conversation) =>
        conversation.id === conversationId ? { ...conversation, unread: false } : conversation,
      ),
    );
  }

  return (
    <MessagesContext.Provider value={{ conversations, sendMessage, markCompleted, markRead }}>
      {children}
    </MessagesContext.Provider>
  );
}

export function useMessages() {
  const context = useContext(MessagesContext);
  if (!context) {
    throw new Error('useMessages must be used within a MessagesProvider');
  }
  return context;
}
