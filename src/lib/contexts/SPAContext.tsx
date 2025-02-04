/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useState, useCallback } from "react";

interface ScreenHistoryEntry {
  id: string;
  props?: Record<string, any>;
  title?: string;
}

interface Screen {
  component: React.LazyExoticComponent<React.ComponentType<any>>;
  props?: Record<string, any>;
  title?: string;
}

interface SPAContextType {
  currentScreen: string;
  showLayout: boolean;
  screens: Record<string, Screen>;
  navigateTo: (
    screenId: string,
    props?: Record<string, any>,
    title?: string
  ) => void;
  registerScreen: (
    screenId: string,
    component: React.LazyExoticComponent<React.ComponentType<any>>,
    title?: string
  ) => void;
  setShowLayout: (show: boolean) => void;
  goBack: (steps?: number) => void;
  canGoBack: boolean;
  history: ScreenHistoryEntry[];
}

const SPAContext = createContext<SPAContextType | null>(null);

export const useSPA = () => {
  const context = useContext(SPAContext);
  if (!context) {
    throw new Error("useSPA must be used within a SPAProvider");
  }
  return context;
};

export const SPAProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentScreen, setCurrentScreen] = useState<string>("welcome");
  const [showLayout, setShowLayout] = useState(true);
  const [screens, setScreens] = useState<Record<string, Screen>>({});
  const [history, setHistory] = useState<ScreenHistoryEntry[]>([
    { id: "welcome" },
  ]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const registerScreen = useCallback(
    (
      screenId: string,
      component: React.LazyExoticComponent<React.ComponentType<any>>,
      title?: string
    ) => {
      setScreens((prev) => ({
        ...prev,
        [screenId]: { component, title },
      }));
    },
    []
  );

  const navigateTo = useCallback(
    (screenId: string, props?: Record<string, any>, title?: string) => {
      if (!screens[screenId]) {
        console.error(`Screen ${screenId} not found`);
        return;
      }

      setScreens((prev) => ({
        ...prev,
        [screenId]: { ...prev[screenId], props },
      }));

      // Check if we're navigating through breadcrumb
      const existingIndex = history.findIndex((entry) => entry.id === screenId);
      if (existingIndex !== -1 && existingIndex <= historyIndex) {
        // If clicking a breadcrumb, trim the history to that point
        setHistory((prev) => prev.slice(0, existingIndex + 1));
        setHistoryIndex(existingIndex);
      } else if (currentScreen !== screenId) {
        // Only add to history if it's a new screen
        // Add new entry only if it's different from the current screen
        const newEntry = {
          id: screenId,
          props,
          title: title || screens[screenId].title,
        };
        setHistory((prev) => {
          const newHistory = prev.slice(0, historyIndex + 1);
          return [...newHistory, newEntry];
        });
        setHistoryIndex((prev) => prev + 1);
      }

      setCurrentScreen(screenId);
    },
    [screens, historyIndex, history, currentScreen]
  );

  const goBack = useCallback(
    (steps = 1) => {
      const targetIndex = Math.max(0, historyIndex - steps);
      if (targetIndex !== historyIndex) {
        const targetEntry = history[targetIndex];
        setCurrentScreen(targetEntry.id);
        setScreens((prev) => ({
          ...prev,
          [targetEntry.id]: {
            ...prev[targetEntry.id],
            props: targetEntry.props,
          },
        }));
        setHistoryIndex(targetIndex);
        // Trim history to remove any forward entries
        setHistory((prev) => prev.slice(0, targetIndex + 1));
      }
    },
    [history, historyIndex]
  );

  const value = {
    currentScreen,
    showLayout,
    screens,
    navigateTo,
    registerScreen,
    setShowLayout,
    goBack,
    canGoBack: historyIndex > 0,
    history: history.slice(0, historyIndex + 1),
  };

  return <SPAContext.Provider value={value}>{children}</SPAContext.Provider>;
};
