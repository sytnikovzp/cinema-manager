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

import DomainAddIcon from '@mui/icons-material/DomainAdd';
import EditIcon from '@mui/icons-material/Edit';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

import SnackbarContext from '@/src/contexts/SnackbarContext';

import { getStudioByUuid } from '@/src/services/studioService';

import ItemSkeleton from '@/src/components/SkeletonLoader/ItemSkeleton';
import StudiosAbout from '@/src/components/Studios/StudiosAbout';

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

const emptyStudio = {
  uuid: null,
  title: '',
  location: '',
  foundationYear: '',
  logo: '',
  about: '',
};

function StudiosItem() {
  const { uuid } = useParams();
  const navigate = useNavigate();

  const [studio, setStudio] = useState(emptyStudio);
  const [tabIndex, setTabIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const { showSnackbar } = useContext(SnackbarContext);

  const fetchStudio = useCallback(async () => {
    try {
      const data = await getStudioByUuid(uuid);
      setStudio(data);
    } catch (error) {
      showSnackbar(error.message, 'error');
    } finally {
      setLoading(false);
    }
  }, [uuid, showSnackbar]);

  useEffect(() => {
    if (uuid === ':uuid') {
      setStudio(emptyStudio);
      setLoading(false);
    } else {
      fetchStudio();
    }
  }, [uuid, fetchStudio]);

  const handleGoBack = useCallback(() => {
    navigate(`/studios`);
  }, [navigate]);

  const handleTabChange = useCallback((event, newValue) => {
    setTabIndex(newValue);
  }, []);

  const formattedMovies =
    studio.movies && studio.movies.length > 0
      ? studio.movies
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
          To studios
        </Button>

        <Button
          color='warning'
          component={Link}
          startIcon={<EditIcon />}
          sx={buttonMainStyle}
          to={`/studios/edit/${uuid}`}
          type='button'
          variant='contained'
        >
          Edit
        </Button>

        <Button
          color='success'
          component={Link}
          startIcon={<DomainAddIcon />}
          sx={buttonMainStyle}
          to={`/studios/new`}
          type='button'
          variant='contained'
        >
          Add studio
        </Button>
      </Stack>

      <Divider />

      <Box alignItems='center' display='flex' justifyContent='space-between'>
        <Tabs
          aria-label='studio details tabs'
          value={tabIndex}
          onChange={handleTabChange}
        >
          <Tab label='General information' />
          {studio.about && <Tab label='About the studio' />}
        </Tabs>

        {(studio.createdAt || studio.updatedAt) && (
          <Stack direction='row' spacing={1}>
            {studio.createdAt === studio.updatedAt ? (
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
                  {studio.createdAt}
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
                  {studio.updatedAt}
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
                  alt={studio.title}
                  component='img'
                  height='100%'
                  image={
                    studio.logo ||
                    'https://excelautomationinc.com/wp-content/uploads/2021/07/No-Photo-Available.jpg'
                  }
                />
              </Card>
            </Box>
            <Box sx={itemInformationBoxStyle}>
              <Typography component='div' sx={styleItemTypography} variant='h5'>
                {studio.title || 'Unknown studio'}
              </Typography>

              <Stack direction='row' spacing={1}>
                <Typography
                  component='div'
                  sx={styleItemTypography}
                  variant='body1'
                >
                  Foundation year:
                </Typography>
                <Typography component='div' variant='body1'>
                  {studio.foundationYear || 'Unknown'}
                </Typography>
              </Stack>

              <Stack direction='row' spacing={1}>
                <Typography
                  component='div'
                  sx={styleItemTypography}
                  variant='body1'
                >
                  Location:
                </Typography>
                <Typography component='div' variant='body1'>
                  {studio.location.title || 'Unknown'}
                  {studio.country ? ` (${studio.country.title})` : ''}
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

              {tabIndex === 1 && studio.about && (
                <StudiosAbout about={studio.about} />
              )}
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
}

export default StudiosItem;
