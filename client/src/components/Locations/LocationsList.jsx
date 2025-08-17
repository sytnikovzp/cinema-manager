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

import SnackbarContext from '@/src/contexts/SnackbarContext';
import useItemsPerPage from '@/src/hooks/useItemsPerPage';
import usePagination from '@/src/hooks/usePagination';

import { deleteLocation } from '@/src/services/locationService';
import {
  buttonMainStyle,
  itemListStyle,
  scrollListBoxStyle,
  styleListListItemButton,
} from '@/src/services/styleService';

import ListSkeleton from '@/src/components/SkeletonLoader/ListSkeleton';

const StyledAvatar = styled(Avatar)({
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  img: {
    objectPosition: 'center top',
  },
});

function LocationsList() {
  const itemsPerPage = useItemsPerPage();
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: locations,
    totalItems,
    loading,
    error,
    refetch,
  } = usePagination(`/locations`, itemsPerPage, currentPage);

  const { showSnackbar } = useContext(SnackbarContext);

  useEffect(() => {
    if (error) {
      showSnackbar(error, 'error');
    }
  }, [error, showSnackbar]);

  const handlePageChange = useCallback((event, value) => {
    setCurrentPage(value);
  }, []);

  const handleDeleteLocation = useCallback(
    async (event, uuid) => {
      event.stopPropagation();
      try {
        await deleteLocation(uuid);
        refetch();
        showSnackbar('Location deleted successfully!', 'success');
      } catch (error) {
        showSnackbar(error.message, 'error');
      }
    },
    [refetch, showSnackbar]
  );

  const onDelete = useCallback(
    (uuid) => (event) => {
      event.stopPropagation();
      handleDeleteLocation(event, uuid);
    },
    [handleDeleteLocation]
  );

  return (
    <>
      <Stack direction='row' justifyContent='space-between'>
        <Typography component='h2' variant='h4'>
          Locations list
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
          Add location
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
            : locations.map((location) => (
                <Stack key={location.uuid} direction='column' marginBottom={1}>
                  <ListItem
                    disablePadding
                    component={Link}
                    sx={itemListStyle}
                    to={`/locations/${location.uuid}`}
                  >
                    <ListItemButton sx={styleListListItemButton}>
                      <ListItemAvatar>
                        <StyledAvatar src={location.coatOfArms} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={`${location.title || 'Unknown location'}, ${
                          location.country || 'unknown country'
                        }`}
                      />
                    </ListItemButton>

                    <ListItemSecondaryAction>
                      <Stack direction='row' spacing={1}>
                        <IconButton
                          aria-label='edit'
                          component={Link}
                          edge='end'
                          to={`/locations/edit/${location.uuid}`}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          aria-label='delete'
                          edge='end'
                          onClick={onDelete(location.uuid)}
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

      <Stack alignItems='center' spacing={2}>
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

export default LocationsList;
