import { useCallback, useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';

import EditIcon from '@mui/icons-material/Edit';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

import SnackbarContext from '@/src/contexts/SnackbarContext';

import { getLocationByUuid } from '@/src/services/locationService';

import ItemSkeleton from '@/src/components/SkeletonLoader/ItemSkeleton';

import {
  buttonMainStyle,
  itemCardMediaBoxStyle,
  itemComponentBoxMainStyle,
  itemInformationBoxStyle,
  itemLinkStyle,
  scrollItemBoxStyle,
  styleItemCreatedAtLabel,
  styleItemCreatedAtValue,
  styleItemTypography,
  styleStackMargin,
} from '@/src/styles';

const emptyLocation = {
  uuid: null,
  title: '',
  country: '',
  coatOfArms: '',
};

function LocationsItem() {
  const { uuid } = useParams();
  const navigate = useNavigate();

  const [location, setLocation] = useState(emptyLocation);
  const [tabIndex, setTabIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const { showSnackbar } = useContext(SnackbarContext);

  const fetchLocation = useCallback(async () => {
    try {
      const data = await getLocationByUuid(uuid);
      setLocation(data);
    } catch (error) {
      showSnackbar(error.message, 'error');
    } finally {
      setLoading(false);
    }
  }, [uuid, showSnackbar]);

  useEffect(() => {
    if (uuid === ':uuid') {
      setLocation(emptyLocation);
      setLoading(false);
    } else {
      fetchLocation();
    }
  }, [uuid, fetchLocation]);

  const handleGoBack = useCallback(() => {
    navigate(`/locations`);
  }, [navigate]);

  const handleTabChange = useCallback((event, newValue) => {
    setTabIndex(newValue);
  }, []);

  const formattedMovies =
    location.movies && location.movies.length > 0
      ? location.movies
          .map((movie) => (
            <Link
              key={movie.uuid}
              style={itemLinkStyle}
              to={`/movies/${movie.uuid}`}
            >
              {movie.title}
            </Link>
          ))
          .reduce((prev, curr) => [prev, ', ', curr])
      : 'No movies available';

  return (
    <>
      <Stack direction='row' justifyContent='space-between'>
        <Button
          color='info'
          startIcon={<KeyboardBackspaceIcon />}
          sx={buttonMainStyle}
          type='button'
          variant='contained'
          onClick={handleGoBack}
        >
          To locations
        </Button>

        <Button
          color='warning'
          component={Link}
          startIcon={<EditIcon />}
          sx={buttonMainStyle}
          to={`/locations/edit/${uuid}`}
          type='button'
          variant='contained'
        >
          Edit
        </Button>

        <Button
          color='success'
          component={Link}
          startIcon={<GroupAddIcon />}
          sx={buttonMainStyle}
          to={`/locations/new`}
          type='button'
          variant='contained'
        >
          Add location
        </Button>
      </Stack>

      <Divider />

      <Box alignItems='center' display='flex' justifyContent='space-between'>
        <Tabs
          aria-label='location details tabs'
          value={tabIndex}
          onChange={handleTabChange}
        >
          <Tab label='General information' />
        </Tabs>

        {(location.createdAt || location.updatedAt) && (
          <Stack direction='row' spacing={1}>
            {location.createdAt === location.updatedAt ? (
              <>
                <Typography
                  component='div'
                  sx={styleItemCreatedAtLabel}
                  variant='caption'
                >
                  Created at:
                </Typography>
                <Typography
                  component='div'
                  sx={styleItemCreatedAtValue}
                  variant='caption'
                >
                  {location.createdAt}
                </Typography>
              </>
            ) : (
              <>
                <Typography
                  component='div'
                  sx={styleItemCreatedAtLabel}
                  variant='caption'
                >
                  Updated at:
                </Typography>
                <Typography
                  component='div'
                  sx={styleItemCreatedAtValue}
                  variant='caption'
                >
                  {location.updatedAt}
                </Typography>
              </>
            )}
          </Stack>
        )}
      </Box>

      <Box sx={scrollItemBoxStyle}>
        {loading ? (
          <ItemSkeleton />
        ) : (
          <Box sx={itemComponentBoxMainStyle}>
            <Box sx={itemCardMediaBoxStyle}>
              <Card>
                <CardMedia
                  alt={location.title}
                  component='img'
                  height='100%'
                  image={
                    location.coatOfArms ||
                    'https://excelautomationinc.com/wp-content/uploads/2021/07/No-Photo-Available.jpg'
                  }
                />
              </Card>
            </Box>
            <Box sx={itemInformationBoxStyle}>
              <Typography component='div' sx={styleItemTypography} variant='h5'>
                {location.title || 'Unknown location'}
              </Typography>

              <Stack direction='row' spacing={1}>
                <Typography
                  component='div'
                  sx={styleItemTypography}
                  variant='body1'
                >
                  Country:
                </Typography>
                <Typography component='div' variant='body1'>
                  {location.country.title || 'Unknown'}
                </Typography>
              </Stack>

              {tabIndex === 0 && (
                <Stack direction='row' spacing={1} sx={styleStackMargin}>
                  <Typography
                    component='div'
                    sx={styleItemTypography}
                    variant='body1'
                  >
                    Movies:
                  </Typography>
                  <Typography component='div' variant='body1'>
                    {formattedMovies}
                  </Typography>
                </Stack>
              )}
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
}

export default LocationsItem;
