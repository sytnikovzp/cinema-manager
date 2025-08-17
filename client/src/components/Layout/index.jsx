import { useCallback, useState } from 'react';
import { Outlet } from 'react-router-dom';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import Footer from '@/src/components/Footer';
import Header from '@/src/components/Header';
import NavBar from '@/src/components/Navigation/NavBar';
import CinemaService from '@/src/components/Service/CinemaService';

import {
  styleLayoutBox,
  styleLayoutCinemaServiceSize,
  styleLayoutDesktopNavbar,
  styleLayoutGridContainer,
  styleLayoutMainGridContainer,
  styleLayoutMobileNavbar,
  styleLayoutNavbarSize,
  styleLayoutOutletSize,
} from '@/src/styles';

function Layout() {
  const [isNavBarOpen, setIsNavBarOpen] = useState(false);

  const handleToggleNavBar = useCallback(() => {
    setIsNavBarOpen((prev) => !prev);
  }, []);

  const handleCloseNavBar = useCallback(() => {
    setIsNavBarOpen(false);
  }, []);

  return (
    <Box sx={styleLayoutBox}>
      <Grid container direction='column' sx={styleLayoutMainGridContainer}>
        <Grid>
          <Header onToggleNavBar={handleToggleNavBar} />
        </Grid>
        <Grid container sx={styleLayoutGridContainer}>
          <Container maxWidth='xl'>
            <Grid container spacing={2}>
              <Grid size={styleLayoutNavbarSize} sx={styleLayoutDesktopNavbar}>
                <NavBar />
              </Grid>
              <Grid size={styleLayoutNavbarSize} sx={styleLayoutMobileNavbar}>
                {isNavBarOpen && <NavBar onClose={handleCloseNavBar} />}
              </Grid>
              <Grid size={styleLayoutOutletSize}>
                <Outlet />
              </Grid>
              <Grid size={styleLayoutCinemaServiceSize}>
                <CinemaService />
              </Grid>
            </Grid>
          </Container>
        </Grid>
        <Grid>
          <Footer />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Layout;
