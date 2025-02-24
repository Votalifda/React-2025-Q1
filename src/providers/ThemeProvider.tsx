import React, { useState } from 'react';
import { Theme } from '../types.ts';
import { ThemeContext } from '../context/ThemeContext.tsx';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>('light');

  const toggleTheme = (value: Theme) => {
    setTheme(value);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
