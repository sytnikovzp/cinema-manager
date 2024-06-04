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
import { selectActor, deleteActor } from '../../store/slices/actorsSlice';
import { actorItemListStyle } from '../../services/styleService';
import { Stack } from '@mui/material';

function ActorsList({ actors, currentActor }) {
  const dispatch = useDispatch();

  const onActorEdit = (event) => {
    event.stopPropagation();
    dispatch(selectActor(currentActor)); // !!!
  };

  const { id } = currentActor;

  const onItemDelete = (event) => {
    event.stopPropagation();
    dispatch(deleteActor(id));
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
        Actors list
      </Typography>

      <Box
        sx={{
          height: '60vh',
          overflowY: 'auto',
        }}
      >
        <Grid container spacing={1}>
          {actors.map((actor) => (
            <>
              <Grid item xs={12}>
                <ListItem
                  key={actor.id}
                  component={Link}
                  to={`/actors/${actor.id}`}
                  disablePadding
                  sx={actorItemListStyle}
                  secondaryAction={
                    <Stack direction='row' spacing={1}>
                      <IconButton
                        edge='end'
                        aria-label='edit'
                        component={Link}
                        to={`/actors/${actor.id}`}
                        onClick={onActorEdit}
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
                      <StyledAvatar src={actor.image} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${actor.fullName}, ${actor.nationality}`}
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

export default ActorsList;
