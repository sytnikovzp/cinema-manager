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
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';

import { styled } from '@mui/material/styles';

import EditIcon from '@mui/icons-material/Edit';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import VideoSettingsIcon from '@mui/icons-material/VideoSettings';

import useItemsPerPage from '../../hooks/useItemsPerPage';
import usePagination from '../../hooks/usePagination';

import { deleteCountry } from '../../services/countryService';
import { deleteGenre } from '../../services/genreService';
import { deleteLocation } from '../../services/locationService';
import {
  buttonMainStyle,
  itemListStyle,
  scrollServicesListBoxStyle,
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

function ServicesList() {
  const itemsPerPage = useItemsPerPage();
  const adjustedItemsPerPage = itemsPerPage - 1;

  const [tabIndex, setTabIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const { showSnackbar } = useContext(SnackbarContext);

  const handleTabChange = useCallback((event, newValue) => {
    setTabIndex(newValue);
    setCurrentPage(1);
  }, []);

  const handleError = useCallback(
    (error, type) => {
      if (error) {
        showSnackbar(error, type);
      }
    },
    [showSnackbar]
  );

  const genresData = usePagination(
    `/genres`,
    adjustedItemsPerPage,
    currentPage
  );
  const countriesData = usePagination(
    `/countries`,
    adjustedItemsPerPage,
    currentPage
  );
  const locationsData = usePagination(
    `/locations`,
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

  const handlePageChange = useCallback((event, value) => {
    setCurrentPage(value);
  }, []);

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
          link: `/services/new-genres`,
        };
      case 1:
        return {
          text: 'Add country',
          link: `/services/new-countries`,
        };
      case 2:
        return {
          text: 'Add location',
          link: `/services/new-locations`,
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
                  <Box key={index}>
                    <ListSkeleton />
                  </Box>
                ))
            : data.map((item) => (
                <Stack key={item.id} direction='column' marginBottom={1}>
                  <ListItem disablePadding sx={itemListStyle}>
                    <ListItemButton sx={styleListListItemButton}>
                      <ListItemAvatar>
                        <StyledAvatar
                          src={item.logo || item.flag || item.coatOfArms}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={`${item.title}${
                          item.country ? `, ${item.country}` : ''
                        }`}
                      />
                    </ListItemButton>
                    <ListItemSecondaryAction>
                      <Stack direction='row' spacing={1}>
                        <IconButton
                          aria-label='edit'
                          component={Link}
                          edge='end'
                          to={`/services/edit-${entityName}/${item.id}`}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          aria-label='delete'
                          edge='end'
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
      <Stack alignItems='center' marginTop={2} spacing={2}>
        <Pagination
          color='primary'
          count={Math.ceil(totalItems / adjustedItemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
        />
      </Stack>
    </>
  );

  return (
    <>
      <Stack direction='row' justifyContent='space-between'>
        <Typography component='h2' variant='h4'>
          Service List
        </Typography>
        <Button
          color='success'
          component={Link}
          startIcon={<VideoSettingsIcon />}
          sx={buttonMainStyle}
          to={link}
          type='button'
          variant='contained'
        >
          {text}
        </Button>
      </Stack>

      <Divider />

      <Tabs
        aria-label='service details tabs'
        value={tabIndex}
        onChange={handleTabChange}
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
          'genres'
        )}
      {tabIndex === 1 &&
        renderList(
          data,
          loading,
          (e, id) =>
            onDelete(e, id, deleteCountry, 'Country deleted successfully!'),
          'countries'
        )}
      {tabIndex === 2 &&
        renderList(
          data,
          loading,
          (e, id) =>
            onDelete(e, id, deleteLocation, 'Location deleted successfully!'),
          'locations'
        )}
    </>
  );
}

export default ServicesList;
