import { useState, useCallback } from 'react';
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
import { styled } from '@mui/material/styles';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';
import Skeleton from '@mui/material/Skeleton';
import Pagination from '@mui/material/Pagination';
// =============================================
import {
  buttonMainStyle,
  itemListStyle,
  scrollListBoxStyle,
} from '../../services/styleService';
// =============================================
import api from '../../api';
import { ACTORS_SLICE_NAME } from '../../constants';
// =============================================
import useSnackbar from '../../hooks/useSnackbar';
import useItemsPerPage from '../../hooks/useItemsPerPage';
import usePaginatedData from '../../hooks/usePaginatedData';

const StyledAvatar = styled(Avatar)({
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  img: {
    objectPosition: 'center top',
  },
});

function ActorsList() {
  const itemsPerPage = useItemsPerPage();
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: actors,
    totalItems,
    loading,
    refetch,
  } = usePaginatedData(`/${ACTORS_SLICE_NAME}`, itemsPerPage, currentPage);

  const { snackbar, showSnackbar, handleClose } = useSnackbar();

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const onItemDelete = useCallback(
    async (event, id) => {
      event.stopPropagation();
      try {
        await api.delete(`/${ACTORS_SLICE_NAME}/${id}`);
        refetch();
        showSnackbar('Actor deleted successfully!', 'success');
      } catch (err) {
        showSnackbar('Failed to delete actor!', 'error');
      }
    },
    [refetch, showSnackbar]
  );

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
        >
          Add actor
        </Button>
      </Stack>

      <Divider />

      <Box sx={scrollListBoxStyle}>
        <List>
          {loading
            ? Array(itemsPerPage)
                .fill()
                .map((_, index) => (
                  <Box key={index}>{renderLoadingSkeleton()}</Box>
                ))
            : actors.map((actor) => (
                <Stack key={actor.id} direction='column' marginBottom={1}>
                  <ListItem
                    component={Link}
                    to={`/actors/${actor.id}`}
                    disablePadding
                    sx={itemListStyle}
                  >
                    <ListItemButton sx={{ borderRadius: 5 }}>
                      <ListItemAvatar>
                        <StyledAvatar src={actor.photo} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={`${actor.full_name || 'Unknown actor'}, ${
                          actor.nationality || 'unknown nationality'
                        }`}
                      />
                    </ListItemButton>

                    <ListItemSecondaryAction>
                      <Stack direction='row' spacing={1}>
                        <IconButton
                          edge='end'
                          aria-label='edit'
                          component={Link}
                          to={`/actors/edit/${actor.id}`}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          edge='end'
                          aria-label='delete'
                          onClick={(event) => onItemDelete(event, actor.id)}
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

      <Stack spacing={2} alignItems='center' marginTop={2}>
        <Pagination
          count={Math.ceil(totalItems / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color='primary'
        />
      </Stack>

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

export default ActorsList;
