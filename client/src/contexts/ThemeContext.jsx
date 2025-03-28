import { createContext, useState, useMemo, useEffect } from 'react';
// =============================================
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import createTheme from '@mui/material/styles/createTheme';

export const ThemeContext = createContext({
  toggleColorMode: () => {},
});

export function ColorThemeProvider({ children }) {
  const getInitialMode = () => {
    const savedMode = localStorage.getItem('cinemaThemeMode');
    return savedMode ? savedMode : 'dark';
  };

  const [mode, setMode] = useState(getInitialMode);

  useEffect(() => {
    localStorage.setItem('cinemaThemeMode', mode);
  }, [mode]);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
}
