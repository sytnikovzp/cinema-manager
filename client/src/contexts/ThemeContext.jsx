import { createContext, useContext } from 'react';

export const ThemeContext = createContext(null);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ColorThemeProvider');
  }
  return context;
};
