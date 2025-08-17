import { useEffect, useMemo, useState } from 'react';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import { ThemeContext } from '@/src/contexts/ThemeContext';

export function ColorThemeProvider({ children }) {
  const getInitialMode = () =>
    localStorage.getItem('cinemaThemeMode') || 'dark';

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
