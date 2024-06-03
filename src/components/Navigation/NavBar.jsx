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

function NavBar() {
  return (
    <Box
      sx={{
        m: 2,
      }}
    >
      <Paper elevation={3}>
        <nav aria-label='main menu items'>
          <List>
            <ListItem disablePadding component={Link} to=''>
              <ListItemButton>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary='Home'></ListItemText>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding component={Link} to='/movies'>
              <ListItemButton>
                <ListItemIcon>
                  <MovieFilterIcon />
                </ListItemIcon>
                <ListItemText primary='Movies'></ListItemText>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding component={Link} to='/actors'>
              <ListItemButton>
                <ListItemIcon>
                  <RecentActorsIcon />
                </ListItemIcon>
                <ListItemText primary='Actors'></ListItemText>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding component={Link} to='/directors'>
              <ListItemButton>
                <ListItemIcon>
                  <VideoCameraFrontIcon />
                </ListItemIcon>
                <ListItemText primary='Directors'></ListItemText>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding component={Link} to='/studios'>
              <ListItemButton>
                <ListItemIcon>
                  <AssuredWorkloadIcon />
                </ListItemIcon>
                <ListItemText primary='Studios'></ListItemText>
              </ListItemButton>
            </ListItem>
          </List>
        </nav>
        <Divider />
        <nav aria-label='service menu items'>
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <MiscellaneousServicesIcon />
                </ListItemIcon>
                <ListItemText primary='Service' />
              </ListItemButton>
            </ListItem>
          </List>
        </nav>
      </Paper>
    </Box>
  );
}

export default NavBar;
