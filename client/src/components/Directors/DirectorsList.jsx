import { useCallback, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { styled } from '@mui/material/styles';

import EditIcon from '@mui/icons-material/Edit';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import useItemsPerPage from '../../hooks/useItemsPerPage';
import usePagination from '../../hooks/usePagination';

import { deleteDirector } from '../../services/directorService';
import {
  buttonMainStyle,
  itemListStyle,
  scrollListBoxStyle,
  styleListListItemButton,
} from '../../services/styleService';

import SnackbarContext from '../../contexts/SnackbarContext';
import ListSkeleton from '../SkeletonLoader/ListSkeleton';

const StyledAvatar = styled(Avatar)({
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  img: {
    objectPosition: 'center top',
  },
});

function DirectorsList() {
  const itemsPerPage = useItemsPerPage();
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: directors,
    totalItems,
    loading,
    error,
    refetch,
  } = usePagination(`/directors`, itemsPerPage, currentPage);

  const { showSnackbar } = useContext(SnackbarContext);

  useEffect(() => {
    if (error) {
      showSnackbar(error, 'error');
    }
  }, [error, showSnackbar]);

  const handlePageChange = useCallback((event, value) => {
    setCurrentPage(value);
  }, []);

  const handleDeleteDirector = useCallback(
    async (event, id) => {
      event.stopPropagation();
      try {
        await deleteDirector(id);
        refetch();
        showSnackbar('Director deleted successfully!', 'success');
      } catch (error) {
        showSnackbar(error.message, 'error');
      }
    },
    [refetch, showSnackbar]
  );

  const onDelete = useCallback(
    (id) => (event) => {
      event.stopPropagation();
      handleDeleteDirector(event, id);
    },
    [handleDeleteDirector]
  );

  return (
    <>
      <Stack direction='row' justifyContent='space-between'>
        <Typography component='h2' variant='h4'>
          Directors list
        </Typography>

        <Button
          color='success'
          component={Link}
          startIcon={<GroupAddIcon />}
          sx={buttonMainStyle}
          to='new'
          type='button'
          variant='contained'
        >
          Add director
        </Button>
      </Stack>

      <Divider />

      <Box sx={scrollListBoxStyle}>
        <List>
          {loading
            ? Array(itemsPerPage)
                .fill()
                .map((_, index) => (
                  <Box key={index}>
                    <ListSkeleton />
                  </Box>
                ))
            : directors.map((director) => (
                <Stack key={director.id} direction='column' marginBottom={1}>
                  <ListItem
                    disablePadding
                    component={Link}
                    sx={itemListStyle}
                    to={`/directors/${director.id}`}
                  >
                    <ListItemButton sx={styleListListItemButton}>
                      <ListItemAvatar>
                        <StyledAvatar src={director.photo} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={`${director.fullName || 'Unknown director'}, ${
                          director.country || 'unknown nationality'
                        }`}
                      />
                    </ListItemButton>

                    <ListItemSecondaryAction>
                      <Stack direction='row' spacing={1}>
                        <IconButton
                          aria-label='edit'
                          component={Link}
                          edge='end'
                          to={`/directors/edit/${director.id}`}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          aria-label='delete'
                          edge='end'
                          onClick={onDelete(director.id)}
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

      <Stack alignItems='center' marginTop={2} spacing={2}>
        <Pagination
          color='primary'
          count={Math.ceil(totalItems / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
        />
      </Stack>
    </>
  );
}

export default DirectorsList;
