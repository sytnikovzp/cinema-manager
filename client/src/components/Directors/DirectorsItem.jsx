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

import { emptyDirector } from '../../constants';

import { getDirectorByUuid } from '../../services/directorService';
import { calculateAge } from '../../services/itemService';
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
} from '../../services/styleService';

import SnackbarContext from '../../contexts/SnackbarContext';
import ItemSkeleton from '../SkeletonLoader/ItemSkeleton';

import DirectorsBiography from './DirectorsBiography';

function DirectorsItem() {
  const { uuid } = useParams();
  const navigate = useNavigate();

  const [director, setDirector] = useState(emptyDirector);
  const [tabIndex, setTabIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const { showSnackbar } = useContext(SnackbarContext);

  const fetchDirector = useCallback(async () => {
    try {
      const data = await getDirectorByUuid(uuid);
      setDirector(data);
    } catch (error) {
      showSnackbar(error.message, 'error');
    } finally {
      setLoading(false);
    }
  }, [uuid, showSnackbar]);

  useEffect(() => {
    if (uuid === ':uuid') {
      setDirector(emptyDirector);
      setLoading(false);
    } else {
      fetchDirector();
    }
  }, [uuid, fetchDirector]);

  const handleGoBack = useCallback(() => {
    navigate(`/directors`);
  }, [navigate]);

  const handleTabChange = useCallback((event, newValue) => {
    setTabIndex(newValue);
  }, []);

  const formattedMovies =
    director.movies && director.movies.length > 0
      ? director.movies
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

  const calculatedAge = calculateAge(director.birthDate, director.deathDate);

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
          To directors
        </Button>

        <Button
          color='warning'
          component={Link}
          startIcon={<EditIcon />}
          sx={buttonMainStyle}
          to={`/directors/edit/${uuid}`}
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
          to={`/directors/new`}
          type='button'
          variant='contained'
        >
          Add director
        </Button>
      </Stack>

      <Divider />

      <Box alignItems='center' display='flex' justifyContent='space-between'>
        <Tabs
          aria-label='director details tabs'
          value={tabIndex}
          onChange={handleTabChange}
        >
          <Tab label='General information' />
          {director.biography && <Tab label='About the director' />}
        </Tabs>

        {(director.createdAt || director.updatedAt) && (
          <Stack direction='row' spacing={1}>
            {director.createdAt === director.updatedAt ? (
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
                  {director.createdAt}
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
                  {director.updatedAt}
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
                  alt={director.fullName}
                  component='img'
                  height='100%'
                  image={
                    director.photo ||
                    'https://excelautomationinc.com/wp-content/uploads/2021/07/No-Photo-Available.jpg'
                  }
                />
              </Card>
            </Box>
            <Box sx={itemInformationBoxStyle}>
              <Typography component='div' sx={styleItemTypography} variant='h5'>
                {director.fullName || 'Unknown director'}
              </Typography>
              <Stack direction='row' spacing={1}>
                <Typography
                  component='div'
                  sx={styleItemTypography}
                  variant='body1'
                >
                  Birth date:
                </Typography>
                <Typography component='div' variant='body1'>
                  {director.birthDate ? director.birthDate : 'Unknown'}
                  {director.birthDate &&
                    (director.birthDate && director.deathDate
                      ? ` (aged ${calculatedAge})`
                      : ` (age ${calculatedAge})`)}
                </Typography>
              </Stack>
              {director.deathDate && (
                <Stack direction='row' spacing={1}>
                  <Typography
                    component='div'
                    sx={styleItemTypography}
                    variant='body1'
                  >
                    Death date:
                  </Typography>
                  <Typography component='div' variant='body1'>
                    {director.deathDate}
                  </Typography>
                </Stack>
              )}
              <Stack direction='row' spacing={1}>
                <Typography
                  component='div'
                  sx={styleItemTypography}
                  variant='body1'
                >
                  Nationality:
                </Typography>
                <Typography component='div' variant='body1'>
                  {director.country.title || 'Unknown'}
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
              {tabIndex === 1 && director.biography && (
                <DirectorsBiography biography={director.biography} />
              )}
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
}

export default DirectorsItem;
