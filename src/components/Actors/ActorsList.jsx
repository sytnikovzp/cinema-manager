import { useState, useCallback, useContext, useEffect } from 'react';
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
import Divider from '@mui/material/Divider';
import Pagination from '@mui/material/Pagination';
// =============================================
import {
  buttonMainStyle,
  itemListStyle,
  scrollListBoxStyle,
} from '../../services/styleService';
// =============================================
import { renderListSkeleton } from '../../services/skeletonService';
// =============================================
import { ACTORS_ENTITY_NAME } from '../../constants';
import { deleteActor } from '../../services/actorService';
// =============================================
import SnackbarContext from '../../contexts/SnackbarContext';
// =============================================
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
    error,
    refetch,
  } = usePaginatedData(`/${ACTORS_ENTITY_NAME}`, itemsPerPage, currentPage);

  const { showSnackbar } = useContext(SnackbarContext);

  useEffect(() => {
    if (error) {
      showSnackbar(error, 'error');
    }
  }, [error, showSnackbar]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const onActorDelete = useCallback(
    async (event, id) => {
      event.stopPropagation();
      try {
        await deleteActor(id);
        refetch();
        showSnackbar('Actor deleted successfully!', 'success');
      } catch (error) {
        showSnackbar(error.message, 'error');
      }
    },
    [refetch, showSnackbar]
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
                  <Box key={index}>{renderListSkeleton()}</Box>
                ))
            : actors.map((actor) => (
                <Stack key={actor.id} direction='column' marginBottom={1}>
                  <ListItem
                    component={Link}
                    to={`/${ACTORS_ENTITY_NAME}/${actor.id}`}
                    disablePadding
                    sx={itemListStyle}
                  >
                    <ListItemButton sx={{ borderRadius: 5 }}>
                      <ListItemAvatar>
                        <StyledAvatar src={actor.photo} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={`${actor.full_name || 'Unknown actor'}, ${
                          actor.country || 'unknown nationality'
                        }`}
                      />
                    </ListItemButton>

                    <ListItemSecondaryAction>
                      <Stack direction='row' spacing={1}>
                        <IconButton
                          edge='end'
                          aria-label='edit'
                          component={Link}
                          to={`/${ACTORS_ENTITY_NAME}/edit/${actor.id}`}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          edge='end'
                          aria-label='delete'
                          onClick={(event) => onActorDelete(event, actor.id)}
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
    </>
  );
}

export default ActorsList;
