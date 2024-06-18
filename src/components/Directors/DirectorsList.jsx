import { useEffect, useRef } from 'react';
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
import ListItemButton from '@mui/material/ListItemButton';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import EditIcon from '@mui/icons-material/Edit';
import { styled } from '@mui/system';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';
import Skeleton from '@mui/material/Skeleton';
// =============================================
import {
  buttonMainStyle,
  itemListStyle,
  scrollListBoxStyle,
} from '../../services/styleService';
// =============================================
import { deleteDirector, resetStatus } from '../../store/slices/directorsSlice';
// =============================================
import useSnackbar from '../../hooks';

const StyledAvatar = styled(Avatar)({
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  img: {
    objectPosition: 'center top',
  },
});

function DirectorsList() {
  const dispatch = useDispatch();

  const directors = useSelector((state) => state.directorsList.directors);
  const status = useSelector((state) => state.directorsList.status);

  const { snackbar, showSnackbar, handleClose } = useSnackbar(() =>
    dispatch(resetStatus())
  );

  const prevStatusRef = useRef();

  useEffect(() => {
    const prevStatus = prevStatusRef.current;
    const currentStatus = status;

    if (
      currentStatus &&
      currentStatus !== prevStatus &&
      currentStatus !== 'loading'
    ) {
      const severity = currentStatus.toLowerCase().includes('success')
        ? 'success'
        : 'error';
      showSnackbar(currentStatus, severity);
    }

    prevStatusRef.current = currentStatus;
  }, [status, showSnackbar]);

  const onItemDelete = (event, id) => {
    event.stopPropagation();
    dispatch(deleteDirector(id));
  };

  const renderLoadingSkeleton = () => (
    <Stack direction='column' marginBottom={1}>
      <ListItem disablePadding sx={itemListStyle}>
        <ListItemButton sx={{ borderRadius: 5 }}>
          <ListItemAvatar>
            <Skeleton
              variant='circular'
              animation='wave'
              width={40}
              height={40}
            />
          </ListItemAvatar>
          <ListItemText
            primary={<Skeleton variant='text' animation='wave' width='80%' />}
          />
        </ListItemButton>
        <ListItemSecondaryAction>
          <Stack direction='row' spacing={1}>
            <Skeleton
              variant='circular'
              animation='wave'
              width={40}
              height={40}
            />
            <Skeleton
              variant='circular'
              animation='wave'
              width={40}
              height={40}
            />
          </Stack>
        </ListItemSecondaryAction>
      </ListItem>
    </Stack>
  );

  return (
    <>
      <Stack direction='row' justifyContent='space-between'>
        <Typography variant='h4' component='h2'>
          Directors list
        </Typography>

        <Button
          component={Link}
          to='new'
          type='button'
          variant='contained'
          color='success'
          sx={buttonMainStyle}
          startIcon={<GroupAddIcon />}
        >
          Add director
        </Button>
      </Stack>

      <Divider />

      <Box sx={scrollListBoxStyle}>
        <List>
          {status === 'loading'
            ? Array(5)
                .fill()
                .map((_, index) => (
                  <Box key={index}>{renderLoadingSkeleton()}</Box>
                ))
            : directors.map((director) => (
                <Stack key={director.id} direction='column' marginBottom={1}>
                  <ListItem
                    component={Link}
                    to={`/directors/${director.id}`}
                    disablePadding
                    sx={itemListStyle}
                  >
                    <ListItemButton sx={{ borderRadius: 5 }}>
                      <ListItemAvatar>
                        <StyledAvatar src={director.image} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={`${director.fullName || 'Unknown director'}, ${
                          director.nationality || 'unknown nationality'
                        }`}
                      />
                    </ListItemButton>

                    <ListItemSecondaryAction>
                      <Stack direction='row' spacing={1}>
                        <IconButton
                          edge='end'
                          aria-label='edit'
                          component={Link}
                          to={`/directors/new/${director.id}`}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          edge='end'
                          aria-label='delete'
                          onClick={(event) => {
                            onItemDelete(event, director.id);
                          }}
                        >
                          <HighlightOffIcon />
                        </IconButton>
                      </Stack>
                    </ListItemSecondaryAction>
                  </ListItem>
                </Stack>
              ))}
        </List>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={1000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={snackbar.severity}
          variant='filled'
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default DirectorsList;
