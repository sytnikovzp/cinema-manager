import { useCallback, useState } from 'react';
import { Outlet } from 'react-router-dom';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import {
  styleLayoutBox,
  styleLayoutCinemaServiceSize,
  styleLayoutDesktopNavbar,
  styleLayoutGridContainer,
  styleLayoutMainGridContainer,
  styleLayoutMobileNavbar,
  styleLayoutNavbarSize,
  styleLayoutOutletSize,
} from '@/src/services/styleService';

import Footer from '@/src/components/Footer/Footer';
import Header from '@/src/components/Header/Header';
import NavBar from '@/src/components/Navigation/NavBar';
import CinemaService from '@/src/components/Service/CinemaService';

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
