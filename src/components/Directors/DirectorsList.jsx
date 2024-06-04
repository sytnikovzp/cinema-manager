import { useDispatch } from 'react-redux';
// =============================================
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import EditIcon from '@mui/icons-material/Edit';
import { styled } from '@mui/system';
// =============================================
import { Link } from 'react-router-dom';
// =============================================
import { selectDirector, deleteDirector } from '../../store/slices/directorsSlice';
import { itemListStyle } from '../../services/styleService';
import { Stack } from '@mui/material';

function DirectorsList({ directors, currentDirector }) {
  const dispatch = useDispatch();

  const onDirectorEdit = (event) => {
    event.stopPropagation();
    dispatch(selectDirector(currentDirector)); // !!!
  };

  const { id } = currentDirector;

  const onItemDelete = (event) => {
    event.stopPropagation();
    dispatch(deleteDirector(id));
  };

  const StyledAvatar = styled(Avatar)({
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    img: {
      objectPosition: 'center top',
    },
  });

  return (
    <>
      <Typography
        variant='h4'
        component='h2'
        sx={{ marginTop: -7, textAlign: 'left' }}
      >
        Directors list
      </Typography>

      <Box
        sx={{
          height: '60vh',
          overflowY: 'auto',
        }}
      >
        <Grid container spacing={1}>
          {directors.map((director) => (
            <>
              <Grid item xs={12}>
                <ListItem
                  key={director.id}
                  component={Link}
                  to={`/directors/${director.id}`}
                  disablePadding
                  sx={itemListStyle}
                  secondaryAction={
                    <Stack direction='row' spacing={1}>
                      <IconButton
                        edge='end'
                        aria-label='edit'
                        component={Link}
                        to={`/directors/${director.id}`}
                        onClick={onDirectorEdit}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        edge='end'
                        aria-label='delete'
                        onClick={onItemDelete}
                      >
                        <HighlightOffIcon />
                      </IconButton>
                    </Stack>
                  }
                >
                  <ListItemButton>
                    <ListItemAvatar>
                      <StyledAvatar src={director.image} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${director.fullName}, ${director.nationality}`}
                    />
                  </ListItemButton>
                </ListItem>
              </Grid>
            </>
          ))}
        </Grid>
      </Box>
    </>
  );
}

export default DirectorsList;
