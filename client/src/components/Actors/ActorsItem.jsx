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

import { emptyActor } from '../../constants';

import { getActorByUuid } from '../../services/actorService';
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

import ActorsBiography from './ActorsBiography';

function ActorsItem() {
  const { uuid } = useParams();
  const navigate = useNavigate();

  const [actor, setActor] = useState(emptyActor);
  const [tabIndex, setTabIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const { showSnackbar } = useContext(SnackbarContext);

  const fetchActor = useCallback(async () => {
    try {
      const data = await getActorByUuid(uuid);
      setActor(data);
    } catch (error) {
      showSnackbar(error.message, 'error');
    } finally {
      setLoading(false);
    }
  }, [uuid, showSnackbar]);

  useEffect(() => {
    if (uuid === ':uuid') {
      setActor(emptyActor);
      setLoading(false);
    } else {
      fetchActor();
    }
  }, [uuid, fetchActor]);

  const handleGoBack = useCallback(() => {
    navigate(`/actors`);
  }, [navigate]);

  const handleTabChange = useCallback((event, newValue) => {
    setTabIndex(newValue);
  }, []);

  const formattedMovies =
    actor.movies && actor.movies.length > 0
      ? actor.movies
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

  const calculatedAge = calculateAge(actor.birthDate, actor.deathDate);

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
          To actors
        </Button>

        <Button
          color='warning'
          component={Link}
          startIcon={<EditIcon />}
          sx={buttonMainStyle}
          to={`/actors/edit/${uuid}`}
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
          to={`/actors/new`}
          type='button'
          variant='contained'
        >
          Add actor
        </Button>
      </Stack>

      <Divider />

      <Box alignItems='center' display='flex' justifyContent='space-between'>
        <Tabs
          aria-label='actor details tabs'
          value={tabIndex}
          onChange={handleTabChange}
        >
          <Tab label='General information' />
          {actor.biography && <Tab label='About the actor' />}
        </Tabs>

        {(actor.createdAt || actor.updatedAt) && (
          <Stack direction='row' spacing={1}>
            {actor.createdAt === actor.updatedAt ? (
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
                  {actor.createdAt}
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
                  {actor.updatedAt}
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
                  alt={actor.fullName}
                  component='img'
                  height='100%'
                  image={
                    actor.photo ||
                    'https://excelautomationinc.com/wp-content/uploads/2021/07/No-Photo-Available.jpg'
                  }
                />
              </Card>
            </Box>
            <Box sx={itemInformationBoxStyle}>
              <Typography component='div' sx={styleItemTypography} variant='h5'>
                {actor.fullName || 'Unknown actor'}
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
                  {actor.birthDate ? actor.birthDate : 'Unknown'}
                  {actor.birthDate &&
                    (actor.birthDate && actor.deathDate
                      ? ` (aged ${calculatedAge})`
                      : ` (age ${calculatedAge})`)}
                </Typography>
              </Stack>

              {actor.deathDate && (
                <Stack direction='row' spacing={1}>
                  <Typography
                    component='div'
                    sx={styleItemTypography}
                    variant='body1'
                  >
                    Death date:
                  </Typography>
                  <Typography component='div' variant='body1'>
                    {actor.deathDate}
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
                  {actor.country.title || 'Unknown'}
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

              {tabIndex === 1 && actor.biography && (
                <ActorsBiography biography={actor.biography} />
              )}
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
}

export default ActorsItem;
