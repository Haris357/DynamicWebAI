'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { db } from '@/lib/firebase';
import { doc, getDoc, collection, getDocs, query, orderBy } from 'firebase/firestore';

interface ChatHistory {
  id: string;
  prompt: string;
  createdAt: any;
}

interface WebsiteDataContextType {
  currentWebsiteData: any;
  chatHistory: ChatHistory[];
  activeChatId: string | null;
  loadWebsiteData: (chatId: string) => Promise<void>;
  loadChatHistory: () => Promise<void>;
  setActiveChatId: (chatId: string | null) => void;
  clearWebsiteData: () => void;
}

const WebsiteDataContext = createContext<WebsiteDataContextType | undefined>(undefined);

export function WebsiteDataProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [currentWebsiteData, setCurrentWebsiteData] = useState<any>(null);
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);

  const loadWebsiteData = async (chatId: string) => {
    if (!user) return;

    try {
      const websiteRef = doc(db, 'userWebsites', user.uid, 'chats', chatId);
      const websiteSnap = await getDoc(websiteRef);

      if (websiteSnap.exists()) {
        const data = websiteSnap.data();
        setCurrentWebsiteData(data.data);
        setActiveChatId(chatId);

        // Store in localStorage for persistence
        localStorage.setItem('activeWebsiteData', JSON.stringify(data.data));
        localStorage.setItem('activeChatId', chatId);
      }
    } catch (error) {
      console.error('Error loading website data:', error);
    }
  };

  const loadChatHistory = async () => {
    if (!user) return;

    try {
      const chatsRef = collection(db, 'userChats', user.uid, 'messages');
      const q = query(chatsRef, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);

      const chats: ChatHistory[] = [];
      querySnapshot.forEach((doc) => {
        chats.push({
          id: doc.id,
          prompt: doc.data().prompt,
          createdAt: doc.data().createdAt,
        });
      });

      setChatHistory(chats);
    } catch (error) {
      console.error('Error loading chat history:', error);
    }
  };

  const clearWebsiteData = () => {
    setCurrentWebsiteData(null);
    setActiveChatId(null);
    localStorage.removeItem('activeWebsiteData');
    localStorage.removeItem('activeChatId');
  };

  // Load from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('activeWebsiteData');
    const savedChatId = localStorage.getItem('activeChatId');

    if (savedData && savedChatId) {
      setCurrentWebsiteData(JSON.parse(savedData));
      setActiveChatId(savedChatId);
    }
  }, []);

  // Load chat history when user changes
  useEffect(() => {
    if (user) {
      loadChatHistory();
    } else {
      setChatHistory([]);
      clearWebsiteData();
    }
  }, [user]);

  return (
    <WebsiteDataContext.Provider
      value={{
        currentWebsiteData,
        chatHistory,
        activeChatId,
        loadWebsiteData,
        loadChatHistory,
        setActiveChatId,
        clearWebsiteData,
      }}
    >
      {children}
    </WebsiteDataContext.Provider>
  );
}

export function useWebsiteData() {
  const context = useContext(WebsiteDataContext);
  if (context === undefined) {
    throw new Error('useWebsiteData must be used within a WebsiteDataProvider');
  }
  return context;
}
