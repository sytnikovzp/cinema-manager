import { useContext, useState } from 'react';

import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MenuIcon from '@mui/icons-material/Menu';

import { ThemeContext } from '../../contexts/ThemeContext';
import MobileDrawer from '../Navigation/MobileDrawer';

import Logo from './Logo';

import {
  stylesHeaderAppBar,
  stylesHeaderDivider,
  stylesHeaderToolbar,
  stylesHeaderToolbarBox,
  stylesHeaderUserBlockWrapper,
} from '../../styles';

function Header() {
  const theme = useTheme();
  const colorMode = useContext(ThemeContext);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const themeModeDescription =
    theme.palette.mode === 'dark'
      ? 'Switch to light mode'
      : 'Switch to dark mode';

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <>
      <AppBar position='sticky' sx={stylesHeaderAppBar}>
        <Container maxWidth='xl'>
          <Toolbar disableGutters sx={stylesHeaderToolbar}>
            <Box sx={stylesHeaderToolbarBox}>
              {isMobile && (
                <IconButton color='inherit' onClick={toggleDrawer(true)}>
                  <MenuIcon />
                </IconButton>
              )}
              <Logo isMobile={isMobile} />
            </Box>
            <Box sx={stylesHeaderUserBlockWrapper}>
              <Tooltip title={themeModeDescription}>
                <IconButton color='inherit' onClick={colorMode.toggleColorMode}>
                  {theme.palette.mode === 'dark' ? (
                    <Brightness7Icon />
                  ) : (
                    <Brightness4Icon />
                  )}
                </IconButton>
              </Tooltip>

              <Tooltip title='Open settings'>
                <IconButton>
                  <Avatar
                    alt='Oleksandr Sytnikov'
                    src='https://avatars.githubusercontent.com/u/154733849?v=4'
                  />
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </Container>
        <Divider sx={stylesHeaderDivider} />
      </AppBar>
      <MobileDrawer open={isDrawerOpen} onClose={toggleDrawer(false)} />
    </>
  );
}

export default Header;
