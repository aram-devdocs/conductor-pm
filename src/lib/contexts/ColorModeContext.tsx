import React, { createContext, useContext, useState, useEffect } from "react";

const COLOR_MODE_KEY = 'conductor_color_mode';

export const ColorModeContext = createContext({
  mode: "light" as "light" | "dark",
  /* eslint-disable @typescript-eslint/no-empty-function */
  toggleColorMode: () => {},
});

export const ColorModeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Try to get initial mode from local storage, default to light
  const [mode, setMode] = useState<"light" | "dark">(() => {
    const savedMode = localStorage.getItem(COLOR_MODE_KEY);
    return savedMode === "dark" ? "dark" : "light";
  });

  // Update local storage whenever mode changes
  useEffect(() => {
    localStorage.setItem(COLOR_MODE_KEY, mode);
  }, [mode]);

  const toggleColorMode = () => {
    setMode((prevMode) => {
      const newMode = prevMode === "light" ? "dark" : "light";
      localStorage.setItem(COLOR_MODE_KEY, newMode);
      return newMode;
    });
  };

  return (
    <ColorModeContext.Provider value={{ mode, toggleColorMode }}>
      {children}
    </ColorModeContext.Provider>
  );
};

export const useColorMode = () => {
  const { mode, toggleColorMode } = useContext(ColorModeContext);
  return { mode, toggleColorMode };
};
