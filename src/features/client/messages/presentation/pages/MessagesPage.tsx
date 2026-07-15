'use client';

import { useState } from 'react';
import ChatThreadPanel from '@/features/client/messages/presentation/components/ChatThreadPanel';
import ConversationListPanel from '@/features/client/messages/presentation/components/ConversationListPanel';
import DashboardHeader from '@/features/client/shared/presentation/components/DashboardHeader';
import { useMessages } from '@/features/client/messages/presentation/context/MessagesContext';

export default function MessagesPage() {
  const { conversations, sendMessage, markCompleted, markRead } = useMessages();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedConversation = conversations.find((conversation) => conversation.id === selectedId) ?? null;

  function handleSelect(id: string) {
    setSelectedId(id);
    markRead(id);
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-white">
      <DashboardHeader />

      <div className="flex flex-1 overflow-hidden">
        <ConversationListPanel
          conversations={conversations}
          selectedId={selectedId}
          onSelect={handleSelect}
          className={selectedId ? 'hidden lg:flex' : 'flex'}
        />
        <ChatThreadPanel
          conversation={selectedConversation}
          onSendMessage={sendMessage}
          onMarkCompleted={markCompleted}
          onBack={() => setSelectedId(null)}
          className={selectedId ? 'flex' : 'hidden lg:flex'}
        />
      </div>
    </div>
  );
}
