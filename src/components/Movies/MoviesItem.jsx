import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef } from 'react';
// =============================================
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import EditIcon from '@mui/icons-material/Edit';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';
// =============================================
import { buttonMainStyle, itemComponentBoxMainStyle, itemComponentBoxSecondaryStyle } from '../../services/styleService';
import { emptyMovie } from '../../constants';
import { getAllMovies, resetStatus } from '../../store/slices/moviesSlice';
// =============================================
import useSnackbar from '../../hooks';

function MoviesItem() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goBack = () => {
    navigate('/movies');
  };

  const movies = useSelector((state) => state.moviesList.movies);
  const status = useSelector((state) => state.moviesList.status);

  const { snackbar, showSnackbar, handleClose } = useSnackbar(() =>
    dispatch(resetStatus())
  );

  const prevStatusRef = useRef();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllMovies());
  }, [dispatch]);

  useEffect(() => {
    const prevStatus = prevStatusRef.current;
    const currentStatus = status;

    if (currentStatus && currentStatus !== prevStatus) {
      const severity = currentStatus.toLowerCase().includes('success')
        ? 'success'
        : 'error';
      showSnackbar(currentStatus, severity);
    }

    prevStatusRef.current = currentStatus;
  }, [status, showSnackbar]);

  const movie = movies.find((movie) => Number(movie.id) === Number(id));

  const currentMovie = movie ? movie : emptyMovie;

  const formattedDirectors = currentMovie.directors
    ? currentMovie.directors.join(', ')
    : 'No movies available';

  const formattedActors = currentMovie.actors
    ? currentMovie.actors.join(', ')
    : 'No movies available';

  const formattedStudios = currentMovie.studios
    ? currentMovie.studios.join(', ')
    : 'No movies available';

  return (
    <>
      <Stack direction='row' justifyContent='space-between'>
        <Button
          id='goBack-btn'
          type='button'
          variant='contained'
          color='info'
          sx={buttonMainStyle}
          startIcon={<KeyboardBackspaceIcon />}
          onClick={goBack}
        >
          Go back
        </Button>

        <Button
          id='goBack-btn'
          type='button'
          variant='contained'
          color='success'
          sx={buttonMainStyle}
          startIcon={<EditIcon />}
          component={Link}
          to={`/movies/new/${id}`}
        >
          Edit
        </Button>
      </Stack>

      <Divider />

      <Box
        sx={{
          minHeight: '60vh',
          overflowY: 'auto',
        }}
      >
        <Box
          sx={itemComponentBoxMainStyle}
        >
          <Box
            sx={itemComponentBoxSecondaryStyle}
          >
            <Card>
              <CardMedia
                component='img'
                height='100%'
                image={
                  currentMovie.poster
                    ? currentMovie.poster
                    : 'https://www.prokerala.com/movies/assets/img/no-poster-available.jpg'
                }
                alt={currentMovie.title}
              />
            </Card>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '60%',
            }}
          >
            <Typography variant='h6' component='div'>
              Title: {currentMovie.title}
            </Typography>
            <Typography variant='body1' component='div'>
              Movie year: {currentMovie.movieYear ? currentMovie.movieYear : 'Unknown'}
            </Typography>
            <Typography variant='body1' component='div'>
              Genre: {currentMovie.genre ? currentMovie.genre : 'Unknown'}
            </Typography>
            <Typography variant='body1' component='div' sx={{ marginTop: 2 }}>
              Directors: {formattedDirectors ? formattedDirectors : 'Unknown'}
            </Typography>
            <Typography variant='body1' component='div' sx={{ marginTop: 2 }}>
              Actors: {formattedActors ? formattedActors : 'Unknown'}
            </Typography>
            <Typography variant='body1' component='div' sx={{ marginTop: 2 }}>
              Studios: {formattedStudios ? formattedStudios : 'Unknown'}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={1000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={snackbar.severity}
          variant='filled'
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default MoviesItem;
