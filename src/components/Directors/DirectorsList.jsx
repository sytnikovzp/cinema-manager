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
import { DIRECTORS_ENTITY_NAME } from '../../constants';
import { deleteDirector } from '../../services/directorService';
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

function DirectorsList() {
  const itemsPerPage = useItemsPerPage();
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: directors,
    totalItems,
    loading,
    error,
    refetch,
  } = usePaginatedData(`/${DIRECTORS_ENTITY_NAME}`, itemsPerPage, currentPage);

  const { showSnackbar } = useContext(SnackbarContext);

  useEffect(() => {
    if (error) {
      showSnackbar(error, 'error');
    }
  }, [error, showSnackbar]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const onDirectorDelete = useCallback(
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
          {loading
            ? Array(itemsPerPage)
                .fill()
                .map((_, index) => (
                  <Box key={index}>{renderListSkeleton()}</Box>
                ))
            : directors.map((director) => (
                <Stack key={director.id} direction='column' marginBottom={1}>
                  <ListItem
                    component={Link}
                    to={`/${DIRECTORS_ENTITY_NAME}/${director.id}`}
                    disablePadding
                    sx={itemListStyle}
                  >
                    <ListItemButton sx={{ borderRadius: 5 }}>
                      <ListItemAvatar>
                        <StyledAvatar src={director.photo} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={`${
                          director.full_name || 'Unknown director'
                        }, ${director.country || 'unknown nationality'}`}
                      />
                    </ListItemButton>

                    <ListItemSecondaryAction>
                      <Stack direction='row' spacing={1}>
                        <IconButton
                          edge='end'
                          aria-label='edit'
                          component={Link}
                          to={`/${DIRECTORS_ENTITY_NAME}/edit/${director.id}`}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          edge='end'
                          aria-label='delete'
                          onClick={(event) => {
                            onDirectorDelete(event, director.id);
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

export default DirectorsList;
