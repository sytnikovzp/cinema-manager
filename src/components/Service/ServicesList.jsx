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
  scrollServicesListBoxStyle,
} from '../../services/styleService';
// =============================================
import { renderListSkeleton } from '../../services/skeletonService';
// =============================================
import {
  SERVICES_ENTITY_NAME,
  GENRES_ENTITY_NAME,
  COUNTRIES_ENTITY_NAME,
  LOCATIONS_ENTITY_NAME,
} from '../../constants';
// =============================================
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

function ServicesList() {
  const itemsPerPage = useItemsPerPage();
  const adjustedItemsPerPage = itemsPerPage - 1;

  const [tabIndex, setTabIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

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

  const genresData = usePaginatedData(
    `/${GENRES_ENTITY_NAME}`,
    adjustedItemsPerPage,
    currentPage
  );
  const countriesData = usePaginatedData(
    `/${COUNTRIES_ENTITY_NAME}`,
    adjustedItemsPerPage,
    currentPage
  );
  const locationsData = usePaginatedData(
    `/${LOCATIONS_ENTITY_NAME}`,
    adjustedItemsPerPage,
    currentPage
  );

  const { data, totalItems, loading, error, refetch } = {
    0: genresData,
    1: countriesData,
    2: locationsData,
  }[tabIndex];

  useEffect(() => {
    handleError(error, 'error');
  }, [error, handleError]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const onDelete = async (event, id, deleteFunction, successMessage) => {
    event.stopPropagation();
    try {
      await deleteFunction(id);
      refetch();
      setCurrentPage(1);
      showSnackbar(successMessage, 'success');
    } catch (error) {
      showSnackbar(error.message, 'error');
    }
  };

  const getButtonProps = () => {
    switch (tabIndex) {
      case 0:
        return {
          text: 'Add genre',
          link: `/${SERVICES_ENTITY_NAME}/new-${GENRES_ENTITY_NAME}`,
        };
      case 1:
        return {
          text: 'Add country',
          link: `/${SERVICES_ENTITY_NAME}/new-${COUNTRIES_ENTITY_NAME}`,
        };
      case 2:
        return {
          text: 'Add location',
          link: `/${SERVICES_ENTITY_NAME}/new-${LOCATIONS_ENTITY_NAME}`,
        };
      default:
        return { text: 'Add item', link: '#' };
    }
  };

  const { text, link } = getButtonProps();

  const renderList = (data, loading, onDelete, entityName) => (
    <>
      <Box sx={scrollServicesListBoxStyle}>
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
                        <StyledAvatar
                          src={item.logo || item.flag || item.coat_of_arms}
                        />
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
                          to={`/${SERVICES_ENTITY_NAME}/edit-${entityName}/${item.id}`}
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
          count={Math.ceil(totalItems / adjustedItemsPerPage)}
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
          data,
          loading,
          (e, id) =>
            onDelete(e, id, deleteGenre, 'Genre deleted successfully!'),
          GENRES_ENTITY_NAME
        )}
      {tabIndex === 1 &&
        renderList(
          data,
          loading,
          (e, id) =>
            onDelete(e, id, deleteCountry, 'Country deleted successfully!'),
          COUNTRIES_ENTITY_NAME
        )}
      {tabIndex === 2 &&
        renderList(
          data,
          loading,
          (e, id) =>
            onDelete(e, id, deleteLocation, 'Location deleted successfully!'),
          LOCATIONS_ENTITY_NAME
        )}
    </>
  );
}

export default ServicesList;
