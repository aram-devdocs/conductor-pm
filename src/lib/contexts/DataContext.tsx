import React, { createContext, useContext, useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { DataContextValue, DataContextEntry } from '../api/data/context-types';
import type { User, SprintTask } from '../api/data/types';
import { useToast } from './ToastContext';

const DATA_CONTEXT_KEY = 'conductor_data_context';

const DataContext = createContext<DataContextValue | undefined>(undefined);

export const DataContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { showSuccessToast, showErrorToast } = useToast();
  const [entries, setEntries] = useState<DataContextEntry[]>(() => {
    const saved = localStorage.getItem(DATA_CONTEXT_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (error) {
        console.error('Error parsing saved data context:', error);
        return [];
      }
    }
    return [];
  });

  // Update local storage whenever entries change
  React.useEffect(() => {
    localStorage.setItem(DATA_CONTEXT_KEY, JSON.stringify(entries));
  }, [entries]);

  const addToContext = useCallback((
    data: User[] | SprintTask[],
    type: 'users' | 'sprint',
    label?: string
  ) => {
    const entry: DataContextEntry = {
      id: uuidv4(),
      type,
      label: label || `${type} - ${new Date().toLocaleTimeString()}`,
      timestamp: Date.now(),
      data,
    };

    setEntries(prev => [entry, ...prev]);
    showSuccessToast('Data added to context');
  }, [showSuccessToast]);

  const removeFromContext = useCallback((id: string) => {
    setEntries(prev => prev.filter(entry => entry.id !== id));
    showSuccessToast('Data removed from context');
  }, [showSuccessToast]);

  const copyToClipboard = useCallback(async (id: string) => {
    const entry = entries.find(e => e.id === id);
    if (!entry) {
      showErrorToast('Context entry not found');
      return;
    }

    try {
      const minifiedData = JSON.stringify(entry.data);
      await navigator.clipboard.writeText(minifiedData);
      showSuccessToast('Data copied to clipboard');
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      showErrorToast('Failed to copy data to clipboard');
    }
  }, [entries, showSuccessToast, showErrorToast]);

  return (
    <DataContext.Provider
      value={{
        entries,
        addToContext,
        removeFromContext,
        copyToClipboard,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useDataContext must be used within a DataContextProvider');
  }
  return context;
}; 