import { useCallback, useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
// =============================================
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
// =============================================
import SnackbarContext from '../../contexts/SnackbarContext';
// =============================================
import {
  MOVIES_ENTITY_NAME,
  ACTORS_ENTITY_NAME,
  DIRECTORS_ENTITY_NAME,
  STUDIOS_ENTITY_NAME,
  emptyMovie,
} from '../../constants';
// =============================================
import { getMovieById } from '../../services/movieService';
// =============================================
import {
  scrollItemBoxStyle,
  buttonMainStyle,
  itemComponentBoxMainStyle,
  itemCardMediaBoxStyle,
  itemInformationBoxStyle,
  textIndentStyle,
  itemLinkStyle,
} from '../../services/styleService';
// =============================================
import { renderItemSkeleton } from '../../services/skeletonService';
// =============================================
import usePaginatedData from '../../hooks/usePaginatedData';
// =============================================
import MoviesPlayer from './MoviesPlayer';

function MoviesItem() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(emptyMovie);
  const [tabIndex, setTabIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const useEntityData = (entityName) => {
    return usePaginatedData(`/${entityName}`, 500, 1);
  };

  const { data: actors, error: actorsError } =
    useEntityData(ACTORS_ENTITY_NAME);
  const { data: directors, error: directorsError } = useEntityData(
    DIRECTORS_ENTITY_NAME
  );
  const { data: studios, error: studiosError } =
    useEntityData(STUDIOS_ENTITY_NAME);

  const { showSnackbar } = useContext(SnackbarContext);

  const fetchMovie = useCallback(async () => {
    try {
      const data = await getMovieById(id);
      setMovie(data);
    } catch (error) {
      showSnackbar('Failed to fetch movie data!', 'error');
    } finally {
      setLoading(false);
    }
  }, [id, showSnackbar]);

  useEffect(() => {
    if (id === ':id' || id === undefined) {
      setMovie(emptyMovie);
      setLoading(false);
    } else {
      fetchMovie();
    }
  }, [id, fetchMovie]);

  useEffect(() => {
    const errors = [
      { error: actorsError, key: 'actorsError' },
      { error: directorsError, key: 'directorsError' },
      { error: studiosError, key: 'studiosError' },
    ];

    errors.forEach(({ error, key }) => {
      if (error) {
        showSnackbar(error, key);
      }
    });
  }, [actorsError, directorsError, studiosError, showSnackbar]);

  const goBack = () => {
    navigate(`/${MOVIES_ENTITY_NAME}`);
  };

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const filteredActorsList = actors
    .filter((actor) => {
      for (let i = 0; i < movie.actors.length; i++) {
        if (actor.full_name === movie.actors[i]) {
          return true;
        }
      }
      return false;
    })
    .map((actor) => ({ id: actor.id, full_name: actor.full_name }));

  const formattedActors =
    filteredActorsList.length > 0
      ? filteredActorsList
          .map((actor) => (
            <Link
              key={actor.id}
              to={`/${ACTORS_ENTITY_NAME}/${actor.id}`}
              style={itemLinkStyle}
            >
              {actor.full_name}
            </Link>
          ))
          .reduce((prev, curr) => [prev, ', ', curr])
      : 'No actors available';

  const filteredDirectorsList = directors
    .filter((director) => {
      for (let i = 0; i < movie.directors.length; i++) {
        if (director.full_name === movie.directors[i]) {
          return true;
        }
      }
      return false;
    })
    .map((director) => ({ id: director.id, full_name: director.full_name }));

  const formattedDirectors =
    filteredDirectorsList.length > 0
      ? filteredDirectorsList
          .map((director) => (
            <Link
              key={director.id}
              to={`/${DIRECTORS_ENTITY_NAME}/${director.id}`}
              style={itemLinkStyle}
            >
              {director.full_name}
            </Link>
          ))
          .reduce((prev, curr) => [prev, ', ', curr])
      : 'No directors available';

  const filteredStudiosList = studios
    .filter((studio) => {
      for (let i = 0; i < movie.studios.length; i++) {
        if (studio.title === movie.studios[i]) {
          return true;
        }
      }
      return false;
    })
    .map((studio) => ({ id: studio.id, title: studio.title }));

  const formattedStudios =
    filteredStudiosList.length > 0
      ? filteredStudiosList
          .map((studio) => (
            <Link
              key={studio.id}
              to={`/${STUDIOS_ENTITY_NAME}/${studio.id}`}
              style={itemLinkStyle}
            >
              {studio.title}
            </Link>
          ))
          .reduce((prev, curr) => [prev, ', ', curr])
      : 'No studios available';

  return (
    <>
      <Stack direction='row' justifyContent='space-between'>
        <Button
          type='button'
          variant='contained'
          color='info'
          sx={buttonMainStyle}
          startIcon={<KeyboardBackspaceIcon />}
          onClick={goBack}
        >
          To movies
        </Button>

        <Button
          type='button'
          variant='contained'
          color='warning'
          sx={buttonMainStyle}
          startIcon={<EditIcon />}
          component={Link}
          to={`/${MOVIES_ENTITY_NAME}/edit/${id}`}
        >
          Edit
        </Button>

        <Button
          component={Link}
          to={`/${MOVIES_ENTITY_NAME}/new`}
          type='button'
          variant='contained'
          color='success'
          sx={buttonMainStyle}
          startIcon={<VideoCallIcon />}
        >
          Add movie
        </Button>
      </Stack>

      <Divider />

      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        aria-label='movie details tabs'
      >
        <Tab label='About the movie' />
        {movie.trailer && <Tab label='Movie trailer' />}
      </Tabs>

      {tabIndex === 0 && (
        <Box sx={scrollItemBoxStyle}>
          {loading ? (
            renderItemSkeleton()
          ) : (
            <Box sx={itemComponentBoxMainStyle}>
              <Box sx={itemCardMediaBoxStyle}>
                <Card>
                  <CardMedia
                    component='img'
                    height='100%'
                    image={
                      movie.poster ||
                      'https://www.prokerala.com/movies/assets/img/no-poster-available.jpg'
                    }
                    alt={movie.title}
                  />
                </Card>
              </Box>
              <Box sx={itemInformationBoxStyle}>
                <Typography
                  variant='h5'
                  component='div'
                  sx={{ fontWeight: 'bold' }}
                >
                  {movie.title || 'Unknown movie'}
                </Typography>
                <Stack direction='row' spacing={1}>
                  <Typography
                    variant='body1'
                    sx={{
                      fontWeight: 'bold',
                    }}
                    component='div'
                  >
                    Movie year:
                  </Typography>
                  <Typography variant='body1' component='div'>
                    {movie.release_year || 'Unknown'}
                  </Typography>
                </Stack>
                <Stack direction='row' spacing={1}>
                  <Typography
                    variant='body1'
                    sx={{
                      fontWeight: 'bold',
                    }}
                    component='div'
                  >
                    Genre:
                  </Typography>
                  <Typography variant='body1' component='div'>
                    {movie.genre || 'Unknown'}
                  </Typography>
                </Stack>
                <Stack direction='row' spacing={1} sx={{ marginTop: 2 }}>
                  <Typography
                    variant='body1'
                    sx={{
                      fontWeight: 'bold',
                    }}
                    component='div'
                  >
                    Studios:
                  </Typography>
                  <Typography variant='body1' component='div'>
                    {formattedStudios}
                  </Typography>
                </Stack>
                <Stack direction='row' spacing={1} sx={{ marginTop: 2 }}>
                  <Typography
                    variant='body1'
                    sx={{
                      fontWeight: 'bold',
                    }}
                    component='div'
                  >
                    Directors:
                  </Typography>
                  <Typography variant='body1' component='div'>
                    {formattedDirectors}
                  </Typography>
                </Stack>
                <Stack direction='row' spacing={1} sx={{ marginTop: 2 }}>
                  <Typography
                    variant='body1'
                    sx={{
                      fontWeight: 'bold',
                    }}
                    component='div'
                  >
                    Actors:
                  </Typography>
                  <Typography variant='body1' component='div'>
                    {formattedActors}
                  </Typography>
                </Stack>

                {movie.storyline && (
                  <>
                    <Divider sx={{ marginTop: 2 }} />
                    <Typography
                      variant='body1'
                      component='div'
                      sx={textIndentStyle}
                    >
                      {movie.storyline}
                    </Typography>
                  </>
                )}
              </Box>
            </Box>
          )}
        </Box>
      )}

      {tabIndex === 1 && movie.trailer && (
        <MoviesPlayer trailer={movie.trailer} />
      )}
    </>
  );
}

export default MoviesItem;
