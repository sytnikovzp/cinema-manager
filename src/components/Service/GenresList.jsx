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
import VideoSettingsIcon from '@mui/icons-material/VideoSettings';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import EditIcon from '@mui/icons-material/Edit';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Pagination from '@mui/material/Pagination';
import { Tab, Tabs } from '@mui/material';
// =============================================
import {
  buttonMainStyle,
  itemListStyle,
  scrollGenresListBoxStyle,
} from '../../services/styleService';
// =============================================
import { renderListSkeleton } from '../../services/skeletonService';
// =============================================
import {
  GENRES_ENTITY_NAME,
  COUNTRIES_ENTITY_NAME,
  LOCATIONS_ENTITY_NAME,
} from '../../constants';
import { deleteGenre } from '../../services/genreService';
import { deleteCountry } from '../../services/countryService';
import { deleteLocation } from '../../services/locationService';
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

function GenresList() {
  const itemsPerPage = useItemsPerPage();
  const adjustedItemsPerPage = itemsPerPage - 1;

  const [tabIndex, setTabIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const useEntityData = (entityName) => {
    return usePaginatedData(
      `/${entityName}`,
      adjustedItemsPerPage,
      currentPage
    );
  };

  const {
    data: genres,
    totalItems: genresTotalItems,
    loading: genresLoading,
    error: genresError,
    refetch: refetchGenres,
  } = useEntityData(GENRES_ENTITY_NAME);
  const {
    data: countries,
    totalItems: countriesTotalItems,
    loading: countriesLoading,
    error: countriesError,
    refetch: refetchCountries,
  } = useEntityData(COUNTRIES_ENTITY_NAME);
  const {
    data: locations,
    totalItems: locationsTotalItems,
    loading: locationsLoading,
    error: locationsError,
    refetch: refetchLocations,
  } = useEntityData(LOCATIONS_ENTITY_NAME);

  const { showSnackbar } = useContext(SnackbarContext);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
    setCurrentPage(1);
  };

  const handleError = useCallback(
    (error, type) => {
      if (error) {
        showSnackbar(error, type);
      }
    },
    [showSnackbar]
  );

  useEffect(() => {
    handleError(genresError, 'error');
    handleError(countriesError, 'error');
    handleError(locationsError, 'error');
  }, [genresError, countriesError, locationsError, handleError]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const onDelete = async (
    event,
    id,
    deleteFunction,
    refetchFunction,
    successMessage
  ) => {
    event.stopPropagation();
    try {
      await deleteFunction(id);
      refetchFunction();
      setCurrentPage(1);
      showSnackbar(successMessage, 'success');
    } catch (err) {
      showSnackbar('Failed to delete item!', 'error');
    }
  };

  const getButtonProps = () => {
    switch (tabIndex) {
      case 0:
        return {
          text: 'Add genre',
          link: `/${GENRES_ENTITY_NAME}/new-${GENRES_ENTITY_NAME}`,
        };
      case 1:
        return {
          text: 'Add country',
          link: `/${GENRES_ENTITY_NAME}/new-${COUNTRIES_ENTITY_NAME}`,
        };
      case 2:
        return {
          text: 'Add location',
          link: `/${GENRES_ENTITY_NAME}/new-${LOCATIONS_ENTITY_NAME}`,
        };
      default:
        return { text: 'Add item', link: '#' };
    }
  };

  const { text, link } = getButtonProps();

  const renderList = (data, loading, onDelete, entityName) => (
    <>
      <Box sx={scrollGenresListBoxStyle}>
        <List>
          {loading
            ? Array(adjustedItemsPerPage)
                .fill()
                .map((_, index) => (
                  <Box key={index}>{renderListSkeleton()}</Box>
                ))
            : data.map((item) => (
                <Stack key={item.id} direction='column' marginBottom={1}>
                  <ListItem disablePadding sx={itemListStyle}>
                    <ListItemButton sx={{ borderRadius: 5 }}>
                      <ListItemAvatar>
                        <StyledAvatar src={item.logo} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={`${item.title || 'Unknown ${entityName}'}${
                          item.country ? `, ` + item.country : ''
                        }`}
                      />
                    </ListItemButton>
                    <ListItemSecondaryAction>
                      <Stack direction='row' spacing={1}>
                        <IconButton
                          edge='end'
                          aria-label='edit'
                          component={Link}
                          to={`/${GENRES_ENTITY_NAME}/edit-${entityName}/${item.id}`}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          edge='end'
                          aria-label='delete'
                          onClick={(event) => onDelete(event, item.id)}
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
          count={Math.ceil(
            {
              0: genresTotalItems,
              1: countriesTotalItems,
              2: locationsTotalItems,
            }[tabIndex] / adjustedItemsPerPage
          )}
          page={currentPage}
          onChange={handlePageChange}
          color='primary'
        />
      </Stack>
    </>
  );

  return (
    <>
      <Stack direction='row' justifyContent='space-between'>
        <Typography variant='h4' component='h2'>
          Service List
        </Typography>
        <Button
          component={Link}
          to={link}
          type='button'
          variant='contained'
          color='success'
          sx={buttonMainStyle}
          startIcon={<VideoSettingsIcon />}
        >
          {text}
        </Button>
      </Stack>

      <Divider />

      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        aria-label='service details tabs'
      >
        <Tab label='Movie genres' />
        <Tab label='Countries' />
        <Tab label='Locations' />
      </Tabs>

      {tabIndex === 0 &&
        renderList(
          genres,
          genresLoading,
          (e, id) =>
            onDelete(
              e,
              id,
              deleteGenre,
              refetchGenres,
              'Genre deleted successfully!'
            ),
          GENRES_ENTITY_NAME
        )}
      {tabIndex === 1 &&
        renderList(
          countries,
          countriesLoading,
          (e, id) =>
            onDelete(
              e,
              id,
              deleteCountry,
              refetchCountries,
              'Country deleted successfully!'
            ),
          COUNTRIES_ENTITY_NAME
        )}
      {tabIndex === 2 &&
        renderList(
          locations,
          locationsLoading,
          (e, id) =>
            onDelete(
              e,
              id,
              deleteLocation,
              refetchLocations,
              'Location deleted successfully!'
            ),
          LOCATIONS_ENTITY_NAME
        )}
    </>
  );
}

export default GenresList;
