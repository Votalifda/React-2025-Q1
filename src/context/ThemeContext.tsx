import { createContext, useContext } from 'react';
import { Theme } from '../types.ts';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: (value: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
