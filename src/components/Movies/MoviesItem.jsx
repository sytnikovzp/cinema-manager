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
import MoviesPlayer from './MoviesPlayer';

function MoviesItem() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(emptyMovie);
  const [tabIndex, setTabIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const { showSnackbar } = useContext(SnackbarContext);

  const fetchMovie = useCallback(async () => {
    try {
      const data = await getMovieById(id);
      setMovie(data);
    } catch (error) {
      showSnackbar(error.message, 'error');
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

  const goBack = () => {
    navigate(`/${MOVIES_ENTITY_NAME}`);
  };

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const formattedStudios =
    movie.studios && movie.studios.length > 0
      ? movie.studios
          .map((studio) => {
            if (typeof studio === 'string') {
              return <span key={studio}>{studio}</span>;
            }
            return (
              <Link
                key={studio.id}
                to={`/${STUDIOS_ENTITY_NAME}/${studio.id}`}
                style={itemLinkStyle}
              >
                {studio.title}
              </Link>
            );
          })
          .reduce((prev, curr) => [prev, ', ', curr])
      : 'No studios available';

  const formattedDirectors =
    movie.directors && movie.directors.length > 0
      ? movie.directors
          .map((director) => {
            if (typeof director === 'string') {
              return <span key={director}>{director}</span>;
            }
            return (
              <Link
                key={director.id}
                to={`/${DIRECTORS_ENTITY_NAME}/${director.id}`}
                style={itemLinkStyle}
              >
                {director.full_name}
              </Link>
            );
          })
          .reduce((prev, curr) => [prev, ', ', curr])
      : 'No directors available';

  const formattedActors =
    movie.actors && movie.actors.length > 0
      ? movie.actors
          .map((actor) => {
            if (typeof actor === 'string') {
              return <span key={actor}>{actor}</span>;
            }
            return (
              <Link
                key={actor.id}
                to={`/${ACTORS_ENTITY_NAME}/${actor.id}`}
                style={itemLinkStyle}
              >
                {actor.full_name}
              </Link>
            );
          })
          .reduce((prev, curr) => [prev, ', ', curr])
      : 'No actors available';

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

      <Box display='flex' alignItems='center' justifyContent='space-between'>
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          aria-label='movie details tabs'
        >
          <Tab label='About the movie' />
          {movie.trailer && <Tab label='Movie trailer' />}
        </Tabs>

        {(movie.createdAt || movie.updatedAt) && (
          <Stack direction='row' spacing={1}>
            {movie.createdAt === movie.updatedAt ? (
              <>
                <Typography
                  variant='caption'
                  sx={{
                    fontWeight: 'bold',
                    textAlign: 'right',
                    color: 'gray',
                  }}
                  component='div'
                >
                  Created at:
                </Typography>
                <Typography
                  variant='caption'
                  component='div'
                  sx={{ textAlign: 'right', color: 'gray' }}
                >
                  {movie.createdAt}
                </Typography>
              </>
            ) : (
              <>
                <Typography
                  variant='caption'
                  sx={{
                    fontWeight: 'bold',
                    textAlign: 'right',
                    color: 'gray',
                  }}
                  component='div'
                >
                  Updated at:
                </Typography>
                <Typography
                  variant='caption'
                  component='div'
                  sx={{ textAlign: 'right', color: 'gray' }}
                >
                  {movie.updatedAt}
                </Typography>
              </>
            )}
          </Stack>
        )}
      </Box>

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
