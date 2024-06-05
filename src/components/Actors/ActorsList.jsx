import { useDispatch } from 'react-redux';
// =============================================
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
import { itemListStyle } from '../../services/styleService';
import { List, Stack } from '@mui/material';

const StyledAvatar = styled(Avatar)({
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  img: {
    objectPosition: 'center top',
  },
});

function ActorsList({ actors }) {
  const dispatch = useDispatch();

  // const onActorEdit = (event) => {
  //   event.stopPropagation();
  //   dispatch(selectActor(currentActor)); // !!!
  // };

  const onItemDelete = (event, id) => {
    event.stopPropagation();
    dispatch(deleteActor(id));
  };

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
        <List>
          {actors.map((actor) => (
            <Stack key={actor.id}>
              <ListItem
                component={Link}
                to={`/actors/${actor.id}`}
                disablePadding
                sx={itemListStyle}
                secondaryAction={
                  <Stack direction='row' spacing={1}>
                    {/* <IconButton
                      edge='end'
                      aria-label='edit'
                      component={Link}
                      to={`/actors/${actor.id}`}
                      // onClick={(event) => onActorEdit(event, actor.id)}
                    >
                      <EditIcon />
                    </IconButton> */}
                    <IconButton
                      edge='end'
                      aria-label='delete'
                      onClick={(event) => onItemDelete(event, actor.id)}
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
            </Stack>
          ))}
        </List>
      </Box>
    </>
  );
}

export default ActorsList;
