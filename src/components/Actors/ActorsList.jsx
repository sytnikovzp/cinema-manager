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
import { styled } from '@mui/system';
// =============================================
import { Link } from 'react-router-dom';
// =============================================
import { selectActor, deleteActor } from '../../store/slices/actorsSlice';
import { actorItemStyle } from '../../services/styleService';

function ActorsList({ actors, currentActor }) {
  const dispatch = useDispatch();

  const onActorEdit = () => {
    dispatch(selectActor(currentActor));
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
                  onClick={onActorEdit}
                  style={actorItemStyle}
                  secondaryAction={
                    <IconButton
                      edge='end'
                      aria-label='delete'
                      onClick={onItemDelete}
                    >
                      <HighlightOffIcon />
                    </IconButton>
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
