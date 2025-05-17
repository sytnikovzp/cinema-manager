import { useCallback, useState } from 'react';
import { Outlet } from 'react-router-dom';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import {
  styleLayoutBox,
  styleLayoutDesktopNavbar,
  styleLayoutGridContainer,
  styleLayoutMainGridContainer,
  styleLayoutMobileNavbar,
} from '../../services/styleService';

import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import NavBar from '../Navigation/NavBar';
import CinemaService from '../Service/CinemaService';

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
      <Grid container direction={'column'} sx={styleLayoutMainGridContainer}>
        <Grid item xs={12}>
          <Header onToggleNavBar={handleToggleNavBar} />
        </Grid>
        <Grid container sx={styleLayoutGridContainer}>
          <Container maxWidth='xl'>
            <Grid container>
              <Grid
                item
                lg={2}
                md={2}
                sm={12}
                sx={styleLayoutDesktopNavbar}
                xs={12}
              >
                <NavBar />
              </Grid>
              <Grid
                item
                lg={2}
                md={2}
                sm={12}
                sx={styleLayoutMobileNavbar}
                xs={12}
              >
                {isNavBarOpen && <NavBar onClose={handleCloseNavBar} />}
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Outlet />
              </Grid>
              <Grid item lg={4} md={4} sm={12} xs={12}>
                <CinemaService />
              </Grid>
            </Grid>
          </Container>
        </Grid>
        <Grid item xs={12}>
          <Footer />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Layout;
