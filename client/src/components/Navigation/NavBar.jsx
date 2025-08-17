import { useCallback } from 'react';
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';

import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import HomeIcon from '@mui/icons-material/Home';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';

import { navBarBox, navItemTextStyle } from '@/src/services/styleService';

function NavBar({ onClose }) {
  const handleItemClick = useCallback(() => {
    if (onClose) {
      onClose();
    }
  }, [onClose]);

  return (
    <Box sx={navBarBox}>
      <Paper elevation={3}>
        <nav aria-label='main menu items'>
          <List>
            <ListItem
              disablePadding
              component={Link}
              to='/'
              onClick={handleItemClick}
            >
              <ListItemButton>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary='Home' sx={navItemTextStyle} />
              </ListItemButton>
            </ListItem>
            <ListItem
              disablePadding
              component={Link}
              to={`/movies`}
              onClick={handleItemClick}
            >
              <ListItemButton>
                <ListItemIcon>
                  <MovieFilterIcon />
                </ListItemIcon>
                <ListItemText primary='Movies' sx={navItemTextStyle} />
              </ListItemButton>
            </ListItem>
            <ListItem
              disablePadding
              component={Link}
              to={`/actors`}
              onClick={handleItemClick}
            >
              <ListItemButton>
                <ListItemIcon>
                  <RecentActorsIcon />
                </ListItemIcon>
                <ListItemText primary='Actors' sx={navItemTextStyle} />
              </ListItemButton>
            </ListItem>
            <ListItem
              disablePadding
              component={Link}
              to={`/directors`}
              onClick={handleItemClick}
            >
              <ListItemButton>
                <ListItemIcon>
                  <VideoCameraFrontIcon />
                </ListItemIcon>
                <ListItemText primary='Directors' sx={navItemTextStyle} />
              </ListItemButton>
            </ListItem>
            <ListItem
              disablePadding
              component={Link}
              to={`/studios`}
              onClick={handleItemClick}
            >
              <ListItemButton>
                <ListItemIcon>
                  <AssuredWorkloadIcon />
                </ListItemIcon>
                <ListItemText primary='Studios' sx={navItemTextStyle} />
              </ListItemButton>
            </ListItem>
          </List>
        </nav>
        <Divider />
        <nav aria-label='service menu items'>
          <List>
            <ListItem
              disablePadding
              component={Link}
              to={`/services`}
              onClick={handleItemClick}
            >
              <ListItemButton>
                <ListItemIcon>
                  <MiscellaneousServicesIcon />
                </ListItemIcon>
                <ListItemText primary='Service' sx={navItemTextStyle} />
              </ListItemButton>
            </ListItem>
          </List>
        </nav>
      </Paper>
    </Box>
  );
}

export default NavBar;
