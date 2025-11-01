'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface TemplateContextType {
  currentTemplate: string;
  setTemplate: (template: string) => void;
  loading: boolean;
}

const TemplateContext = createContext<TemplateContextType>({
  currentTemplate: 'classic',
  setTemplate: () => {},
  loading: true,
});

export const useTemplate = () => useContext(TemplateContext);

export function TemplateProvider({ children }: { children: ReactNode }) {
  const [currentTemplate, setCurrentTemplate] = useState('classic');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTemplate();
  }, []);

  const loadTemplate = async () => {
    try {
      // First try localStorage
      const localTemplate = localStorage.getItem('website-template');
      if (localTemplate) {
        console.log('Loaded template from localStorage:', localTemplate);
        setCurrentTemplate(localTemplate);
        setLoading(false);
        return;
      }

      // Then try Firestore
      if (!db) {
        console.warn('Firebase DB not initialized, using default template');
        setLoading(false);
        return;
      }

      const templateDoc = await getDoc(doc(db, 'settings', 'template'));
      if (templateDoc.exists()) {
        const templateData = templateDoc.data().current || 'classic';
        console.log('Loaded template from Firestore:', templateData);
        setCurrentTemplate(templateData);
        localStorage.setItem('website-template', templateData);
      } else {
        console.log('No template found in Firestore, using default: classic');
      }
    } catch (error) {
      console.error('Error loading template from Firestore:', error);
      console.log('Using localStorage or default template');
      // Fallback to localStorage or default
      const localTemplate = localStorage.getItem('website-template') || 'classic';
      setCurrentTemplate(localTemplate);
    } finally {
      setLoading(false);
    }
  };

  const setTemplate = async (template: string) => {
    console.log('Setting template to:', template);
    setCurrentTemplate(template);

    // Always save to localStorage first
    localStorage.setItem('website-template', template);
    console.log('Template saved to localStorage:', template);

    // Try to save to Firestore as well
    try {
      if (!db) {
        console.warn('Firebase DB not initialized, only saved to localStorage');
        return;
      }

      await setDoc(doc(db, 'settings', 'template'), { current: template });
      console.log('Template saved to Firestore successfully:', template);
    } catch (error) {
      console.warn('Could not save to Firestore, but saved to localStorage:', error);
      // Don't throw error, localStorage is sufficient
    }
  };

  return (
    <TemplateContext.Provider value={{ currentTemplate, setTemplate, loading }}>
      {children}
    </TemplateContext.Provider>
  );
}
