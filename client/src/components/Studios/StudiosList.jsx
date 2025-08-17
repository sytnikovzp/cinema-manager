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

import DomainAddIcon from '@mui/icons-material/DomainAdd';
import EditIcon from '@mui/icons-material/Edit';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import SnackbarContext from '@/src/contexts/SnackbarContext';
import useItemsPerPage from '@/src/hooks/useItemsPerPage';
import usePagination from '@/src/hooks/usePagination';

import { deleteStudio } from '@/src/services/studioService';
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

function StudiosList() {
  const itemsPerPage = useItemsPerPage();
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: studios,
    totalItems,
    loading,
    error,
    refetch,
  } = usePagination(`/studios`, itemsPerPage, currentPage);

  const { showSnackbar } = useContext(SnackbarContext);

  useEffect(() => {
    if (error) {
      showSnackbar(error, 'error');
    }
  }, [error, showSnackbar]);

  const handlePageChange = useCallback((event, value) => {
    setCurrentPage(value);
  }, []);

  const handleDeleteStudio = useCallback(
    async (event, uuid) => {
      event.stopPropagation();
      try {
        await deleteStudio(uuid);
        refetch();
        showSnackbar('Studio deleted successfully!', 'success');
      } catch (error) {
        showSnackbar(error.message, 'error');
      }
    },
    [refetch, showSnackbar]
  );

  const onDelete = useCallback(
    (uuid) => (event) => {
      event.stopPropagation();
      handleDeleteStudio(event, uuid);
    },
    [handleDeleteStudio]
  );

  return (
    <>
      <Stack direction='row' justifyContent='space-between'>
        <Typography component='h2' variant='h4'>
          Studios list
        </Typography>

        <Button
          color='success'
          component={Link}
          startIcon={<DomainAddIcon />}
          sx={buttonMainStyle}
          to='new'
          type='button'
          variant='contained'
        >
          Add studio
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
            : studios.map((studio) => (
                <Stack key={studio.uuid} direction='column' marginBottom={1}>
                  <ListItem
                    disablePadding
                    component={Link}
                    sx={itemListStyle}
                    to={`/studios/${studio.uuid}`}
                  >
                    <ListItemButton sx={styleListListItemButton}>
                      <ListItemAvatar>
                        <StyledAvatar src={studio.logo} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={`${studio.title || 'Unknown studio'}, ${
                          studio.foundationYear || 'unknown year'
                        }`}
                      />
                    </ListItemButton>

                    <ListItemSecondaryAction>
                      <Stack direction='row' spacing={1}>
                        <IconButton
                          aria-label='edit'
                          component={Link}
                          edge='end'
                          to={`/studios/edit/${studio.uuid}`}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          aria-label='delete'
                          edge='end'
                          onClick={onDelete(studio.uuid)}
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

export default StudiosList;
