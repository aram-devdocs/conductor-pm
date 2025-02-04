import React, { createContext, useContext, useState } from "react";

export const ColorModeContext = createContext({
  mode: "light" as "light" | "dark",
  toggleColorMode: () => {},
});

export const ColorModeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mode, setMode] = useState<"light" | "dark">("light");

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
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
