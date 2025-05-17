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
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import VideoCallIcon from '@mui/icons-material/VideoCall';

import { emptyMovie } from '../../constants';

import { getMovieById } from '../../services/movieService';
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
  textIndentStyle,
} from '../../services/styleService';

import SnackbarContext from '../../contexts/SnackbarContext';
import ItemSkeleton from '../SkeletonLoader/ItemSkeleton';

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
    if (id === ':id') {
      setMovie(emptyMovie);
      setLoading(false);
    } else {
      fetchMovie();
    }
  }, [id, fetchMovie]);

  const handleGoBack = useCallback(() => {
    navigate(`/movies`);
  }, [navigate]);

  const handleTabChange = useCallback((event, newValue) => {
    setTabIndex(newValue);
  }, []);

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
                style={itemLinkStyle}
                to={`/studios/${studio.id}`}
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
                style={itemLinkStyle}
                to={`/directors/${director.id}`}
              >
                {director.fullName}
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
                style={itemLinkStyle}
                to={`/actors/${actor.id}`}
              >
                {actor.fullName}
              </Link>
            );
          })
          .reduce((prev, curr) => [prev, ', ', curr])
      : 'No actors available';

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
          To movies
        </Button>

        <Button
          color='warning'
          component={Link}
          startIcon={<EditIcon />}
          sx={buttonMainStyle}
          to={`/movies/edit/${id}`}
          type='button'
          variant='contained'
        >
          Edit
        </Button>

        <Button
          color='success'
          component={Link}
          startIcon={<VideoCallIcon />}
          sx={buttonMainStyle}
          to={`/movies/new`}
          type='button'
          variant='contained'
        >
          Add movie
        </Button>
      </Stack>

      <Divider />

      <Box alignItems='center' display='flex' justifyContent='space-between'>
        <Tabs
          aria-label='movie details tabs'
          value={tabIndex}
          onChange={handleTabChange}
        >
          <Tab label='About the movie' />
          {movie.trailer && <Tab label='Movie trailer' />}
        </Tabs>

        {(movie.createdAt || movie.updatedAt) && (
          <Stack direction='row' spacing={1}>
            {movie.createdAt === movie.updatedAt ? (
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
                  {movie.createdAt}
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
            <ItemSkeleton />
          ) : (
            <Box sx={itemComponentBoxMainStyle}>
              <Box sx={itemCardMediaBoxStyle}>
                <Card>
                  <CardMedia
                    alt={movie.title}
                    component='img'
                    height='100%'
                    image={
                      movie.poster ||
                      'https://www.prokerala.com/movies/assets/img/no-poster-available.jpg'
                    }
                  />
                </Card>
              </Box>
              <Box sx={itemInformationBoxStyle}>
                <Typography
                  component='div'
                  sx={styleItemTypography}
                  variant='h5'
                >
                  {movie.title || 'Unknown movie'}
                </Typography>
                <Stack direction='row' spacing={1}>
                  <Typography
                    component='div'
                    sx={styleItemTypography}
                    variant='body1'
                  >
                    Movie year:
                  </Typography>
                  <Typography component='div' variant='body1'>
                    {movie.releaseYear || 'Unknown'}
                  </Typography>
                </Stack>
                <Stack direction='row' spacing={1}>
                  <Typography
                    component='div'
                    sx={styleItemTypography}
                    variant='body1'
                  >
                    Genre:
                  </Typography>
                  <Typography component='div' variant='body1'>
                    {movie.genre.title || 'Unknown'}
                  </Typography>
                </Stack>
                <Stack direction='row' spacing={1} sx={styleStackMargin}>
                  <Typography
                    component='div'
                    sx={styleItemTypography}
                    variant='body1'
                  >
                    Studios:
                  </Typography>
                  <Typography component='div' variant='body1'>
                    {formattedStudios}
                  </Typography>
                </Stack>
                <Stack direction='row' spacing={1} sx={styleStackMargin}>
                  <Typography
                    component='div'
                    sx={styleItemTypography}
                    variant='body1'
                  >
                    Directors:
                  </Typography>
                  <Typography component='div' variant='body1'>
                    {formattedDirectors}
                  </Typography>
                </Stack>
                <Stack direction='row' spacing={1} sx={styleStackMargin}>
                  <Typography
                    component='div'
                    sx={styleItemTypography}
                    variant='body1'
                  >
                    Actors:
                  </Typography>
                  <Typography component='div' variant='body1'>
                    {formattedActors}
                  </Typography>
                </Stack>

                {movie.storyline && (
                  <>
                    <Divider sx={styleStackMargin} />
                    <Typography
                      component='div'
                      sx={textIndentStyle}
                      variant='body1'
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
