'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

interface SidebarContextValue {
  isOpen: boolean;
  toggle: () => void;
}

const SidebarContext = createContext<SidebarContextValue>({
  isOpen: true,
  toggle: () => {},
});

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  }, []);

  return (
    <SidebarContext.Provider value={{ isOpen, toggle: () => setIsOpen((prev) => !prev) }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  return useContext(SidebarContext);
}
