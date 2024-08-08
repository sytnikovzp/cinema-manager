import { Link } from 'react-router-dom';
// =============================================
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import HomeIcon from '@mui/icons-material/Home';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
// =============================================
import {
  MOVIES_ENTITY_NAME,
  ACTORS_ENTITY_NAME,
  DIRECTORS_ENTITY_NAME,
  STUDIOS_ENTITY_NAME,
  SERVICES_ENTITY_NAME,
} from '../../constants';
// =============================================
import { navItemTextStyle } from '../../services/styleService';

function NavBar({ onClose }) {
  const handleItemClick = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <Box sx={{ m: 2 }}>
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
                <ListItemText sx={navItemTextStyle} primary='Home' />
              </ListItemButton>
            </ListItem>
            <ListItem
              disablePadding
              component={Link}
              to={`/${MOVIES_ENTITY_NAME}`}
              onClick={handleItemClick}
            >
              <ListItemButton>
                <ListItemIcon>
                  <MovieFilterIcon />
                </ListItemIcon>
                <ListItemText sx={navItemTextStyle} primary='Movies' />
              </ListItemButton>
            </ListItem>
            <ListItem
              disablePadding
              component={Link}
              to={`/${ACTORS_ENTITY_NAME}`}
              onClick={handleItemClick}
            >
              <ListItemButton>
                <ListItemIcon>
                  <RecentActorsIcon />
                </ListItemIcon>
                <ListItemText sx={navItemTextStyle} primary='Actors' />
              </ListItemButton>
            </ListItem>
            <ListItem
              disablePadding
              component={Link}
              to={`/${DIRECTORS_ENTITY_NAME}`}
              onClick={handleItemClick}
            >
              <ListItemButton>
                <ListItemIcon>
                  <VideoCameraFrontIcon />
                </ListItemIcon>
                <ListItemText sx={navItemTextStyle} primary='Directors' />
              </ListItemButton>
            </ListItem>
            <ListItem
              disablePadding
              component={Link}
              to={`/${STUDIOS_ENTITY_NAME}`}
              onClick={handleItemClick}
            >
              <ListItemButton>
                <ListItemIcon>
                  <AssuredWorkloadIcon />
                </ListItemIcon>
                <ListItemText sx={navItemTextStyle} primary='Studios' />
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
              to={`/${SERVICES_ENTITY_NAME}`}
              onClick={handleItemClick}
            >
              <ListItemButton>
                <ListItemIcon>
                  <MiscellaneousServicesIcon />
                </ListItemIcon>
                <ListItemText sx={navItemTextStyle} primary='Service' />
              </ListItemButton>
            </ListItem>
          </List>
        </nav>
      </Paper>
    </Box>
  );
}

export default NavBar;
