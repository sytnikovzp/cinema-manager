import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// =============================================
import { Link } from 'react-router-dom';
// =============================================
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
// import ListItemButton from '@mui/material/ListItemButton';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import EditIcon from '@mui/icons-material/Edit';
import { styled } from '@mui/system';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
// =============================================
import { itemListStyle } from '../../services/styleService';
import { buttonMainStyle } from '../../services/styleService';
// =============================================
import {
  getAllActors,
  createActor,
  deleteActor,
  updateActor,
} from '../../store/slices/actorsSlice';
import { ListItemSecondaryAction } from '@mui/material';

const StyledAvatar = styled(Avatar)({
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  img: {
    objectPosition: 'center top',
  },
});

function ActorsList() {
  const dispatch = useDispatch();

  const actors = useSelector((state) => state.actorsList.actors);
  const status = useSelector((state) => state.actorsList.status);

  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState();

  useEffect(() => {
    dispatch(getAllActors());
  }, [dispatch]);

  useEffect(() => {
    if (status && status !== null) {
      setOpen(true);
      if (status.toLowerCase().includes('success')) {
        setSeverity('success');
      } else {
        return setSeverity('error');
      }
    }
  }, [status]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const onCreateActor = () => {
    dispatch(createActor());
  };

  const onItemEdit = (event, actor) => {
    event.stopPropagation();
    dispatch(updateActor(actor));
  };

  const onItemDelete = (event, id) => {
    event.stopPropagation();
    dispatch(deleteActor(id));
  };

  return (
    <>
      <Stack direction='row' justifyContent='space-between'>
        <Typography variant='h4' component='h2'>
          Actors list
        </Typography>

        <Button
          component={Link}
          to='new'
          type='button'
          variant='contained'
          color='success'
          sx={buttonMainStyle}
          startIcon={<GroupAddIcon />}
          onClick={onCreateActor}
        >
          Add actor
        </Button>
      </Stack>

      <Box
        sx={{
          height: '60vh',
          overflowY: 'auto',
        }}
      >
        <List>
          {actors.map((actor) => (
            <Stack key={actor.id} direction='column' marginBottom={1}>
              <ListItem
                component={Link}
                to={`/actors/${actor.id}`}
                disablePadding
                sx={itemListStyle}
              >
                <ListItemAvatar>
                  <StyledAvatar src={actor.image} />
                </ListItemAvatar>
                <ListItemText
                  primary={`${actor.fullName}, ${actor.nationality}`}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge='end'
                    aria-label='edit'
                    component={Link}
                    to={`/actors/new/${actor.id}`}
                    onClick={(event) => {
                      onItemEdit(event, actor);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    edge='end'
                    aria-label='delete'
                    onClick={(event) => {
                      onItemDelete(event, actor.id);
                    }}
                  >
                    <HighlightOffIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </Stack>
          ))}
        </List>
      </Box>

      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <MuiAlert
          onClose={handleClose}
          severity={severity}
          variant='filled'
          sx={{ width: '100%' }}
        >
          {status}
        </MuiAlert>
      </Snackbar>
    </>
  );
}

export default ActorsList;
