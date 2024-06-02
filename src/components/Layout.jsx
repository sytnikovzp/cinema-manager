import { createContext, useState, useMemo } from 'react';
// =============================================
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// =============================================
import { Outlet } from 'react-router-dom';
// =============================================
import Header from './Header/Header';
import NavBar from './Navigation/NavBar';
import CinemaService from './Service/CinemaService';
import Footer from './Footer/Footer';

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

function Layout() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Grid
        container
        direction={'column'}
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          color: 'text.primary',
        }}
      >
        <Grid item lg={12} md={12} xl={12} sm={12} xs={12}>
          <Header></Header>
        </Grid>
        <Grid container sx={{ mt: '1rem', mb: '1rem', flex: 1 }}>
          <Grid item lg={2} md={2} xl={2} sm={2} xs={2}>
            <NavBar />
          </Grid>
          <Grid item lg={6} md={6} xl={6} sm={6} xs={6}>
            <Outlet />
          </Grid>
          <Grid item lg={4} md={4} xl={4} sm={4} xs={4}>
            <CinemaService />
          </Grid>
        </Grid>
        <Grid item lg={12} md={12} xl={12} sm={12} xs={12}>
          <Footer />
        </Grid>
      </Grid>
    </Box>
  );
}

export default function ToggleColorMode() {
  const [mode, setMode] = useState('light');
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
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Layout />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
