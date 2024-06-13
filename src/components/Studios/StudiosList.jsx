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
// =============================================
import { itemListStyle } from '../../services/styleService';
import { buttonMainStyle } from '../../services/styleService';
// =============================================
import {
  getAllStudios,
  deleteStudio,
  resetStatus,
} from '../../store/slices/studiosSlice';
// =============================================
import useSnackbar from '../../hooks';

const StyledAvatar = styled(Avatar)({
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  img: {
    objectPosition: 'center top',
  },
});

function StudiosList() {
  const dispatch = useDispatch();

  const studios = useSelector((state) => state.studiosList.studios);
  const status = useSelector((state) => state.studiosList.status);

  const { snackbar, showSnackbar, handleClose } = useSnackbar(() =>
    dispatch(resetStatus())
  );

  const prevStatusRef = useRef();

  useEffect(() => {
    dispatch(getAllStudios());
  }, [dispatch]);

  useEffect(() => {
    const prevStatus = prevStatusRef.current;
    const currentStatus = status;

    if (currentStatus && currentStatus !== prevStatus) {
      const severity = currentStatus.toLowerCase().includes('success')
        ? 'success'
        : 'error';
      showSnackbar(currentStatus, severity);
    }

    prevStatusRef.current = currentStatus;
  }, [status, showSnackbar]);

  const onItemDelete = (event, id) => {
    event.stopPropagation();
    dispatch(deleteStudio(id));
  };

  return (
    <>
      <Stack direction='row' justifyContent='space-between'>
        <Typography variant='h4' component='h2'>
          Studios list
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
          Add studio
        </Button>
      </Stack>

      <Divider />

      <Box
        sx={{
          height: '60vh',
          overflowY: 'auto',
        }}
      >
        <List>
          {studios.map((studio) => (
            <Stack key={studio.id} direction='column' marginBottom={1}>
              <ListItem
                component={Link}
                to={`/studios/${studio.id}`}
                disablePadding
                sx={itemListStyle}
              >
                <ListItemButton sx={{ borderRadius: 5 }}>
                  <ListItemAvatar>
                    <StyledAvatar src={studio.logo} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${studio.title}, ${
                      studio.location ? studio.location : 'Unknown'
                    }`}
                  />
                </ListItemButton>

                <ListItemSecondaryAction>
                  <Stack direction='row' spacing={1}>
                    <IconButton
                      edge='end'
                      aria-label='edit'
                      component={Link}
                      to={`/studios/new/${studio.id}`}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      edge='end'
                      aria-label='delete'
                      onClick={(event) => {
                        onItemDelete(event, studio.id);
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

export default StudiosList;
